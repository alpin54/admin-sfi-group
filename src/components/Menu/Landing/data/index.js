const data = [
  {
    id: 1,
    title: { en: 'Home', id: 'Beranda' },
    status: 1,
    children: [
      {
        id: 2,
        title: { en: 'Gadget Accessories', id: 'Aksesoris Gadget' },
        status: 1
      },
      {
        id: 3,
        title: { en: 'IT Accessories', id: 'Aksesoris IT' },
        status: 1
      },
      {
        id: 4,
        title: { en: 'Audio', id: 'Audio' },
        status: 1
      },
      {
        id: 5,
        title: { en: 'Bags', id: 'Tas' },
        status: 1
      },
      {
        id: 6,
        title: { en: 'Promo', id: 'Promo' },
        status: 0 // Promo disabled (action berubah)
      },
      {
        id: 7,
        title: { en: 'Others', id: 'Lainnya' },
        status: 1
      }
    ]
  }
];

export default data;
