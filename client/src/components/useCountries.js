import { useEffect, useState } from 'react';
import { getCountries } from '../api/index.js';

// Active country pages, for links in the footer and on the Nadi page.
export default function useCountries() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    let alive = true;
    getCountries().then((list) => alive && setItems(list));
    return () => { alive = false; };
  }, []);
  return items;
}
