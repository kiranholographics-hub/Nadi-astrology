// Display labels for yantra categories / names. The DB keeps the short ids (e.g. 'Dhan').
export const CATEGORY_LABEL = {
  Sabhi: { en: 'All', hi: 'सभी' },
  Dhan: { en: 'Wealth', hi: 'धन' },
  Vyapar: { en: 'Business', hi: 'व्यापार' },
  'Grah shanti': { en: 'Planetary Peace', hi: 'ग्रह शांति' },
  Raksha: { en: 'Protection', hi: 'रक्षा' },
  Vastu: { en: 'Vastu', hi: 'वास्तु' },
  Shiksha: { en: 'Education', hi: 'शिक्षा' },
  Vivah: { en: 'Marriage', hi: 'विवाह' },
};

export const NAME_HI = {
  'shree-yantra': 'श्री यंत्र',
  'meru-shree-yantra': 'मेरु श्री यंत्र',
  'kuber-yantra': 'कुबेर यंत्र',
  'mahalaxmi-yantra': 'महालक्ष्मी यंत्र',
  'vyapar-vriddhi-yantra': 'व्यापार वृद्धि यंत्र',
  'navgrah-yantra': 'नवग्रह यंत्र',
  'shani-yantra': 'शनि यंत्र',
  'mahamrityunjay-yantra': 'महामृत्युंजय यंत्र',
  'baglamukhi-yantra': 'बगलामुखी यंत्र',
  'kaal-sarp-yantra': 'काल सर्प यंत्र',
  'vastu-dosh-nivaran-yantra': 'वास्तु दोष निवारण यंत्र',
  'saraswati-yantra': 'सरस्वती यंत्र',
  'mangal-yantra': 'मंगल यंत्र',
  'hanuman-yantra': 'हनुमान यंत्र',
  'sarva-karya-siddhi-yantra': 'सर्व कार्य सिद्धि यंत्र',
};

export const yName = (y) => ({ en: y?.name || '', hi: NAME_HI[y?.slug] || y?.name || '' });
export const catLabel = (c) => CATEGORY_LABEL[c] || { en: c, hi: c };
export const SIZE_HI = (s) => (s || '').replace('inch', 'इंच');
