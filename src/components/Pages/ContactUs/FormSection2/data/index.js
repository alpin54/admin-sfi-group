const listData = [
  {
    key: 'phone',
    id: 'phone',
    title: { en: 'Phone Number', id: 'Phone Number' },
    content: { en: '+62 2122 5711 25', id: '+62 2122 5711 25' },
    status: 1
  },
  {
    key: 'whatsapp',
    id: 'whatsapp',
    title: { en: 'WhatsApp', id: 'WhatsApp' },
    content: { en: '+62 8581 1602 018', id: '+62 8581 1602 018' },
    status: 1
  },
  {
    key: 'email',
    id: 'email',
    title: { en: 'Email', id: 'Email' },
    content: { en: 'info@sfigroup.co.id', id: 'info@sfigroup.co.id' },
    status: 1
  }
];

const columns = [
  { key: 'title', dataIndex: 'title', title: { en: 'Title', id: 'Judul' } },
  { key: 'content', dataIndex: 'content', title: { en: 'Content', id: 'Konten' } }
];

const mainData = {
  id: 'contact-section',
  status: 1,
  title: {
    en: 'Get In Touch with us',
    id: 'Hubungi Kami'
  },
  // include the dummy list and the columns config
  list: listData,
  columns, // <- view will use this to build table columns
  opening: {
    en: 'Monday - Friday 09:00 - 17:30',
    id: 'Senin - Jumat 09:00 - 17:30'
  },
  cta: {
    en: 'If you have any queries, our team are available to answer any questions that you may have. Alternatively, you can take a look at our FAQs.',
    id: 'Jika Anda memiliki pertanyaan, tim kami siap membantu menjawab. Atau, Anda dapat melihat halaman FAQ kami.'
  }
};

export default mainData;
export { mainData, listData, columns };
