import { S as SERVICES, j as jsxRuntimeExports, r as reactExports, L as Link, u as useNavigate, a as useParams, Y as YantraArt, C as CATEGORY_LABEL, b as useLocation, N as NavLink, R as Routes, c as Route, d as Navigate } from "../entry-server.js";
import "stream";
import "util";
async function call(method, url, body, isForm) {
  const opts = { method, credentials: "same-origin", headers: { "X-Admin": "1" } };
  if (body !== void 0) {
    if (isForm) opts.body = body;
    else {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }
  }
  const res = await fetch(`/api/admin${url}`, opts);
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && url !== "/login") window.dispatchEvent(new Event("admin:logout"));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}
const api = {
  get: (url) => call("GET", url),
  post: (url, body) => call("POST", url, body ?? {}),
  patch: (url, body) => call("PATCH", url, body),
  del: (url) => call("DELETE", url),
  upload: (url, form) => call("POST", url, form, true)
};
const fileUrl = (id, field, download) => `/api/admin/bookings/${id}/file/${field}${download ? "?download=1" : ""}`;
const SERVICE_LABEL = Object.fromEntries(SERVICES.map((s) => [s.value, s.label.en]));
SERVICE_LABEL["office-visit"] = "Office visit";
const BOOKING_STATUS = [
  ["new", "New"],
  ["awaiting_payment", "Awaiting payment"],
  ["paid", "Paid"],
  ["scheduled", "Scheduled"],
  ["done", "Done"],
  ["cancelled", "Cancelled"]
];
const ORDER_STATUS = [
  ["pending_payment", "Pending payment"],
  ["paid", "Paid — to dispatch"],
  ["dispatched", "Dispatched"],
  ["delivered", "Delivered"],
  ["cancelled", "Cancelled"]
];
const LEAD_STATUS = [
  ["new", "New"],
  ["contacted", "Contacted"],
  ["closed", "Closed"]
];
const LEAD_TYPE = { contact: "Contact form", "yantra-salaah": "Yantra advice", "office-visit": "Office visit" };
const MODE = { video: "Video call", office: "Office visit", report: "Online report", "site-visit": "Site visit" };
const IST = { timeZone: "Asia/Kolkata" };
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { ...IST, day: "numeric", month: "short", year: "numeric" }) : "—";
const fmtDateTime = (d) => d ? new Date(d).toLocaleString("en-IN", { ...IST, day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : "—";
const money = (n, cur) => n == null ? "—" : `${cur === "USD" ? "$" : "₹"}${Number(n).toLocaleString(cur === "USD" ? "en-US" : "en-IN")}`;
let regionNames;
function countryName(code) {
  if (!code) return "Unknown";
  try {
    regionNames || (regionNames = new Intl.DisplayNames(["en"], { type: "region" }));
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
}
const waUrl = (phone, text = "") => {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}` : null;
};
function PageHead({ title, sub, action }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-head", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: title }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "adm-sub", children: sub })
    ] }),
    action
  ] });
}
function Stat({ n, label: label2, tone, onClick, active }) {
  const Tag = onClick ? "button" : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tag, { type: onClick ? "button" : void 0, className: `adm-stat${tone ? ` ${tone}` : ""}${active ? " on" : ""}`, onClick, "aria-pressed": onClick ? !!active : void 0, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-stat-n", children: n ?? "—" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-stat-l", children: label2 })
  ] });
}
function StatusSelect({ value, options, onChange, disabled, label: label2 = "Status" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: `adm-status s-${value}`, value, disabled, "aria-label": label2, onChange: (e) => onChange(e.target.value), onClick: (e) => e.stopPropagation(), children: options.map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v, children: l }, v)) });
}
function Badge({ children, tone }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `adm-badge${tone ? ` ${tone}` : ""}`, children });
}
function Empty({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-empty", children });
}
function Loading() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-empty", children: "Loading…" });
}
function ErrorBox({ error }) {
  return error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-msg err", role: "alert", children: error }) : null;
}
function useFlash() {
  const [msg, setMsg] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!msg) return void 0;
    const id = setTimeout(() => setMsg(null), 2600);
    return () => clearTimeout(id);
  }, [msg]);
  const el = msg ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `adm-toast ${msg.type}`, role: "status", children: msg.text }) : null;
  return [el, (text, type = "ok") => setMsg({ text, type })];
}
function Field({ label: label2, hint, children, wide }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `adm-field${wide ? " wide" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: label2 }),
    children,
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-hint", children: hint })
  ] });
}
function NotesBox({ value, onSave, placeholder = "Private notes — only visible in admin" }) {
  const [text, setText] = reactExports.useState(value || "");
  const [state, setState] = reactExports.useState("");
  reactExports.useEffect(() => setText(value || ""), [value]);
  async function save() {
    if (text === (value || "")) return;
    setState("Saving…");
    try {
      await onSave(text);
      setState("Saved");
    } catch (e) {
      setState(e.message);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-notes", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "adm-input", rows: 4, value: text, placeholder, onChange: (e) => {
      setText(e.target.value);
      setState("");
    }, onBlur: save }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-hint", children: state || "Saves automatically when you click outside the box." })
  ] });
}
const label = (list, v) => {
  var _a;
  return ((_a = list.find(([k]) => k === v)) == null ? void 0 : _a[1]) || v;
};
const sum = (o = {}, keys) => keys.reduce((n, k) => n + (o[k] || 0), 0);
function Dashboard() {
  const [d, setD] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState("");
  reactExports.useEffect(() => {
    api.get("/stats").then(setD).catch((e) => setErr(e.message));
  }, []);
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err });
  if (!d) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  const totalBookings = Object.values(d.bookings).reduce((a, b) => a + b, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHead, { title: "Dashboard", sub: "Aaj kya pending hai — ek nazar mein." }),
    d.yantrasMissingPrice > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/yantras", className: "adm-alert", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
        d.yantrasMissingPrice,
        " yantras have no price yet."
      ] }),
      " Customers cannot check out until ₹ and $ prices are added. Add prices →"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: sum(d.bookings, ["new", "awaiting_payment"]), label: "Bookings awaiting payment", tone: "gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: sum(d.bookings, ["paid", "scheduled"]), label: "Consultations to do" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: d.orders.paid || 0, label: "Yantra orders to dispatch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: d.leads.new || 0, label: "New enquiries" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: d.visits.today, label: "Visits today" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: d.visits.last7, label: "Visits · last 7 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: d.visits.last30, label: "Visits · last 30 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: totalBookings, label: "Bookings (all time)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-grid2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-card-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Latest bookings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/bookings", children: "All →" })
        ] }),
        d.recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No bookings yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "adm-list", children: d.recentBookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/admin/bookings/${b._id}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: b.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
              SERVICE_LABEL[b.service] || b.service,
              b.country ? ` · ${b.country}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: b.status, children: label(BOOKING_STATUS, b.status) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: fmtDateTime(b.createdAt) })
          ] })
        ] }) }, b._id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-card-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Latest yantra orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/orders", children: "All →" })
        ] }),
        d.recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No orders yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "adm-list", children: d.recentOrders.map((o) => {
          var _a, _b;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/orders", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: (_a = o.customer) == null ? void 0 : _a.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                money(o.subtotal, o.currency),
                ((_b = o.customer) == null ? void 0 : _b.country) ? ` · ${o.customer.country}` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: o.status, children: label(ORDER_STATUS, o.status) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: fmtDateTime(o.createdAt) })
            ] })
          ] }) }, o._id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-card-head", style: { marginTop: 22 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Latest enquiries" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/enquiries", children: "All →" })
        ] }),
        d.recentLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No enquiries yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "adm-list", children: d.recentLeads.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/enquiries", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: l.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
              LEAD_TYPE[l.type] || l.type,
              l.country ? ` · ${l.country}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: l.status, children: label(LEAD_STATUS, l.status) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: fmtDateTime(l.createdAt) })
          ] })
        ] }) }, l._id)) })
      ] })
    ] })
  ] });
}
function Bookings() {
  const [items, setItems] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("");
  const [service, setService] = reactExports.useState("");
  const [q, setQ] = reactExports.useState("");
  const [toast, flash] = useFlash();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    api.get("/bookings").then((d) => setItems(d.items)).catch((e) => setErr(e.message));
  }, []);
  const counts = reactExports.useMemo(() => (items || []).reduce((c, b) => ({ ...c, [b.status]: (c[b.status] || 0) + 1 }), {}), [items]);
  const list = reactExports.useMemo(() => {
    const s = q.trim().toLowerCase();
    return (items || []).filter((b) => (!status || b.status === status) && (!service || b.service.startsWith(service)) && (!s || [b.name, b.phone, b.email, b.country].some((v) => String(v || "").toLowerCase().includes(s))));
  }, [items, status, service, q]);
  async function setRowStatus(id, value) {
    try {
      const { item } = await api.patch(`/bookings/${id}`, { status: value });
      setItems((xs) => xs.map((x) => x._id === id ? { ...x, status: item.status } : x));
      flash("Status updated");
    } catch (e) {
      flash(e.message, "err");
    }
  }
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err });
  if (!items) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    toast,
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHead, { title: "Bookings", sub: "Consultation bookings — Nadi, Vedic, KP, Kundli Milan, Vastu. Row par click karke poori details dekhein." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: items.length, label: "All", onClick: () => setStatus(""), active: !status }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: (counts.new || 0) + (counts.awaiting_payment || 0), label: "Awaiting payment", tone: "gold", onClick: () => setStatus("awaiting_payment"), active: status === "awaiting_payment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: (counts.paid || 0) + (counts.scheduled || 0), label: "Paid / scheduled", onClick: () => setStatus("paid"), active: status === "paid" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: counts.done || 0, label: "Done", onClick: () => setStatus("done"), active: status === "done" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", type: "search", placeholder: "Search name, phone, email, country", value: q, onChange: (e) => setQ(e.target.value), "aria-label": "Search bookings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "adm-input", value: service, onChange: (e) => setService(e.target.value), "aria-label": "Service", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "nadi", children: "Nadi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "vedic", children: "Vedic" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "kundli-milan", children: "Kundli Matching" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "kp-prashna", children: "KP Prashna" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "vastu", children: "Vastu" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "adm-input", value: status, onChange: (e) => setStatus(e.target.value), "aria-label": "Status", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All statuses" }),
        BOOKING_STATUS.map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v, children: l }, v))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-card flush", children: list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: items.length ? "No bookings match these filters." : "No bookings yet. Website se booking aate hi yahan dikhegi." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-table-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "adm-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Received" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Slot / mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Files" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: list.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "click", onClick: () => navigate(`/admin/bookings/${b._id}`), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "nowrap", children: fmtDateTime(b.createdAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/admin/bookings/${b._id}`, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: b.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
            b.phone,
            b.country ? ` · ${b.country}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          SERVICE_LABEL[b.service] || b.service,
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: b.currency })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          b.preferredSlot ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b.preferredSlot.split(" (")[0] }) : "—",
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: MODE[b.mode] || b.mode })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "nowrap", children: [
          b.thumbImpression && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-chip", children: "Thumb" }),
          b.floorPlan && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-chip", children: "Plan" }),
          !b.thumbImpression && !b.floorPlan && "—"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSelect, { value: b.status, options: BOOKING_STATUS, onChange: (v) => setRowStatus(b._id, v) }) })
      ] }, b._id)) })
    ] }) }) })
  ] });
}
function Row({ k, v }) {
  if (v === void 0 || v === null || v === "") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-kv", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: v })
  ] });
}
function FileBox({ id, field, label: label2, name }) {
  if (!name) return null;
  const isImg = /\.(jpe?g|png|webp)$/i.test(name);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-file", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: label2 }),
    isImg ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: fileUrl(id, field), target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: fileUrl(id, field), alt: label2 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-hint", children: [
      name.split(".").pop().toUpperCase(),
      " file"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "adm-btn ghost sm", href: fileUrl(id, field), target: "_blank", rel: "noreferrer", children: "Open" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "adm-btn ghost sm", href: fileUrl(id, field, true), children: "Download" })
    ] })
  ] });
}
function BookingDetail() {
  var _a, _b;
  const { id } = useParams();
  const [b, setB] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState("");
  const [toast, flash] = useFlash();
  reactExports.useEffect(() => {
    api.get(`/bookings/${id}`).then((d) => setB(d.item)).catch((e) => setErr(e.message));
  }, [id]);
  async function save(patch, msg = "Saved") {
    const { item } = await api.patch(`/bookings/${id}`, patch);
    setB(item);
    flash(msg);
  }
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/bookings", className: "adm-backlink", children: "← Bookings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err })
  ] });
  if (!b) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  const wa = waUrl(b.phone, `Namaste ${b.name}, this is Pt. Rajneesh Sharma's office regarding your ${SERVICE_LABEL[b.service] || "consultation"} booking.`);
  const kind = b.service.split("-")[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    toast,
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/bookings", className: "adm-backlink", children: "← Bookings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHead,
      {
        title: b.name,
        sub: `${SERVICE_LABEL[b.service] || b.service} · received ${fmtDateTime(b.createdAt)} · ref ${String(b._id).slice(-6).toUpperCase()}`,
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSelect, { value: b.status, options: BOOKING_STATUS, onChange: (v) => save({ status: v }, "Status updated").catch((e) => flash(e.message, "err")) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row", style: { marginBottom: 22 }, children: [
      wa && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "adm-btn primary sm", href: wa, target: "_blank", rel: "noreferrer", children: [
        "WhatsApp ",
        b.phone
      ] }),
      b.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "adm-btn ghost sm", href: `mailto:${b.email}`, children: [
        "Email ",
        b.email
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "adm-btn ghost sm", href: `tel:${b.phone}`, children: "Call" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-grid2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Name", v: b.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Phone / WhatsApp", v: b.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Email", v: b.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Country", v: b.country }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Client time zone", v: b.timezone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Currency", v: b.currency }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginTop: 24 }, children: "Consultation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Service", v: SERVICE_LABEL[b.service] || b.service }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Mode", v: MODE[b.mode] || b.mode }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Preferred slot", v: b.preferredSlot }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Payment", v: ((_a = b.payment) == null ? void 0 : _a.gateway) ? `${b.payment.gateway}${b.payment.reference ? ` · ${b.payment.reference}` : ""}${b.payment.amount != null ? ` · ${money(b.payment.amount, b.currency)}` : ""}` : "Not received yet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: kind === "vastu" ? "Property" : "Birth details & question" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: b.service === "kundli-milan" ? "Groom's date of birth" : "Date of birth", v: b.dob ? fmtDate(b.dob) : null }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: b.service === "kundli-milan" ? "Groom's time of birth" : "Time of birth", v: b.tob }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: b.service === "kundli-milan" ? "Groom's place of birth" : "Place of birth", v: b.pob }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Gender", v: b.gender === "purush" ? "Male" : b.gender === "mahila" ? "Female" : null }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "KP number (1–249)", v: b.kpNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "City at time of question", v: b.city }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Property type", v: b.propertyType }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Area", v: b.areaSqft ? `${b.areaSqft} sq.ft` : null }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: b.service === "kundli-milan" ? "Bride's birth details" : "Family members", v: b.membersText && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pre", children: b.membersText }) }),
        ((_b = b.members) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Members", v: b.members.map((m) => `${m.name || ""} ${m.dob || ""} ${m.tob || ""} ${m.pob || ""}`.trim()).join("\n") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Question", v: b.question && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pre", children: b.question }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Main concern", v: b.mainProblem && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pre", children: b.mainProblem }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-files", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileBox, { id: b._id, field: "thumbImpression", label: "Thumb impression", name: b.thumbImpression }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileBox, { id: b._id, field: "floorPlan", label: "Floor plan", name: b.floorPlan })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Payment & notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-form-grid", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentFields, { b, onSave: (p) => save(p).catch((e) => flash(e.message, "err")) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NotesBox, { value: b.adminNotes, onSave: (t) => save({ adminNotes: t }, "Notes saved") })
    ] })
  ] });
}
function PaymentFields({ b, onSave }) {
  var _a, _b;
  const [ref, setRef] = reactExports.useState(((_a = b.payment) == null ? void 0 : _a.reference) || "");
  const [amt, setAmt] = reactExports.useState(((_b = b.payment) == null ? void 0 : _b.amount) ?? "");
  const [slot, setSlot] = reactExports.useState(b.preferredSlot || "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Confirmed slot" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: slot, onChange: (e) => setSlot(e.target.value), onBlur: () => slot !== (b.preferredSlot || "") && onSave({ preferredSlot: slot }), placeholder: "e.g. 2026-11-04 16:00 IST" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Payment reference (UPI / PayPal ID)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: ref, onChange: (e) => setRef(e.target.value), onBlur: () => {
        var _a2;
        return ref !== (((_a2 = b.payment) == null ? void 0 : _a2.reference) || "") && onSave({ paymentReference: ref });
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-label", children: [
        "Amount received (",
        b.currency,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", type: "number", min: "0", value: amt, onChange: (e) => setAmt(e.target.value), onBlur: () => {
        var _a2;
        return String(amt) !== String(((_a2 = b.payment) == null ? void 0 : _a2.amount) ?? "") && onSave({ paymentAmount: amt });
      } })
    ] })
  ] });
}
function Orders() {
  const [items, setItems] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(null);
  const [toast, flash] = useFlash();
  reactExports.useEffect(() => {
    api.get("/orders").then((d) => setItems(d.items)).catch((e) => setErr(e.message));
  }, []);
  const counts = reactExports.useMemo(() => (items || []).reduce((c, o) => ({ ...c, [o.status]: (c[o.status] || 0) + 1 }), {}), [items]);
  const list = (items || []).filter((o) => !status || o.status === status);
  async function save(id, patch, msg = "Saved") {
    try {
      const { item } = await api.patch(`/orders/${id}`, patch);
      setItems((xs) => xs.map((x) => x._id === id ? item : x));
      flash(msg);
    } catch (e) {
      flash(e.message, "err");
      throw e;
    }
  }
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err });
  if (!items) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    toast,
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHead, { title: "Yantra orders", sub: "Payment aate hi status 'Paid' karein; courier aur tracking number daal kar 'Dispatched'." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: items.length, label: "All", onClick: () => setStatus(""), active: !status }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: counts.pending_payment || 0, label: "Pending payment", onClick: () => setStatus("pending_payment"), active: status === "pending_payment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: counts.paid || 0, label: "To dispatch", tone: "gold", onClick: () => setStatus("paid"), active: status === "paid" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: counts.dispatched || 0, label: "Dispatched", onClick: () => setStatus("dispatched"), active: status === "dispatched" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-card flush", children: list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: items.length ? "No orders with this status." : "No yantra orders yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-table-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "adm-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: list.map((o) => {
        var _a, _b, _c;
        const isOpen = open === o._id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "click", onClick: () => setOpen(isOpen ? null : o._id), "aria-expanded": isOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "nowrap", children: [
              fmtDateTime(o.createdAt),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                "#",
                String(o._id).slice(-6).toUpperCase()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: (_a = o.customer) == null ? void 0 : _a.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                (_b = o.customer) == null ? void 0 : _b.phone,
                " · ",
                (_c = o.customer) == null ? void 0 : _c.country
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: o.items.map((i, k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-line", children: [
              i.qty,
              " × ",
              i.name,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { className: "inline", children: [
                "(",
                i.size,
                i.sankalp ? ", sankalp" : "",
                ")"
              ] })
            ] }, k)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: money(o.subtotal, o.currency) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSelect, { value: o.status, options: ORDER_STATUS, onChange: (v) => save(o._id, { status: v }, "Status updated").catch(() => {
            }) }) })
          ] }),
          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "adm-expand", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderDetail, { o, onSave: (p, m) => save(o._id, p, m) }) }) })
        ] }, o._id);
      }) })
    ] }) }) })
  ] });
}
function OrderDetail({ o, onSave }) {
  var _a;
  const [courier, setCourier] = reactExports.useState(o.courier || "");
  const [tracking, setTracking] = reactExports.useState(o.trackingNumber || "");
  const [pay, setPay] = reactExports.useState(((_a = o.payment) == null ? void 0 : _a.reference) || "");
  const c = o.customer || {};
  const wa = waUrl(c.phone, `Namaste ${c.name}, your yantra order #${String(o._id).slice(-6).toUpperCase()} from Pt. Rajneesh Sharma${tracking ? ` has been dispatched${courier ? ` via ${courier}` : ""}. Tracking: ${tracking}` : ""}.`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-grid2 tight", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Ship to" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "adm-address", children: [
        c.name,
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        c.address,
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        [c.city, c.pincode].filter(Boolean).join(" "),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        c.country,
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        c.phone,
        c.email ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          c.email
        ] }) : null
      ] }),
      o.items.filter((i) => i.sankalp).map((i, k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "adm-hint", children: [
        "Sankalp for ",
        i.name,
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: i.sankalpName || "—" }),
        ", gotra ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: i.gotra || "—" })
      ] }, k)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row", children: [
        wa && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "adm-btn primary sm", href: wa, target: "_blank", rel: "noreferrer", children: "WhatsApp customer" }),
        c.email && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "adm-btn ghost sm", href: `mailto:${c.email}`, children: "Email" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid one", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Payment reference" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: pay, onChange: (e) => setPay(e.target.value), onBlur: () => {
          var _a2;
          return pay !== (((_a2 = o.payment) == null ? void 0 : _a2.reference) || "") && onSave({ paymentReference: pay }).catch(() => {
          });
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Courier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: courier, placeholder: "e.g. DTDC, India Post, DHL", onChange: (e) => setCourier(e.target.value), onBlur: () => courier !== (o.courier || "") && onSave({ courier }).catch(() => {
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Tracking number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: tracking, onChange: (e) => setTracking(e.target.value), onBlur: () => tracking !== (o.trackingNumber || "") && onSave({ trackingNumber: tracking }).catch(() => {
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NotesBox, { value: o.adminNotes, onSave: (t) => onSave({ adminNotes: t }, "Notes saved") })
    ] })
  ] });
}
function Enquiries() {
  const [items, setItems] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(null);
  const [toast, flash] = useFlash();
  reactExports.useEffect(() => {
    api.get("/leads").then((d) => setItems(d.items)).catch((e) => setErr(e.message));
  }, []);
  const counts = reactExports.useMemo(() => (items || []).reduce((c, l) => ({ ...c, [l.status]: (c[l.status] || 0) + 1 }), {}), [items]);
  const list = (items || []).filter((l) => !status || l.status === status);
  async function save(id, patch, msg = "Saved") {
    const { item } = await api.patch(`/leads/${id}`, patch);
    setItems((xs) => xs.map((x) => x._id === id ? item : x));
    flash(msg);
  }
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err });
  if (!items) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    toast,
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHead, { title: "Enquiries", sub: "Contact form, '10 min free yantra salaah' aur office visit requests." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: items.length, label: "All", onClick: () => setStatus(""), active: !status }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: counts.new || 0, label: "New", tone: "gold", onClick: () => setStatus("new"), active: status === "new" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: counts.contacted || 0, label: "Contacted", onClick: () => setStatus("contacted"), active: status === "contacted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: counts.closed || 0, label: "Closed", onClick: () => setStatus("closed"), active: status === "closed" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-card flush", children: list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: items.length ? "No enquiries with this status." : "No enquiries yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-table-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "adm-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: list.map((l) => {
        const isOpen = open === l._id;
        const wa = waUrl(l.phone, `Namaste ${l.name}, this is Pt. Rajneesh Sharma's office replying to your message.`);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "click", onClick: () => setOpen(isOpen ? null : l._id), "aria-expanded": isOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "nowrap", children: fmtDateTime(l.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: l.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                l.phone,
                l.country ? ` · ${l.country}` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: LEAD_TYPE[l.type] || l.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "adm-msgcell", children: l.message || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSelect, { value: l.status, options: LEAD_STATUS, onChange: (v) => save(l._id, { status: v }, "Status updated").catch((e) => flash(e.message, "err")) }) })
          ] }),
          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "adm-expand", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-grid2 tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Message" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pre adm-address", children: l.message || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row", children: [
                wa && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "adm-btn primary sm", href: wa, target: "_blank", rel: "noreferrer", children: [
                  "WhatsApp ",
                  l.phone
                ] }),
                l.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "adm-btn ghost sm", href: `mailto:${l.email}`, children: [
                  "Email ",
                  l.email
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(NotesBox, { value: l.adminNotes, onSave: (t) => save(l._id, { adminNotes: t }, "Notes saved") })
          ] }) }) })
        ] }, l._id);
      }) })
    ] }) }) })
  ] });
}
const STOCK = [["available", "Available"], ["made_to_order", "Made to order"], ["out_of_stock", "Out of stock"]];
const catName = (c) => {
  var _a;
  return `${((_a = CATEGORY_LABEL[c]) == null ? void 0 : _a.en) || c} (${c})`;
};
function Yantras() {
  const [items, setItems] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("");
  reactExports.useEffect(() => {
    api.get("/yantras").then((d) => setItems(d.items)).catch((e) => setErr(e.message));
  }, []);
  const noPrice = reactExports.useMemo(() => (items || []).filter((y) => y.priceINR == null || y.priceUSD == null), [items]);
  const list = (items || []).filter((y) => {
    var _a;
    return filter === "noprice" ? y.priceINR == null || y.priceUSD == null : filter === "hidden" ? !y.active : filter === "nophoto" ? !((_a = y.images) == null ? void 0 : _a.length) : true;
  });
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err });
  if (!items) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHead, { title: "Yantras", sub: "Price, photo, size, dhatu, stock aur sthapana vidhi yahan se badlein — website par turant dikhta hai." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: items.length, label: "All yantras", onClick: () => setFilter(""), active: !filter }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: noPrice.length, label: "Price missing", tone: noPrice.length ? "gold" : "", onClick: () => setFilter("noprice"), active: filter === "noprice" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: items.filter((y) => {
        var _a;
        return !((_a = y.images) == null ? void 0 : _a.length);
      }).length, label: "No photo yet", onClick: () => setFilter("nophoto"), active: filter === "nophoto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: items.filter((y) => !y.active).length, label: "Hidden from site", onClick: () => setFilter("hidden"), active: filter === "hidden" })
    ] }),
    list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "Nothing here." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-ygrid", children: list.map((y) => {
      var _a, _b, _c, _d;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/admin/yantras/${y._id}`, className: "adm-ycard", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-ythumb", children: ((_b = (_a = y.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.url) ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: y.images[0].url, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(YantraArt, { variant: y.art }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-ybody", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: y.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: catName(y.category) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-yprice", children: [
            y.priceINR == null ? /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "₹ price missing" }) : money(y.priceINR, "INR"),
            " · ",
            y.priceUSD == null ? /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "$ missing" }) : money(y.priceUSD, "USD")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-row", children: [
            !y.active && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "cancelled", children: "Hidden" }),
            y.bestseller && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "gold", children: "Bestseller" }),
            y.stock !== "available" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { children: (_c = STOCK.find(([k]) => k === y.stock)) == null ? void 0 : _c[1] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { children: [
              ((_d = y.images) == null ? void 0 : _d.length) || 0,
              " photos"
            ] })
          ] })
        ] })
      ] }, y._id);
    }) })
  ] });
}
const toForm$2 = (y) => ({
  name: y.name || "",
  category: y.category,
  order: y.order ?? 0,
  bestseller: !!y.bestseller,
  active: y.active !== false,
  stock: y.stock || "available",
  priceINR: y.priceINR ?? "",
  priceUSD: y.priceUSD ?? "",
  sankalpPriceINR: y.sankalpPriceINR ?? "",
  sankalpPriceUSD: y.sankalpPriceUSD ?? "",
  sizes: (y.sizes || []).join(", "),
  material: y.material || "",
  weightGrams: y.weightGrams ?? "",
  deity: y.deity || "",
  pranPratishtha: y.pranPratishtha || "",
  description: y.description || "",
  purpose: y.purpose || "",
  care: y.care || "",
  boxContents: y.boxContents || "",
  videoUrl: y.videoUrl || "",
  sthapana: { day: "", direction: "", shuddhi: "", mantra: "", daily: "", ...Object.fromEntries(Object.entries(y.sthapana || {}).map(([k, v]) => [k, v || ""])) }
});
function YantraEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [y, setY] = reactExports.useState(null);
  const [cats, setCats] = reactExports.useState([]);
  const [f, setF] = reactExports.useState(null);
  const [images, setImages] = reactExports.useState([]);
  const [busy, setBusy] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState("");
  const [toast, flash] = useFlash();
  reactExports.useEffect(() => {
    api.get("/yantras").then((d) => {
      const item = d.items.find((x) => x._id === id);
      if (!item) return setErr("Yantra not found");
      setCats(d.categories);
      setY(item);
      setF(toForm$2(item));
      setImages(item.images || []);
    }).catch((e) => setErr(e.message));
  }, [id]);
  const dirty = reactExports.useMemo(() => y && f && (JSON.stringify(toForm$2(y)) !== JSON.stringify(f) || JSON.stringify(y.images || []) !== JSON.stringify(images)), [y, f, images]);
  reactExports.useEffect(() => {
    if (!dirty) return void 0;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/yantras", className: "adm-backlink", children: "← Yantras" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err })
  ] });
  if (!f) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const setS = (k) => (e) => setF((x) => ({ ...x, sthapana: { ...x.sthapana, [k]: e.target.value } }));
  async function save(e) {
    e == null ? void 0 : e.preventDefault();
    setBusy(true);
    try {
      const body = { ...f, sizes: f.sizes.split(",").map((s) => s.trim()).filter(Boolean), images: images.map(({ url, label: label2 }) => ({ url, label: label2 })) };
      const { item } = await api.patch(`/yantras/${id}`, body);
      const removedPhotos = (y.images || []).length > images.length;
      setY(item);
      setF(toForm$2(item));
      setImages(item.images || []);
      if (removedPhotos) api.post("/yantras/cleanup-images").catch(() => {
      });
      flash("Saved — live on the website");
    } catch (e2) {
      flash(e2.message, "err");
    } finally {
      setBusy(false);
    }
  }
  async function upload(e) {
    const files = [...e.target.files];
    e.target.value = "";
    if (!files.length) return;
    if (dirty) return flash('Pehle "Save changes" dabayein, phir photo upload karein.', "err");
    const form = new FormData();
    files.forEach((file) => form.append("images", file));
    setBusy(true);
    try {
      const { item } = await api.upload(`/yantras/${id}/images`, form);
      setY(item);
      setImages(item.images || []);
      flash(`${files.length} photo uploaded`);
    } catch (e2) {
      flash(e2.message, "err");
    } finally {
      setBusy(false);
    }
  }
  const move = (i, d) => setImages((xs) => {
    const a = [...xs];
    [a[i], a[i + d]] = [a[i + d], a[i]];
    return a;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, children: [
    toast,
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/yantras", className: "adm-backlink", children: "← Yantras" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHead,
      {
        title: y.name,
        sub: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Live page: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/yantra-shop/${y.slug}`, target: "_blank", rel: "noreferrer", children: [
            "/yantra-shop/",
            y.slug
          ] })
        ] }),
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row", children: [
          dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-hint", children: "Unsaved changes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "adm-btn primary", type: "submit", disabled: busy || !dirty, children: busy ? "Saving…" : "Save changes" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Prices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "adm-hint", children: 'Dono price (₹ aur $) bharne ke baad hi customer checkout kar paayega. Khaali = website par "[₹ PRICE]" dikhega.' }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Price in India (₹)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", type: "number", min: "0", step: "1", value: f.priceINR, onChange: set("priceINR") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "International price ($)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", type: "number", min: "0", step: "0.01", value: f.priceUSD, onChange: set("priceUSD") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Personal sankalp extra (₹)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", type: "number", min: "0", value: f.sankalpPriceINR, onChange: set("sankalpPriceINR") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Personal sankalp extra ($)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", type: "number", min: "0", step: "0.01", value: f.sankalpPriceUSD, onChange: set("sankalpPriceUSD") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Photos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "adm-hint", children: "Pehli photo shop aur card par dikhti hai. Order: Front, Back, Haath mein size, Packaging. JPG / PNG / WEBP, max 5 MB, 8 photos tak." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-photos", children: [
        images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-photo", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img.url, alt: img.label || y.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input sm", value: img.label || "", placeholder: "Label", "aria-label": "Photo label", onChange: (e) => setImages((xs) => xs.map((x, k) => k === i ? { ...x, label: e.target.value } : x)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn ghost xs", disabled: i === 0, onClick: () => move(i, -1), "aria-label": "Move left", children: "←" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn ghost xs", disabled: i === images.length - 1, onClick: () => move(i, 1), "aria-label": "Move right", children: "→" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn danger xs", onClick: () => setImages((xs) => xs.filter((_, k) => k !== i)), children: "Remove" })
          ] })
        ] }, img.url)),
        images.length < 8 && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-photo add", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/jpeg,image/png,image/webp", multiple: true, onChange: upload, disabled: busy }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+ Upload photos" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Video URL (30–60 sec, YouTube or .mp4)", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.videoUrl, onChange: set("videoUrl"), placeholder: "https://…" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Basic" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.name, onChange: set("name"), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "adm-input", value: f.category, onChange: set("category"), children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: catName(c) }, c)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Stock", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "adm-input", value: f.stock, onChange: set("stock"), children: STOCK.map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v, children: l }, v)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Order in shop", hint: "Chhota number = pehle dikhega", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", type: "number", value: f.order, onChange: set("order") }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row checks", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: f.active, onChange: set("active") }),
          " Show on website"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: f.bestseller, onChange: set("bestseller") }),
          " Bestseller (home page par dikhega)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sizes", hint: "Comma se alag karein: 2 x 2 inch, 3 x 3 inch", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.sizes, onChange: set("sizes") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Metal / material", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.material, onChange: set("material"), placeholder: "Copper, gold plated / Ashtadhatu / Bhojpatra" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Weight (grams)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", type: "number", min: "0", value: f.weightGrams, onChange: set("weightGrams") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Deity / planet", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.deity, onChange: set("deity") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pran-pratishtha", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.pranPratishtha, onChange: set("pranPratishtha"), placeholder: "Kis din, kis vidhi se, Pt. Rajneesh Sharma dwara" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description (2–3 lines)", wide: true, hint: "English mein likhein — website ki default language English hai. Guarantee ki bhasha nahi.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "adm-input", rows: 3, value: f.description, onChange: set("description") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Used for", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "adm-input", rows: 2, value: f.purpose, onChange: set("purpose") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Care", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "adm-input", rows: 2, value: f.care, onChange: set("care"), placeholder: "Cleaning, where to keep it, what to avoid" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "In the box", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.boxContents, onChange: set("boxContents") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Installation (sthapana vidhi)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Day & time", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.sthapana.day, onChange: setS("day") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Direction / place", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.sthapana.direction, onChange: setS("direction") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Purification", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.sthapana.shuddhi, onChange: setS("shuddhi") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mantra (how many times)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.sthapana.mantra, onChange: setS("mantra") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Daily care", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.sthapana.daily, onChange: setS("daily") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-savebar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn ghost", onClick: () => navigate("/admin/yantras"), children: "Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "adm-btn primary", type: "submit", disabled: busy || !dirty, children: busy ? "Saving…" : "Save changes" })
    ] })
  ] });
}
function Bars({ rows, total, label: label2 = (k) => k }) {
  if (!rows.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No data yet." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "adm-table compact", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r) => {
    const pct = total ? Math.round(r.n / total * 100) : 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: label2(r.key) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: r.n.toLocaleString("en-IN") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "bar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: `${Math.max(pct, 1)}%` } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
          pct,
          "%"
        ] })
      ] })
    ] }, String(r.key));
  }) }) });
}
function Daily({ rows, days }) {
  const map = Object.fromEntries(rows.map((r) => [r.key, r.n]));
  const list = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() + 330 * 6e4 - i * 864e5).toISOString().slice(0, 10);
    list.push([d, map[d] || 0]);
  }
  const max = Math.max(1, ...list.map(([, n]) => n));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-chart", role: "img", "aria-label": `Visits per day, last ${days} days`, children: [
    list.map(([d, n]) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-col", title: `${d}: ${n} visits`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { height: `${n / max * 100}%` } }) }, d)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-chart-axis", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: list[0][0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
        "max ",
        max,
        "/day"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: list[list.length - 1][0] })
    ] })
  ] });
}
function Visitors() {
  const [days, setDays] = reactExports.useState(30);
  const [d, setD] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState("");
  reactExports.useEffect(() => {
    setD(null);
    api.get(`/visitors?days=${days}`).then(setD).catch((e) => setErr(e.message));
  }, [days]);
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err });
  const known = d ? d.byCountry.filter((r) => r.key) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHead,
      {
        title: "Visitors",
        sub: "Website par aane wale log — page views, desh, pages aur kahan se aaye. IP address save nahi hota.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "adm-input", style: { width: "auto" }, value: days, onChange: (e) => setDays(Number(e.target.value)), "aria-label": "Range", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 7, children: "Last 7 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 30, children: "Last 30 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 90, children: "Last 90 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 365, children: "Last 12 months" })
        ] })
      }
    ),
    !d ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-stats", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: d.inRange.toLocaleString("en-IN"), label: `Page views · ${days} days`, tone: "gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: d.unique.toLocaleString("en-IN"), label: "Visitors (sessions)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: known[0] ? countryName(known[0].key) : "—", label: "Top country" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: d.total.toLocaleString("en-IN"), label: "Page views (all time)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Visits per day" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Daily, { rows: d.byDay, days: Math.min(days, 90) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-grid2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Visitors by country" }),
          known.length === 0 && d.inRange > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "adm-hint", children: "Desh tabhi dikhega jab site Cloudflare (free) ke peeche ho, ya Nginx GeoIP lagaa ho — DEPLOY.md dekhein." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bars, { rows: d.byCountry, total: d.inRange, label: countryName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Top pages" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bars, { rows: d.byPath, total: d.inRange, label: (p) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: p, target: "_blank", rel: "noreferrer", children: p }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Came from" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bars, { rows: d.byReferrer.map((r) => ({ ...r, key: r.key || "Direct / typed" })), total: d.inRange })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Device" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bars, { rows: d.byDevice, total: d.inRange, label: (k) => k === "mobile" ? "Mobile" : "Desktop" })
        ] })
      ] })
    ] })
  ] });
}
const STATUS$1 = [["active", "Active (live)"], ["draft", "Draft"], ["paused", "Paused"]];
const slugify$1 = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 40);
function Countries() {
  const [items, setItems] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState("");
  const [form, setForm] = reactExports.useState({ name: "", code: "", slug: "" });
  const [slugTouched, setSlugTouched] = reactExports.useState(false);
  const [confirmId, setConfirmId] = reactExports.useState(null);
  const [toast, flash] = useFlash();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    api.get("/countries").then((d) => setItems(d.items)).catch((e) => setErr(e.message));
  }, []);
  const counts = reactExports.useMemo(() => (items || []).reduce((c, x) => ({ ...c, [x.status]: (c[x.status] || 0) + 1 }), {}), [items]);
  async function add(e) {
    e.preventDefault();
    try {
      const { item } = await api.post("/countries", form);
      flash(`${item.name} added as draft — fill in the page and set it Active`);
      navigate(`/admin/countries/${item._id}`);
    } catch (e2) {
      flash(e2.message, "err");
    }
  }
  async function setStatus(id, status) {
    try {
      const { item } = await api.patch(`/countries/${id}`, { status });
      setItems((xs) => xs.map((x) => x._id === id ? item : x));
      flash(status === "active" ? "Live on the website" : "Status updated");
    } catch (e) {
      flash(e.message, "err");
    }
  }
  async function remove(id) {
    if (confirmId !== id) return setConfirmId(id);
    try {
      await api.del(`/countries/${id}`);
      setItems((xs) => xs.filter((x) => x._id !== id));
      setConfirmId(null);
      flash("Deleted");
    } catch (e) {
      flash(e.message, "err");
    }
  }
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err });
  if (!items) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    toast,
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHead, { title: "Countries", sub: "Har desh ka apna page: /nadi-astrology/<slug>. Sirf 'Active' pages website aur Google sitemap mein dikhte hain." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: items.length, label: "Total countries" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: counts.active || 0, label: "Active", tone: "gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: counts.draft || 0, label: "Draft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: counts.paused || 0, label: "Paused" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "adm-card", onSubmit: add, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Add a country" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: form.name, placeholder: "New Zealand", required: true, onChange: (e) => {
          const name = e.target.value;
          setForm((f) => ({ ...f, name, slug: slugTouched ? f.slug : slugify$1(name) }));
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country code", hint: form.code.length === 2 ? countryName(form.code.toUpperCase()) : "2 letters, e.g. NZ", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: form.code, maxLength: 2, placeholder: "NZ", required: true, onChange: (e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() })) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL slug", hint: `/nadi-astrology/${form.slug || "…"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: form.slug, placeholder: "new-zealand", required: true, onChange: (e) => {
          setSlugTouched(true);
          setForm((f) => ({ ...f, slug: slugify$1(e.target.value) }));
        } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "adm-btn primary", type: "submit", children: "Add country" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-card flush", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No country pages yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-table-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "adm-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Country" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Page" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Updated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/admin/countries/${c._id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: c.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
            c.code,
            c.nameHi ? ` · ${c.nameHi}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: c.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/nadi-astrology/${c.slug}`, target: "_blank", rel: "noreferrer", children: [
          "/nadi-astrology/",
          c.slug,
          " ↗"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-hint", children: [
          "/nadi-astrology/",
          c.slug
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSelect, { value: c.status, options: STATUS$1, onChange: (v) => setStatus(c._id, v) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "nowrap", children: fmtDate(c.updatedAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "adm-btn ghost xs", to: `/admin/countries/${c._id}`, children: "Edit" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn danger xs", onClick: () => remove(c._id), onBlur: () => setConfirmId(null), children: confirmId === c._id ? "Sure? Click again" : "Delete" })
        ] })
      ] }, c._id)) })
    ] }) }) })
  ] });
}
const blankFaq = () => ({ q: { en: "", hi: "" }, a: { en: "", hi: "" } });
const toForm$1 = (c) => {
  var _a, _b, _c, _d, _e, _f;
  return {
    name: c.name || "",
    nameHi: c.nameHi || "",
    code: c.code || "",
    slug: c.slug || "",
    inName: c.inName || "",
    status: c.status,
    order: c.order ?? 0,
    shippingDays: c.shippingDays || "",
    seoTitle: c.seoTitle || "",
    metaDescription: c.metaDescription || "",
    cities: (c.cities || []).join(", "),
    timezones: (c.timezones || []).map((z) => ({ label: z.label, tz: z.tz })),
    intro: { en: ((_a = c.intro) == null ? void 0 : _a.en) || "", hi: ((_b = c.intro) == null ? void 0 : _b.hi) || "" },
    community: { en: ((_c = c.community) == null ? void 0 : _c.en) || "", hi: ((_d = c.community) == null ? void 0 : _d.hi) || "" },
    customsNote: { en: ((_e = c.customsNote) == null ? void 0 : _e.en) || "", hi: ((_f = c.customsNote) == null ? void 0 : _f.hi) || "" },
    faqs: (c.faqs || []).map((f) => {
      var _a2, _b2, _c2, _d2;
      return { q: { en: ((_a2 = f.q) == null ? void 0 : _a2.en) || "", hi: ((_b2 = f.q) == null ? void 0 : _b2.hi) || "" }, a: { en: ((_c2 = f.a) == null ? void 0 : _c2.en) || "", hi: ((_d2 = f.a) == null ? void 0 : _d2.hi) || "" } };
    })
  };
};
function TwoLang({ label: label2, value, onChange, rows = 3, hint }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-twolang", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: label2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-hint", children: "English (default)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "adm-input", rows, value: value.en, onChange: (e) => onChange({ ...value, en: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-hint", children: "हिंदी (khaali = English dikhega)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "adm-input", rows, lang: "hi", value: value.hi, onChange: (e) => onChange({ ...value, hi: e.target.value }) })
      ] })
    ] }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-hint", children: hint })
  ] });
}
function CountryEdit() {
  const { id } = useParams();
  const [orig, setOrig] = reactExports.useState(null);
  const [f, setF] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState("");
  const [toast, flash] = useFlash();
  reactExports.useEffect(() => {
    api.get("/countries").then((d) => {
      const c = d.items.find((x) => x._id === id);
      if (!c) return setErr("Country not found");
      setOrig(c);
      setF(toForm$1(c));
    }).catch((e) => setErr(e.message));
  }, [id]);
  const dirty = reactExports.useMemo(() => orig && f && JSON.stringify(toForm$1(orig)) !== JSON.stringify(f), [orig, f]);
  reactExports.useEffect(() => {
    if (!dirty) return void 0;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/countries", className: "adm-backlink", children: "← Countries" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err })
  ] });
  if (!f) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const setV = (k) => (v) => setF((x) => ({ ...x, [k]: v }));
  async function save(e) {
    e == null ? void 0 : e.preventDefault();
    setBusy(true);
    try {
      const body = { ...f, cities: f.cities.split(",").map((s) => s.trim()).filter(Boolean), faqs: f.faqs.filter((q) => q.q.en.trim() && q.a.en.trim()) };
      const { item } = await api.patch(`/countries/${id}`, body);
      setOrig(item);
      setF(toForm$1(item));
      flash(item.status === "active" ? "Saved — live on the website" : "Saved");
    } catch (e2) {
      flash(e2.message, "err");
    } finally {
      setBusy(false);
    }
  }
  const live = orig.status === "active";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, children: [
    toast,
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/countries", className: "adm-backlink", children: "← Countries" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHead,
      {
        title: orig.name,
        sub: live ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Live page: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/nadi-astrology/${orig.slug}`, target: "_blank", rel: "noreferrer", children: [
            "/nadi-astrology/",
            orig.slug,
            " ↗"
          ] })
        ] }) : `Not live yet — set status to Active to publish /nadi-astrology/${orig.slug}`,
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row", children: [
          dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-hint", children: "Unsaved changes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "adm-btn primary", type: "submit", disabled: busy || !dirty, children: busy ? "Saving…" : "Save changes" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Basic" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country name (English)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.name, onChange: set("name"), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name in Hindi", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", lang: "hi", value: f.nameHi, onChange: set("nameHi"), placeholder: "न्यूज़ीलैंड" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "In a sentence", hint: `"Nadi Astrology in ${f.inName || "…"}"`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.inName, onChange: set("inName"), placeholder: "the USA / Malaysia" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country code", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.code, maxLength: 2, onChange: (e) => setF((x) => ({ ...x, code: e.target.value.toUpperCase() })) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL slug", hint: "Live hone ke baad mat badlein — Google ranking reset ho jaati hai.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.slug, onChange: (e) => setF((x) => ({ ...x, slug: slugify$1(e.target.value) })) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "adm-input", value: f.status, onChange: set("status"), children: STATUS$1.map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v, children: l }, v)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Order", hint: "Chhota number = pehle dikhega", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", type: "number", value: f.order, onChange: set("order") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Page content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "adm-hint", children: "Google ke liye har desh ka page alag aur kaam ka hona chahiye — sirf desh ka naam badal kar copy mat karein. Us desh ke logon ki asli baatein likhein." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TwoLang, { label: "Intro (top of the page)", value: f.intro, onChange: setV("intro"), rows: 4 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TwoLang, { label: "Community — who is there, why Nadi readings are sought", value: f.community, onChange: setV("community"), rows: 4 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cities (comma separated)", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.cities, onChange: set("cities"), placeholder: "Auckland, Wellington, Christchurch" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Time zones" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "adm-hint", children: [
        "Page par slot ka local time inhi se banta hai. Time zone ka naam jaise ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "America/New_York" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Europe/London" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Asia/Dubai" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Pacific/Auckland" }),
        "."
      ] }),
      f.timezones.map((z, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", style: { alignItems: "end" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "City label", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: z.label, onChange: (e) => setF((x) => ({ ...x, timezones: x.timezones.map((t, k) => k === i ? { ...t, label: e.target.value } : t) })) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Time zone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: z.tz, onChange: (e) => setF((x) => ({ ...x, timezones: x.timezones.map((t, k) => k === i ? { ...t, tz: e.target.value } : t) })) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn danger xs", onClick: () => setF((x) => ({ ...x, timezones: x.timezones.filter((_, k) => k !== i) })), children: "Remove" }) })
      ] }, i)),
      f.timezones.length < 6 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn ghost sm", onClick: () => setF((x) => ({ ...x, timezones: [...x.timezones, { label: "", tz: "" }] })), children: "+ Add time zone" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Yantra shipping" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-form-grid", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Delivery days", hint: "e.g. 7–12. Khaali = 'confirmed on WhatsApp' dikhega", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.shippingDays, onChange: set("shippingDays") }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TwoLang, { label: "Customs / duty note", value: f.customsNote, onChange: setV("customsNote"), rows: 2 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "FAQ for this country" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "adm-hint", children: "Page par 2 common sawal (thumb impression bhejna, patta na mile to) apne-aap judte hain. Yahan sirf is desh ke sawal likhein." }),
      f.faqs.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-faq", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TwoLang, { label: `Question ${i + 1}`, value: q.q, rows: 1, onChange: (v) => setF((x) => ({ ...x, faqs: x.faqs.map((y, k) => k === i ? { ...y, q: v } : y) })) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TwoLang, { label: "Answer", value: q.a, rows: 3, onChange: (v) => setF((x) => ({ ...x, faqs: x.faqs.map((y, k) => k === i ? { ...y, a: v } : y) })) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn danger xs", onClick: () => setF((x) => ({ ...x, faqs: x.faqs.filter((_, k) => k !== i) })), children: "Remove question" })
      ] }, i)),
      f.faqs.length < 12 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn ghost sm", onClick: () => setF((x) => ({ ...x, faqs: [...x.faqs, blankFaq()] })), children: "+ Add question" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Google (SEO)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid one", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: `SEO title (${f.seoTitle.length}/60)`, hint: "Khaali = 'Nadi Astrology in … — Online Palm Leaf Reading'", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.seoTitle, maxLength: 70, onChange: set("seoTitle") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: `Meta description (${f.metaDescription.length}/155)`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "adm-input", rows: 2, maxLength: 170, value: f.metaDescription, onChange: set("metaDescription") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-savebar", children: [
      live && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "adm-btn ghost", href: `/nadi-astrology/${orig.slug}`, target: "_blank", rel: "noreferrer", children: "View page ↗" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "adm-btn primary", type: "submit", disabled: busy || !dirty, children: busy ? "Saving…" : "Save changes" })
    ] })
  ] });
}
const STATUS = [["draft", "Draft"], ["scheduled", "Scheduled"], ["published", "Published"]];
const slugify = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 90).replace(/-$/, "");
const toIstInput = (d) => d ? new Date(new Date(d).getTime() + 330 * 6e4).toISOString().slice(0, 16) : "";
const fromIstInput = (v) => v ? (/* @__PURE__ */ new Date(`${v}:00+05:30`)).toISOString() : null;
const istDayKey = (d) => new Date(new Date(d).getTime() + 330 * 6e4).toISOString().slice(0, 10);
const isLive = (p) => p.status !== "draft" && p.publishAt && new Date(p.publishAt) <= /* @__PURE__ */ new Date();
function statusOf(p) {
  if (p.status === "draft") return ["Draft", ""];
  if (!isLive(p)) return ["Scheduled", "gold"];
  return ["Live", "done"];
}
function placesOf(p, countries) {
  var _a;
  if (p.allCountries) return "All countries";
  if (!((_a = p.countries) == null ? void 0 : _a.length)) return "Blog only";
  const names = p.countries.map((s) => {
    var _a2;
    return ((_a2 = countries.find((c) => c.slug === s)) == null ? void 0 : _a2.name) || s;
  });
  return names.length > 3 ? `${names.slice(0, 3).join(", ")} +${names.length - 3}` : names.join(", ");
}
function Posts() {
  const [d, setD] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("");
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    api.get("/posts").then(setD).catch((e) => setErr(e.message));
  }, []);
  const days = reactExports.useMemo(() => {
    const out = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(Date.now() + i * 864e5);
      out.push({ key: istDayKey(date), label: date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" }) });
    }
    return out;
  }, []);
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err });
  if (!d) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  const live = d.items.filter(isLive).length;
  const scheduled = d.items.filter((p) => p.status !== "draft" && !isLive(p)).length;
  const drafts = d.items.filter((p) => p.status === "draft").length;
  const list = d.items.filter((p) => !filter || (filter === "live" ? isLive(p) : filter === "scheduled" ? p.status !== "draft" && !isLive(p) : p.status === "draft"));
  const byDay = d.items.filter((p) => p.status !== "draft" && p.publishAt).reduce((m, p) => ({ ...m, [istDayKey(p.publishAt)]: [...m[istDayKey(p.publishAt)] || [], p] }), {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHead,
      {
        title: "Blog posts",
        sub: "Har post /blog par dikhti hai. Saath mein chuno: sabhi country pages par, sirf chune hue desh par, ya sirf blog par.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/blog/new", className: "adm-btn primary", children: "+ New post" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: d.items.length, label: "All posts", onClick: () => setFilter(""), active: !filter }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: live, label: "Live", onClick: () => setFilter("live"), active: filter === "live" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: scheduled, label: "Scheduled", tone: "gold", onClick: () => setFilter("scheduled"), active: filter === "scheduled" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: drafts, label: "Drafts", onClick: () => setFilter("draft"), active: filter === "draft" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Post schedule: next 14 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-cal", children: days.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `adm-cal-day${byDay[day.key] ? " has" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: day.label }),
        (byDay[day.key] || []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/admin/blog/${p._id}`, children: p.title }, p._id))
      ] }, day.key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "adm-hint", children: "Google ke liye hafte mein 2–3 achhi posts kaafi hain. Ek hi din bahut saari posts daalne se behtar hai roz/alternate din schedule karna." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-card flush", children: list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No posts here yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-table-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "adm-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Shown on" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Publish (IST)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: list.map((p) => {
        const [label2, tone] = statusOf(p);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "click", onClick: () => navigate(`/admin/blog/${p._id}`), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
              "/blog/",
              p.slug
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: p.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: placesOf(p, d.countries) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone, children: label2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "nowrap", children: p.publishAt ? fmtDateTime(p.publishAt) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "adm-btn ghost xs", to: `/admin/blog/${p._id}`, onClick: (e) => e.stopPropagation(), children: "Edit" }) })
        ] }, p._id);
      }) })
    ] }) }) })
  ] });
}
const EMPTY = {
  title: "",
  titleHi: "",
  slug: "",
  category: "Nadi",
  excerpt: "",
  excerptHi: "",
  content: "",
  contentHi: "",
  cover: "",
  youtubeId: "",
  allCountries: true,
  countries: [],
  status: "draft",
  publishAt: "",
  seoTitle: "",
  metaDescription: ""
};
const toForm = (p) => ({ ...EMPTY, ...Object.fromEntries(Object.keys(EMPTY).map((k) => [k, p[k] ?? EMPTY[k]])), publishAt: toIstInput(p.publishAt), countries: p.countries || [] });
function countWords(html) {
  const text = String(html || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ");
  return text.split(/\s+/).filter(Boolean).length;
}
const internalLinks = (html) => (String(html || "").match(/href="\/(?!\/)[^"]*"/g) || []).length;
function PostEdit() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [orig, setOrig] = reactExports.useState(isNew ? EMPTY : null);
  const [f, setF] = reactExports.useState(isNew ? EMPTY : null);
  const [meta, setMeta] = reactExports.useState({ categories: [], countries: [] });
  const [slugTouched, setSlugTouched] = reactExports.useState(!isNew);
  const [mode, setMode] = reactExports.useState("edit");
  const [showHi, setShowHi] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  const [confirmDel, setConfirmDel] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState("");
  const [toast, flash] = useFlash();
  const contentRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    api.get("/posts").then((d) => setMeta({ categories: d.categories, countries: d.countries })).catch(() => {
    });
    if (!isNew) {
      api.get(`/posts/${id}`).then(({ item }) => {
        setOrig(toForm(item));
        setF(toForm(item));
        setShowHi(!!(item.titleHi || item.contentHi));
      }).catch((e) => setErr(e.message));
    }
  }, [id, isNew]);
  const dirty = reactExports.useMemo(() => f && orig && JSON.stringify(f) !== JSON.stringify(orig), [f, orig]);
  reactExports.useEffect(() => {
    if (!dirty) return void 0;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  if (err) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/blog", className: "adm-backlink", children: "← Blog posts" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBox, { error: err })
  ] });
  if (!f) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setF((x) => ({ ...x, [k]: v, ...k === "title" && !slugTouched ? { slug: slugify(v) } : {} }));
  };
  const words = countWords(f.content);
  const links = internalLinks(f.content);
  const hasImage = /<img\s/i.test(f.content) || !!f.cover || !!f.youtubeId;
  const missingAlt = (f.content.match(/alt="(Describe this photo in English)?"/g) || []).length;
  const activeCountries = meta.countries.filter((c) => c.status === "active");
  const otherCountries = meta.countries.filter((c) => c.status !== "active");
  const target = f.allCountries ? "all" : f.countries.length ? "some" : "none";
  async function uploadImage(file) {
    const form = new FormData();
    form.append("image", file);
    const { url } = await api.upload("/posts/upload-image", form);
    return url;
  }
  async function onCover(e) {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    try {
      setBusy(true);
      const url = await uploadImage(file);
      setF((x) => ({ ...x, cover: url }));
      flash("Cover uploaded — save the post to keep it");
    } catch (e2) {
      flash(e2.message, "err");
    } finally {
      setBusy(false);
    }
  }
  async function onInlineImage(e) {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    try {
      setBusy(true);
      const url = await uploadImage(file);
      const snippet = `
<figure><img src="${url}" alt="Describe this photo in English" /><figcaption></figcaption></figure>
`;
      const el = contentRef.current;
      const pos = el ? el.selectionStart : f.content.length;
      setF((x) => ({ ...x, content: x.content.slice(0, pos) + snippet + x.content.slice(pos) }));
      flash("Photo added — ab uska alt text (description) likhein");
    } catch (e2) {
      flash(e2.message, "err");
    } finally {
      setBusy(false);
    }
  }
  async function save(e, statusOverride) {
    e == null ? void 0 : e.preventDefault();
    const status = statusOverride || f.status;
    const body = { ...f, status, publishAt: status === "published" && !f.publishAt ? null : fromIstInput(f.publishAt) };
    if (status === "published" && f.publishAt && new Date(fromIstInput(f.publishAt)) > /* @__PURE__ */ new Date()) body.status = "scheduled";
    if (!body.allCountries && target === "none") body.countries = [];
    setBusy(true);
    try {
      const { item } = isNew ? await api.post("/posts", body) : await api.patch(`/posts/${id}`, body);
      const nf = toForm(item);
      setOrig(nf);
      setF(nf);
      flash(item.status === "draft" ? "Draft saved" : isLive(item) ? "Saved — live on the website" : `Scheduled for ${fmtDateTime(item.publishAt)}`);
      if (isNew) navigate(`/admin/blog/${item._id}`, { replace: true });
    } catch (e2) {
      flash(e2.message, "err");
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (!confirmDel) return setConfirmDel(true);
    try {
      await api.del(`/posts/${id}`);
      navigate("/admin/blog");
    } catch (e2) {
      flash(e2.message, "err");
    }
  }
  const live = !isNew && orig.status !== "draft" && orig.publishAt && new Date(fromIstInput(orig.publishAt)) <= /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, children: [
    toast,
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/blog", className: "adm-backlink", children: "← Blog posts" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHead,
      {
        title: isNew ? "New post" : orig.title || "Untitled",
        sub: live ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Live: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/blog/${orig.slug}`, target: "_blank", rel: "noreferrer", children: [
            "/blog/",
            orig.slug,
            " ↗"
          ] })
        ] }) : isNew ? "Pehle Draft save karein, phir publish ya schedule." : `Not live — /blog/${orig.slug}`,
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row", children: [
          dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-hint", children: "Unsaved changes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "adm-btn primary", type: "submit", disabled: busy || !dirty && !isNew, children: busy ? "Saving…" : "Save" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "adm-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.title, onChange: set("title"), required: true, placeholder: "e.g. How a Nadi leaf is found from your thumb impression" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL slug", hint: `/blog/${f.slug || "…"}${live ? " — live post ka URL mat badlein" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.slug, onChange: (e) => {
        setSlugTouched(true);
        setF((x) => ({ ...x, slug: slugify(e.target.value) }));
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "adm-input", value: f.category, onChange: set("category"), children: meta.categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: `SEO title (${f.seoTitle.length}/60)`, hint: "Khaali = title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.seoTitle, maxLength: 70, onChange: set("seoTitle"), placeholder: "Main keyword first | Pt. Rajneesh Sharma" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: `Meta description (${f.metaDescription.length}/155)`, wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.metaDescription, maxLength: 170, onChange: set("metaDescription") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Excerpt (blog list par dikhega)", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "adm-input", rows: 2, maxLength: 400, value: f.excerpt, onChange: set("excerpt") }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Cover & video" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Cover image" }),
          f.cover && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: f.cover, alt: "", className: "adm-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-btn ghost sm adm-filebtn", children: [
              f.cover ? "Change" : "Upload",
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/jpeg,image/png,image/webp", onChange: onCover, disabled: busy })
            ] }),
            f.cover && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn danger sm", onClick: () => setF((x) => ({ ...x, cover: "" })), children: "Remove" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.cover, onChange: set("cover"), placeholder: "ya https:// image link" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "YouTube video (link or ID)", hint: "Post ke neeche video dikhega", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", value: f.youtubeId, onChange: set("youtubeId"), placeholder: "https://youtu.be/…" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-card-head", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-hint", children: [
            words,
            " words · ",
            links,
            " internal links"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-btn ghost sm adm-filebtn", children: [
            "Add photo to content",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/jpeg,image/png,image/webp", onChange: onInlineImage, disabled: busy })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn ghost sm", onClick: () => setMode((m) => m === "edit" ? "preview" : "edit"), children: mode === "edit" ? "Preview" : "Edit" })
        ] })
      ] }),
      mode === "edit" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { ref: contentRef, className: "adm-input adm-code", rows: 20, value: f.content, onChange: set("content"), placeholder: '<h2>Heading</h2>\n<p>Paragraph…</p>\n<p><a href="/nadi-astrology">Nadi astrology</a></p>' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "adm-hint", children: 'HTML: <h2> heading, <p> paragraph, <ul><li> list, <a href="/kp-prashna"> link, <strong> bold. Script ya unsafe code save hote waqt apne-aap hat jaata hai.' })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-preview prose", dangerouslySetInnerHTML: { __html: f.content || "<p>Nothing yet.</p>" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn ghost sm", style: { marginTop: 12 }, onClick: () => setShowHi((v) => !v), children: showHi ? "Hide Hindi version" : "+ Hindi version (optional)" }),
      showHi && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid one", style: { marginTop: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title in Hindi", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", lang: "hi", value: f.titleHi, onChange: set("titleHi") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Excerpt in Hindi", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "adm-input", lang: "hi", rows: 2, value: f.excerptHi, onChange: set("excerptHi") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Content in Hindi (HTML)", hint: "Khaali = हिंदी चुनने वाले को English article dikhega", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "adm-input adm-code", lang: "hi", rows: 12, value: f.contentHi, onChange: set("contentHi") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Kin country pages par yeh post dikhe?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "adm-hint", children: 'Blog par post hamesha dikhti hai. Yahan chuno ki country pages ke "Latest updates" mein bhi dikhe ya nahi.' }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-choice", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "target", checked: target === "all", onChange: () => setF((x) => ({ ...x, allCountries: true })) }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Sabhi countries" }),
          " — har country page par (naye desh bhi apne-aap)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "target", checked: target === "some", onChange: () => setF((x) => ({ ...x, allCountries: false, countries: x.countries.length ? x.countries : activeCountries.slice(0, 1).map((c) => c.slug) })) }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Sirf chune hue desh" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "target", checked: target === "none", onChange: () => setF((x) => ({ ...x, allCountries: false, countries: [] })) }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Sirf blog par" }),
          " — country pages par nahi"
        ] })
      ] }),
      target === "some" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-countrypick", children: [...activeCountries, ...otherCountries].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: f.countries.includes(c.slug) ? "on" : "", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: f.countries.includes(c.slug), onChange: (e) => setF((x) => ({ ...x, countries: e.target.checked ? [...x.countries, c.slug] : x.countries.filter((s) => s !== c.slug) })) }),
        c.name,
        c.status !== "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { className: "inline", children: [
          " (",
          c.status,
          ")"
        ] })
      ] }, c.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Publish se pehle check karein (Google spam policy)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "adm-checklist", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: words >= 800 ? "ok" : "", children: [
          "800–1200 words, ek specific sawal ka poora jawab (abhi ",
          words,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: hasImage ? "ok" : "", children: "Kam se kam 1 asli photo ya video (stock photo nahi)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: missingAlt === 0 ? "ok" : "", children: [
          "Har photo ka alt text (description) likha ho",
          missingAlt ? ` — ${missingAlt} baaki` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: links >= 2 ? "ok" : "", children: [
          "2 internal links — ek service page, ek yantra / country page (abhi ",
          links,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pandit ji ne facts check kiye" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "AI draft ho to rewrite karke apna anubhav joda" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "adm-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "adm-input", value: f.status, onChange: set("status"), children: STATUS.map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v, children: l }, v)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Publish date & time (IST)", hint: f.status === "scheduled" ? "Isi samay apne-aap live hogi" : f.status === "published" ? "Khaali = abhi" : "Draft website par nahi dikhta", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", type: "datetime-local", value: f.publishAt, onChange: set("publishAt") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-savebar", children: [
      !isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn danger", onClick: remove, onBlur: () => setConfirmDel(false), children: confirmDel ? "Sure? Click again to delete" : "Delete" }),
      live && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "adm-btn ghost", href: `/blog/${orig.slug}`, target: "_blank", rel: "noreferrer", children: "View ↗" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn ghost", disabled: busy, onClick: (e) => save(e, "draft"), children: "Save draft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "adm-btn primary", type: "submit", disabled: busy, children: f.status === "draft" ? "Save" : f.status === "scheduled" ? "Schedule" : "Publish" })
    ] })
  ] });
}
function Password() {
  const [state, setState] = reactExports.useState({ type: "", msg: "" });
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form));
    if (f.next !== f.again) return setState({ type: "err", msg: "New passwords do not match." });
    if (f.next.length < 10) return setState({ type: "err", msg: "Use at least 10 characters." });
    try {
      await api.post("/password", { current: f.current, next: f.next });
      form.reset();
      setState({ type: "ok", msg: "Password changed. Doosre sab devices se logout ho gaya." });
    } catch (e2) {
      setState({ type: "err", msg: e2.message });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHead, { title: "Change password" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "adm-card narrow", onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "adm-hint", children: "Kam se kam 10 characters. Badalne par baaki sab devices se logout ho jaata hai." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Current password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", name: "current", type: "password", autoComplete: "current-password", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "New password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", name: "next", type: "password", autoComplete: "new-password", minLength: 10, required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "New password again" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", name: "again", type: "password", autoComplete: "new-password", minLength: 10, required: true })
      ] }),
      state.msg && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `adm-msg ${state.type}`, role: "status", children: state.msg }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "adm-btn primary", type: "submit", children: "Change password" })
    ] })
  ] });
}
const NAV = [
  ["", "Dashboard", "M3 12l9-8 9 8M5 10v10h5v-6h4v6h5V10"],
  ["bookings", "Bookings", "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"],
  ["orders", "Yantra orders", "M4 7h16l-1.5 12.5a1 1 0 01-1 .5h-11a1 1 0 01-1-.5zM9 7V5a3 3 0 016 0v2"],
  ["enquiries", "Enquiries", "M4 6h16v12H4zM4 7l8 6 8-6"],
  ["yantras", "Yantras", "M12 3l9 16H3zM12 21L3 5h18z"],
  ["blog", "Blog posts", "M4 5h16M4 10h16M4 15h10M4 20h7"],
  ["countries", "Countries", "M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"],
  ["visitors", "Visitors", "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21M12 3C9.5 5.7 8.2 8.7 8.2 12s1.3 6.3 3.8 9"],
  ["password", "Change password", "M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z"]
];
function Icon({ d }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d }) });
}
function Login({ onDone }) {
  const [err, setErr] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  async function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    setBusy(true);
    setErr("");
    try {
      onDone(await api.post("/login", f));
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "adm-login-card", onSubmit: submit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-mark", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 40 40", width: "40", height: "40", fill: "none", stroke: "#D9B26F", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "18" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "11", strokeDasharray: "1.5 3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "3", fill: "#D9B26F" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-kicker", children: "Pt. Rajneesh Sharma" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Admin sign in" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", name: "email", type: "email", autoComplete: "username", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "adm-field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-label", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "adm-input", name: "password", type: "password", autoComplete: "current-password", required: true })
    ] }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-msg err", role: "alert", children: err }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "adm-btn primary", type: "submit", disabled: busy, children: busy ? "Signing in…" : "Sign in" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "adm-back", href: "/", children: "← Back to website" })
  ] }) });
}
function AdminApp() {
  const [me, setMe] = reactExports.useState(void 0);
  const [menu, setMenu] = reactExports.useState(false);
  const { pathname } = useLocation();
  reactExports.useEffect(() => {
    document.title = "Admin | Pt. Rajneesh Sharma";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex, nofollow";
    api.get("/me").then(setMe).catch(() => setMe(null));
    const out = () => setMe(null);
    window.addEventListener("admin:logout", out);
    return () => window.removeEventListener("admin:logout", out);
  }, []);
  reactExports.useEffect(() => setMenu(false), [pathname]);
  const logout = reactExports.useCallback(async () => {
    await api.post("/logout").catch(() => {
    });
    setMe(null);
  }, []);
  if (me === void 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm notranslate", translate: "no", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm-login", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-sub", children: "Loading…" }) }) });
  if (!me) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adm notranslate", translate: "no", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Login, { onDone: setMe }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `adm notranslate${menu ? " menu-open" : ""}`, translate: "no", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "adm-side", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-brand", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-mark", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 40 40", width: "30", height: "30", fill: "none", stroke: "#D9B26F", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "18" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "11", strokeDasharray: "1.5 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "3", fill: "#D9B26F" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Pt. Rajneesh Sharma" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "Admin" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "adm-nav", "aria-label": "Admin", children: NAV.map(([to, label2, d]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(NavLink, { to: `/admin${to ? `/${to}` : ""}`, end: !to, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { d }),
        label2
      ] }, to)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "adm-live", href: "/", target: "_blank", rel: "noreferrer", children: "↗ View live site" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adm-main", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "adm-top", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-burger", "aria-label": "Menu", "aria-expanded": menu, onClick: () => setMenu((m) => !m), children: "☰" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "adm-who", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "adm-avatar", children: me.email[0].toUpperCase() }),
          me.email
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-btn ghost sm", onClick: logout, children: "Sign out" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "adm-content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { index: true, element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "bookings", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookings, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "bookings/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingDetail, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "orders", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Orders, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "enquiries", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Enquiries, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "yantras", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Yantras, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "yantras/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(YantraEdit, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "blog", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Posts, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "blog/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(PostEdit, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "countries", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Countries, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "countries/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CountryEdit, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "visitors", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Visitors, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "password", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Password, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/admin", replace: true }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "adm-scrim", "aria-label": "Close menu", onClick: () => setMenu(false) })
  ] });
}
export {
  AdminApp as default
};
