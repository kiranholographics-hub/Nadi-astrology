import { yantras as localYantras, categories as localCategories } from '../data/yantras.js';

async function json(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

// Yantras come from MongoDB; if the API is not running (e.g. design preview),
// fall back to the bundled list so the shop still renders.
export async function getYantras(params = {}) {
  const qs = new URLSearchParams(params).toString();
  try {
    return await json(await fetch(`/api/yantras${qs ? `?${qs}` : ''}`));
  } catch {
    let items = localYantras;
    if (params.category) items = items.filter((y) => y.category === params.category);
    if (params.bestseller) items = items.filter((y) => y.bestseller);
    return { categories: localCategories, count: items.length, items, offline: true };
  }
}

export async function getYantra(slug) {
  try {
    return await json(await fetch(`/api/yantras/${encodeURIComponent(slug)}`));
  } catch (err) {
    const item = localYantras.find((y) => y.slug === slug);
    if (!item) throw err;
    const related = localYantras.filter((y) => y.category === item.category && y.slug !== slug).slice(0, 2);
    return { item, related, offline: true };
  }
}

export async function createBooking(formData) {
  return json(await fetch('/api/bookings', { method: 'POST', body: formData }));
}

export async function createOrder(payload) {
  return json(
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  );
}

export async function createLead(payload) {
  return json(
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  );
}
