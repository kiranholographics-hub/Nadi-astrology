import { forwardRef } from 'react';
import { Link as RRLink, NavLink as RRNavLink, useNavigate as useRRNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { withLang } from './lang.js';

// Drop-in replacements for react-router's Link / NavLink / useNavigate that keep the
// visitor in their language: on Hindi pages, "/kundli-milan" goes to "/hi/kundli-milan".
export const Link = forwardRef(function Link({ to, ...rest }, ref) {
  const { lang } = useApp();
  return <RRLink ref={ref} to={withLang(to, lang)} {...rest} />;
});

export const NavLink = forwardRef(function NavLink({ to, end, ...rest }, ref) {
  const { lang } = useApp();
  const target = withLang(to, lang);
  // The home link must not match every page: "/" and "/hi" are only active on their own.
  return <RRNavLink ref={ref} to={target} end={end ?? (target === '/' || target === '/hi')} {...rest} />;
});

export function useNavigate() {
  const navigate = useRRNavigate();
  const { lang } = useApp();
  return (to, opts) => (typeof to === 'number' ? navigate(to) : navigate(withLang(to, lang), opts));
}
