// SweetHouse shared data layer.
// Local mode: this browser's localStorage (default).
// Cloud mode: Firebase Firestore — activates automatically when
// FIREBASE_CONFIG is filled in sweethouse-config.js.
import { FIREBASE_CONFIG } from './sweethouse-config.js';

const FB_VER = '10.12.2';
let fbPromise = null;
function cloud() {
  if (!fbPromise) {
    fbPromise = (async () => {
      const app = await import('https://www.gstatic.com/firebasejs/' + FB_VER + '/firebase-app.js');
      const fs = await import('https://www.gstatic.com/firebasejs/' + FB_VER + '/firebase-firestore.js');
      const a = app.initializeApp(FIREBASE_CONFIG);
      return { db: fs.getFirestore(a), fs };
    })();
  }
  return fbPromise;
}

export function isCloud() { return !!FIREBASE_CONFIG; }

// ---------- local helpers ----------
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
};
const subs = {};
function sub(key, fn) {
  (subs[key] = subs[key] || new Set()).add(fn);
  return () => subs[key].delete(fn);
}
function ping(key) { (subs[key] || []).forEach((fn) => { try { fn(); } catch (e) {} }); }
function localSettings() {
  return {
    soldOut: LS.get('sh_soldout', []),
    paused: localStorage.getItem('sh_paused') === '1',
    announce: localStorage.getItem('sh_announce') || '',
  };
}
const orderKey = (o) => o._id || (o.num + '-' + o.ts);

// ---------- settings: { soldOut, paused, announce } ----------
export function watchSettings(cb) {
  if (isCloud()) {
    let un = () => {};
    cloud().then(({ db, fs }) => {
      un = fs.onSnapshot(fs.doc(db, 'settings', 'storefront'),
        (snap) => cb(snap.exists() ? snap.data() : {}),
        (err) => { console.error('settings watch failed', err); cb(localSettings()); });
    }).catch((e) => { console.error(e); cb(localSettings()); });
    return () => un();
  }
  cb(localSettings());
  const h = (e) => { if (['sh_soldout', 'sh_paused', 'sh_announce'].includes(e.key)) cb(localSettings()); };
  window.addEventListener('storage', h);
  const unsub = sub('settings', () => cb(localSettings()));
  return () => { window.removeEventListener('storage', h); unsub(); };
}

export async function saveSettings(partial) {
  if (isCloud()) {
    const { db, fs } = await cloud();
    await fs.setDoc(fs.doc(db, 'settings', 'storefront'), partial, { merge: true });
    return;
  }
  if ('soldOut' in partial) LS.set('sh_soldout', partial.soldOut);
  if ('paused' in partial) { try { localStorage.setItem('sh_paused', partial.paused ? '1' : '0'); } catch (e) {} }
  if ('announce' in partial) { try { localStorage.setItem('sh_announce', partial.announce); } catch (e) {} }
  ping('settings');
}

// ---------- orders / archive ----------
export async function submitOrder(order) {
  if (isCloud()) {
    const { db, fs } = await cloud();
    await fs.setDoc(fs.doc(db, 'orders', orderKey(order)), order);
    return;
  }
  const orders = LS.get('sh_orders', []);
  orders.push(order);
  LS.set('sh_orders', orders);
  ping('sh_orders');
}

function watchColl(coll, lsKey, cb) {
  if (isCloud()) {
    let un = () => {};
    cloud().then(({ db, fs }) => {
      un = fs.onSnapshot(fs.collection(db, coll),
        (snap) => cb(snap.docs.map((d) => ({ ...d.data(), _id: d.id }))),
        (err) => { console.error(coll + ' watch failed', err); cb(LS.get(lsKey, [])); });
    }).catch((e) => { console.error(e); cb(LS.get(lsKey, [])); });
    return () => un();
  }
  cb(LS.get(lsKey, []));
  const h = (e) => { if (e.key === lsKey) cb(LS.get(lsKey, [])); };
  window.addEventListener('storage', h);
  const unsub = sub(lsKey, () => cb(LS.get(lsKey, [])));
  return () => { window.removeEventListener('storage', h); unsub(); };
}
export function watchOrders(cb) { return watchColl('orders', 'sh_orders', cb); }
export function watchArchive(cb) { return watchColl('archive', 'sh_archive', cb); }

function stripId(o) { const { _id, ...rest } = o; return rest; }

export async function updateOrder(order) {
  if (isCloud()) {
    const { db, fs } = await cloud();
    await fs.setDoc(fs.doc(db, 'orders', orderKey(order)), stripId(order));
    return;
  }
  LS.set('sh_orders', LS.get('sh_orders', []).map((o) => (orderKey(o) === orderKey(order) ? stripId(order) : o)));
  ping('sh_orders');
}

export async function deleteOrder(order) {
  if (isCloud()) {
    const { db, fs } = await cloud();
    await fs.deleteDoc(fs.doc(db, 'orders', orderKey(order)));
    return;
  }
  LS.set('sh_orders', LS.get('sh_orders', []).filter((o) => orderKey(o) !== orderKey(order)));
  ping('sh_orders');
}

// Move the given orders out of the active list into the archive.
export async function archiveOrders(orders) {
  const now = Date.now();
  if (isCloud()) {
    const { db, fs } = await cloud();
    for (const o of orders) {
      await fs.setDoc(fs.doc(db, 'archive', orderKey(o)), { ...stripId(o), archivedTs: now });
      await fs.deleteDoc(fs.doc(db, 'orders', orderKey(o)));
    }
    return;
  }
  const keys = new Set(orders.map(orderKey));
  const arch = LS.get('sh_archive', []);
  arch.push(...orders.map((o) => ({ ...stripId(o), archivedTs: now })));
  LS.set('sh_archive', arch);
  LS.set('sh_orders', LS.get('sh_orders', []).filter((o) => !keys.has(orderKey(o))));
  ping('sh_orders'); ping('sh_archive');
}
