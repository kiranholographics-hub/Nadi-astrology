import { SERVICES } from '../data/services.js';

export const SERVICE_LABEL = Object.fromEntries(SERVICES.map((s) => [s.value, s.label.en]));
SERVICE_LABEL['office-visit'] = 'Office visit';

export const BOOKING_STATUS = [
  ['new', 'New'],
  ['awaiting_payment', 'Awaiting payment'],
  ['paid', 'Paid'],
  ['scheduled', 'Scheduled'],
  ['done', 'Done'],
  ['cancelled', 'Cancelled'],
];
export const ORDER_STATUS = [
  ['pending_payment', 'Pending payment'],
  ['paid', 'Paid — to dispatch'],
  ['dispatched', 'Dispatched'],
  ['delivered', 'Delivered'],
  ['cancelled', 'Cancelled'],
];
export const LEAD_STATUS = [
  ['new', 'New'],
  ['contacted', 'Contacted'],
  ['closed', 'Closed'],
];
export const LEAD_TYPE = { contact: 'Contact form', 'yantra-salaah': 'Yantra advice', 'office-visit': 'Office visit' };
export const MODE = { video: 'Video call', office: 'Office visit', report: 'Online report', 'site-visit': 'Site visit' };

const IST = { timeZone: 'Asia/Kolkata' };
export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-IN', { ...IST, day: 'numeric', month: 'short', year: 'numeric' }) : '—');
export const fmtDateTime = (d) => (d ? new Date(d).toLocaleString('en-IN', { ...IST, day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : '—');
export const money = (n, cur) => (n == null ? '—' : `${cur === 'USD' ? '$' : '₹'}${Number(n).toLocaleString(cur === 'USD' ? 'en-US' : 'en-IN')}`);

let regionNames;
export function countryName(code) {
  if (!code) return 'Unknown';
  try {
    regionNames ||= new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
}

export const waUrl = (phone, text = '') => {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits ? `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}` : null;
};
