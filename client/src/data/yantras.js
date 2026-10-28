// The 15 yantras from the website layout PDF.
// Price, size, dhatu etc. are left null until Pandit ji confirms them —
// the frontend shows "[₹ PRICE]"-style placeholders for null values.
// `art` picks the line-art variant used until real photos are uploaded.

const base = {
  sizes: ['2 x 2 inch', '3 x 3 inch', '6 x 6 inch'],
  priceINR: null,
  priceUSD: null,
  sankalpPriceINR: null,
  sankalpPriceUSD: null,
  material: null, // e.g. "Tamba, gold plated" / "Ashtadhatu" / "Bhojpatra"
  weightGrams: null,
  deity: null,
  pranPratishtha: null,
  description: null,
  purpose: null,
  care: null,
  sthapana: { day: null, direction: null, shuddhi: null, mantra: null, daily: null },
  boxContents: 'Yantra, installation guide (PDF), mantra card, certificate',
  images: [],
  videoUrl: null,
  stock: 'available',
};

export const yantras = [
  { name: 'Shree Yantra', slug: 'shree-yantra', category: 'Dhan', art: 'A', bestseller: true },
  { name: 'Meru Shree Yantra', slug: 'meru-shree-yantra', category: 'Dhan', art: 'A' },
  { name: 'Kuber Yantra', slug: 'kuber-yantra', category: 'Dhan', art: 'C', bestseller: true },
  { name: 'Mahalaxmi Yantra', slug: 'mahalaxmi-yantra', category: 'Dhan', art: 'A' },
  { name: 'Vyapar Vriddhi Yantra', slug: 'vyapar-vriddhi-yantra', category: 'Vyapar', art: 'C' },
  { name: 'Navgrah Yantra', slug: 'navgrah-yantra', category: 'Grah shanti', art: 'C', bestseller: true },
  { name: 'Shani Yantra', slug: 'shani-yantra', category: 'Grah shanti', art: 'B' },
  { name: 'Mahamrityunjay Yantra', slug: 'mahamrityunjay-yantra', category: 'Raksha', art: 'B' },
  { name: 'Baglamukhi Yantra', slug: 'baglamukhi-yantra', category: 'Raksha', art: 'A' },
  { name: 'Kaal Sarp Yantra', slug: 'kaal-sarp-yantra', category: 'Grah shanti', art: 'B' },
  { name: 'Vastu Dosh Nivaran Yantra', slug: 'vastu-dosh-nivaran-yantra', category: 'Vastu', art: 'C', bestseller: true },
  { name: 'Saraswati Yantra', slug: 'saraswati-yantra', category: 'Shiksha', art: 'A' },
  { name: 'Mangal Yantra', slug: 'mangal-yantra', category: 'Vivah', art: 'C' },
  { name: 'Hanuman Yantra', slug: 'hanuman-yantra', category: 'Raksha', art: 'B' },
  { name: 'Sarva Karya Siddhi Yantra', slug: 'sarva-karya-siddhi-yantra', category: 'Vyapar', art: 'B' },
].map((y, i) => ({ ...base, bestseller: false, order: i + 1, ...y }));

export const categories = ['Dhan', 'Vyapar', 'Grah shanti', 'Raksha', 'Vastu', 'Shiksha', 'Vivah'];
