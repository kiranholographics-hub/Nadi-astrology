export const PlayIcon = ({ size = 18, color = '#D9B26F' }) => (
  <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden="true"><path d="M8 4 L22 13 L8 22Z" fill={color} /></svg>
);

export const PlusIcon = () => (
  <svg className="plus" width="18" height="18" viewBox="0 0 18 18" stroke="#D9B26F" strokeWidth="1.5" aria-hidden="true"><path d="M9 2 V16 M2 9 H16" /></svg>
);

export const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M11 3 L5 9 L11 15" /></svg>
);
export const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 3 L13 9 L7 15" /></svg>
);

export const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 20 L5.5 15.5 A8 8 0 1 1 8.5 18.5 Z" /></svg>
);

export const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 4 H6 L8.5 15 H18 L20 7 H7" /><circle cx="9.5" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></svg>
);

export const LogoMark = ({ size = 42 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16" fill="none" stroke="#D9B26F" strokeWidth="1" /><circle cx="18" cy="18" r="9" fill="none" stroke="#D9B26F" strokeWidth="1" /><circle cx="18" cy="18" r="2.5" fill="#D9B26F" /></svg>
);

export const CameraIcon = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" stroke="#D9B26F" strokeWidth="1.3" aria-hidden="true"><rect x="6" y="12" width="44" height="34" rx="3" /><circle cx="28" cy="29" r="9" /><path d="M20 12 L23 7 L33 7 L36 12" /></svg>
);

export const BurgerIcon = ({ open }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    {open ? <path d="M5 5 L17 17 M17 5 L5 17" /> : <path d="M3 6 H19 M3 11 H19 M3 16 H19" />}
  </svg>
);

export const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#D9B26F" strokeWidth="1.3" aria-hidden="true"><path d="M16 22 V6 M10 12 L16 6 L22 12 M6 26 H26" /></svg>
);

export const ThumbIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#D9B26F" strokeWidth="1.2" aria-hidden="true"><ellipse cx="18" cy="19" rx="5" ry="7" /><ellipse cx="18" cy="19" rx="9" ry="12" /><ellipse cx="18" cy="19" rx="13" ry="16" /></svg>
);
