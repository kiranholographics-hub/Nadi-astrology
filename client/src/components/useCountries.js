import { useEffect, useState } from 'react';
import { getCountries } from '../api/index.js';
import { useInitialData } from '../context/InitialData.jsx';

// Active country pages, for links in the footer and on the Nadi page.
export default function useCountries() {
  const initial = useInitialData('countries');
  const [items, setItems] = useState(initial || []);
  useEffect(() => {
    if (initial) return undefined;
    let alive = true;
    getCountries().then((list) => alive && setItems(list));
    return () => { alive = false; };
  }, []);
  return items;
}
