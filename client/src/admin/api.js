// Small fetch wrapper for /api/admin. Login lives in an httpOnly cookie.
async function call(method, url, body, isForm) {
  const opts = { method, credentials: 'same-origin', headers: { 'X-Admin': '1' } };
  if (body !== undefined) {
    if (isForm) opts.body = body;
    else {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
  }
  const res = await fetch(`/api/admin${url}`, opts);
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && url !== '/login') window.dispatchEvent(new Event('admin:logout'));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const api = {
  get: (url) => call('GET', url),
  post: (url, body) => call('POST', url, body ?? {}),
  patch: (url, body) => call('PATCH', url, body),
  del: (url) => call('DELETE', url),
  upload: (url, form) => call('POST', url, form, true),
};

export const fileUrl = (id, field, download) => `/api/admin/bookings/${id}/file/${field}${download ? '?download=1' : ''}`;
