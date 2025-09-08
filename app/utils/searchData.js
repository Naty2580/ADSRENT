 
export const regions = [
  { value: "addis-ababa", label: "Addis Ababa" },
  { value: "oromia", label: "Oromia" },
  { value: "amhara", label: "Amhara" },
  { value: "tigray", label: "Tigray " },
  { value: "snnp", label: "SNNP " },
];

export const cities = {
  'addis-ababa': [
    { value: "addis ababa", label: "Addis Ababa" },
  ],
  'oromia' : [
    { value: "oromia", label: "Oromia" },
    { value: "Adama", label: "Adama" },
    { value: "Jimma", label: "Jimma" }, 
    { value: "worota", label: "Worota" },
  ],
  'amhara' : [
   
    { value: "Bahir Dar", label: "Bahir Dar" },
    { value: "Hawassa", label: "Hawassa" },
    { value: "Gonder", label: "Gonder" },
    { value: "Dilla", label: "Dilla" },
    { value: "Bishoftu", label: "Bishoftu" },
  ],
  'tigray' : [
    
    { value: "Mekele", label: "Mekele" },
    { value: "Mekelle", label: "Mekelle" },
    { value: "Moyale", label: "Moyale" },
  ],
  'snnp' : [
    { value: "Sodo", label: "Sodo" },
    { value: "snnp", label: "SNNP" },
    { value: "Robe", label: "Robe" },
  ],
}

export const subcities = {
  "addis-ababa": [
    { value: "bole", label: "Bole" }, 
    { value: "yeka", label: "Yeka" },
    { value: "kirkos", label: "Kirkos" },
    { value: "arada", label: "Arada" },
    { value: "lideta", label: "Lideta" },
    { value: "kolfe-keranio", label: "Kolfe Keranio" },
    { value: "nifas-silk", label: "Nifas Silk" },
    { value: "gulele", label: "Gulele" },
    { value: "akaky-kaliti", label: "Akaky Kaliti" },
    { value: "addis-ketema", label: "Addis Ketema" },
  ],
  "adama" : [
    { value: "04", label: "04" },
    { value: "bole", label: "bole" },
    {value: "wenci", label: "wenci" },
  ],
  
    "hawassa": [
      { value: "hawassa 1", label: "Hawassa 1" },
      { value: "hawassa 2", label: "Hawassa 2" },
      { value: "hawassa 3", label: "Hawassa 3" },
    
    ]
  

 
};
export const areas = {
  bole: [
    { value: "megenagna", label: "Megenagna" },
    { value: "gerji", label: "Gerji" },
    { value: "ayat", label: "Ayat" },
    { value: "sarbet", label: "Sarbet" },
    { value: "edna-mall", label: "Edna Mall Area" },
  ],
  yeka: [
    { value: "mebrat-hail", label: "Mebrat Hail" },
    { value: "kality", label: "Kality" },
    { value: "beza", label: "Beza" },
    { value: "gerji-mebrat-hail", label: "Gerji Mebrat Hail" },
  ],
  kirkos: [
    { value: "kazanchis", label: "Kazanchis" },
    { value: "arat-kilo", label: "Arat Kilo" },
    { value: "sidist-kilo", label: "Sidist Kilo" },
  ],
};

export const propertyTypes = [
  { value: "all", label: "All Properties" },
  { value: "apartment", label: "Apartment / አፓርታማ" },
  { value: "villa", label: "Villa / ቪላ" },
  { value: "house", label: "House / ቤት" },
  { value: "office", label: "Office / መሥሪያ ቤት" },
  { value: "land", label: "Land / መሬት" },
  { value: "Building", label: "Building / ህንፃ" },
  { value: "shop", label: "Shop / መደብር" },
  { value: "studio", label: "Studio / ስቱዲዮ" },
  { value: "condominum", label: "Condo / ኮንዶሚኒየም" },
  { value: "warehouse", label: "Warehouse / መጋዘን" },
];

export const priceRanges = {
  rent: {
    min: [
      { value: "no-min", label: "No Min" },
      { value: "10000", label: "ETB 10,000" },
      { value: "20000", label: "ETB 20,000" },
      { value: "30000", label: "ETB 30,000" },
      { value: "40000", label: "ETB 40,000" },
      { value: "50000", label: "ETB 50,000" },
      { value: "60000", label: "ETB 60,000" },
      { value: "70000", label: "ETB 70,000" },
      { value: "80000", label: "ETB 80,000" },
      { value: "90000", label: "ETB 90,000" },
    ],
    max: [
      { value: "no-max", label: "No Max" },
      { value: "10000", label: "ETB 10,000" },
      { value: "20000", label: "ETB 20,000" },
      { value: "25000", label: "ETB 25,000" },
      { value: "30000", label: "ETB 30,000" },
      { value: "35000", label: "ETB 35,000" },
      { value: "40000", label: "ETB 40,000" },
      { value: "45000", label: "ETB 45,000" },
      { value: "50000", label: "ETB 50,000" },
      { value: "60000", label: "ETB 60,000" },
      { value: "70000", label: "ETB 70,000" },
      { value: "80000", label: "ETB 80,000" },
      { value: "90000", label: "ETB 90,000" },
      { value: "100000", label: "ETB 100,000+" },
    ],
  },
  buy: {
    min: [
      { value: "no-min", label: "No Min" },
      { value: "500000", label: "ETB 500k" },
      { value: "1000000", label: "ETB 1M" },
      { value: "2000000", label: "ETB 2M" },
      { value: "3000000", label: "ETB 3M" },
      { value: "4000000", label: "ETB 4M" },
      { value: "5000000", label: "ETB 5M" },
      { value: "6000000", label: "ETB 6M" },
      { value: "7000000", label: "ETB 7M" },
      { value: "8000000", label: "ETB 8M" },
      { value: "9000000", label: "ETB 9M" },
      { value: "10000000", label: "ETB 10M" },
    ],
    max: [
      { value: "no-max", label: "No Max" },
      { value: "2000000", label: "ETB 2M" },
      { value: "3000000", label: "ETB 3M" },
      { value: "5000000", label: "ETB 5M" },
      { value: "10000000", label: "ETB 10M" },
      { value: "15000000", label: "ETB 15M" },
      { value: "20000000", label: "ETB 20M" },
      { value: "25000000", label: "ETB 25M" },
      { value: "30000000", label: "ETB 30M" },
      { value: "35000000", label: "ETB 35M" },
      { value: "40000000", label: "ETB 40M" },
      { value: "45000000", label: "ETB 45M" },
      { value: "50000000", label: "ETB 50M+" },
    ],
  },
};

export const bedroomOptions = [
  { value: "any", label: "Any" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4 Bedrooms" },
  { value: "5", label: "5 Bedrooms" },
  { value: "6+", label: "6+ Bedrooms" },
];
export const bathroomOptions = [
  { value: "any", label: "Any" },
  { value: "1", label: "1 Bathroom" },
  { value: "2", label: "2 Bathrooms" },
  { value: "3", label: "3 Bathrooms" },
  { value: "4", label: "4 Bathrooms" },
  { value: "5+", label: "5+ Bathrooms" },
];


export const priceOptions = {
  rent: {
    min: [
      { value: "0", label: "Min Price" },
      { value: "10000", label: "10,000 ETB" },
      { value: "25000", label: "25,000 ETB" },
      { value: "50000", label: "50,000 ETB" },
    ],
    max: [
      // <-- ADD MAX PRICES
      { value: "0", label: "Max Price" },
      { value: "25000", label: "25,000 ETB" },
      { value: "50000", label: "50,000 ETB" },
      { value: "100000", label: "100,000 ETB" },
    ],
  },
  sale: {
    min: [
      { value: "0", label: "Min Price" },
      { value: "1000000", label: "1M ETB" },
      { value: "5000000", label: "5M ETB" },
      { value: "10000000", label: "10M ETB" },
    ],
    max: [
      // <-- ADD MAX PRICES
      { value: "0", label: "Max Price" },
      { value: "5000000", label: "5M ETB" },
      { value: "10000000", label: "10M ETB" },
      { value: "25000000", label: "25M ETB" },
    ],
  },
};

// ... keep regions, subcities, propertyTypes, etc.

// ... (keep all other data)

// New, flat array for amenities
export const amenities = [
  { value: 'furnished', label: 'Furnished' },
  { value: 'swimming_pool', label: 'Swimming Pool' },
  { value: 'air_conditioning', label: 'Air Conditioning' },
  { value: 'parking', label: 'Parking' },
  { value: 'gym', label: 'Gym' },
  { value: 'internet_wifi', label: 'Internet/WiFi' },
  { value: 'garden', label: 'Garden' },
  { value: 'elevator', label: 'Elevator' },
  { value: 'generator', label: 'Generator' },
];

export const heroImages = [
  { url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&h=1080&fit=crop", alt: "Modern white villa with a pool" },
  { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&h=1080&fit=crop", alt: "Bright and airy modern apartment living room" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop", alt: "Elegant family house with a porch" },
  { url: "https://images.unsplash.com/photo-1592595896551-87e6b4ae8b62?w=1920&h=1080&fit=crop", alt: "Beautiful home with a lush front yard" },
];