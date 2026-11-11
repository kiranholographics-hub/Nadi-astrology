import { createContext, useContext } from 'react';

// Data the server already loaded for this page (blog post, country, yantra, lists), so the
// server-rendered HTML has the real content and the browser does not start from "Loading…".
// In the browser it comes from window.__INITIAL_DATA__, which the server writes into the page.
const InitialData = createContext({});

const fromWindow = () => {
  try {
    return (typeof window !== 'undefined' && window.__INITIAL_DATA__) || {};
  } catch {
    return {};
  }
};

export function InitialDataProvider({ data, children }) {
  return <InitialData.Provider value={data || fromWindow()}>{children}</InitialData.Provider>;
}

// Value for this key, or undefined. Each key is used once: after the first page the
// browser loads data itself, so a later visit to another page never gets stale data.
export function useInitialData(key) {
  const data = useContext(InitialData);
  return data[key];
}
