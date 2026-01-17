const province = {
  data: {
    status: true,
    method: 'provinsis',
    text: 'Data Loaded',
    datas: [
      {
        id: 1,
        provinsi_name: 'Bali'
      },
      {
        id: 2,
        provinsi_name: 'Bangka Belitung'
      },
      {
        id: 3,
        provinsi_name: 'Banten'
      },
      {
        id: 4,
        provinsi_name: 'Bengkulu'
      },
      {
        id: 5,
        provinsi_name: 'DI Yogyakarta'
      },
      {
        id: 6,
        provinsi_name: 'DKI Jakarta'
      },
      {
        id: 7,
        provinsi_name: 'Gorontalo'
      },
      {
        id: 8,
        provinsi_name: 'Jambi'
      },
      {
        id: 9,
        provinsi_name: 'Jawa Barat'
      },
      {
        id: 10,
        provinsi_name: 'Jawa Tengah'
      },
      {
        id: 11,
        provinsi_name: 'Jawa Timur'
      },
      {
        id: 12,
        provinsi_name: 'Kalimantan Barat'
      },
      {
        id: 13,
        provinsi_name: 'Kalimantan Selatan'
      },
      {
        id: 14,
        provinsi_name: 'Kalimantan Tengah'
      },
      {
        id: 15,
        provinsi_name: 'Kalimantan Timur'
      },
      {
        id: 16,
        provinsi_name: 'Kalimantan Utara'
      },
      {
        id: 17,
        provinsi_name: 'Kepulauan Riau'
      },
      {
        id: 18,
        provinsi_name: 'Lampung'
      },
      {
        id: 19,
        provinsi_name: 'Maluku'
      },
      {
        id: 20,
        provinsi_name: 'Maluku Utara'
      },
      {
        id: 21,
        provinsi_name: 'Nanggroe Aceh Darussalam (NAD)'
      },
      {
        id: 22,
        provinsi_name: 'Nusa Tenggara Barat (NTB)'
      },
      {
        id: 23,
        provinsi_name: 'Nusa Tenggara Timur (NTT)'
      },
      {
        id: 24,
        provinsi_name: 'Papua'
      },
      {
        id: 25,
        provinsi_name: 'Papua Barat'
      },
      {
        id: 26,
        provinsi_name: 'Riau'
      },
      {
        id: 27,
        provinsi_name: 'Sulawesi Barat'
      },
      {
        id: 28,
        provinsi_name: 'Sulawesi Selatan'
      },
      {
        id: 29,
        provinsi_name: 'Sulawesi Tengah'
      },
      {
        id: 30,
        provinsi_name: 'Sulawesi Tenggara'
      },
      {
        id: 31,
        provinsi_name: 'Sulawesi Utara'
      },
      {
        id: 32,
        provinsi_name: 'Sumatera Barat'
      },
      {
        id: 33,
        provinsi_name: 'Sumatera Selatan'
      },
      {
        id: 34,
        provinsi_name: 'Sumatera Utara'
      },
      {
        id: 35,
        provinsi_name: 'Papua Selatan'
      },
      {
        id: 36,
        provinsi_name: 'Papua Pegunungan'
      },
      {
        id: 37,
        provinsi_name: 'Papua Tengah'
      }
    ]
  }
};

const city = {
  success: true,
  data: {
    status: true,
    method: 'kabupatens',
    text: 'Data Loaded',
    datas: [
      {
        id: 151,
        provinsi_id: 6,
        kabupaten_name: 'Jakarta Barat',
        type: 'Kota',
        postal_code: '11220'
      },
      {
        id: 152,
        provinsi_id: 6,
        kabupaten_name: 'Jakarta Pusat',
        type: 'Kota',
        postal_code: '10540'
      },
      {
        id: 153,
        provinsi_id: 6,
        kabupaten_name: 'Jakarta Selatan',
        type: 'Kota',
        postal_code: '12230'
      },
      {
        id: 154,
        provinsi_id: 6,
        kabupaten_name: 'Jakarta Timur',
        type: 'Kota',
        postal_code: '13330'
      },
      {
        id: 155,
        provinsi_id: 6,
        kabupaten_name: 'Jakarta Utara',
        type: 'Kota',
        postal_code: '14140'
      },
      {
        id: 189,
        provinsi_id: 6,
        kabupaten_name: 'Kepulauan Seribu',
        type: 'Kabupaten',
        postal_code: '14550'
      }
    ]
  }
};

const district = {
  success: true,
  data: {
    status: true,
    method: 'kecamatans',
    text: 'Data Loaded',
    datas: [
      {
        id: 2087,
        kecamatan_name: 'Cengkareng',
        kabupaten_id: 151,
        postal_code: '11730'
      },
      {
        id: 2088,
        kecamatan_name: 'Grogol Petamburan',
        kabupaten_id: 151,
        postal_code: '11450'
      },
      {
        id: 2089,
        kecamatan_name: 'Kalideres',
        kabupaten_id: 151,
        postal_code: '11840'
      },
      {
        id: 2090,
        kecamatan_name: 'Kebon Jeruk',
        kabupaten_id: 151,
        postal_code: '11510'
      },
      {
        id: 2091,
        kecamatan_name: 'Kembangan',
        kabupaten_id: 151,
        postal_code: '11640'
      },
      {
        id: 2092,
        kecamatan_name: 'Palmerah',
        kabupaten_id: 151,
        postal_code: '11430'
      },
      {
        id: 2093,
        kecamatan_name: 'Taman Sari',
        kabupaten_id: 151,
        postal_code: '11120'
      },
      {
        id: 2094,
        kecamatan_name: 'Tambora',
        kabupaten_id: 151,
        postal_code: '11330'
      }
    ]
  }
};

const subdistrict = {
  success: true,
  data: {
    status: true,
    text: 'Courier Loaded',
    method: 'get_kelurahan_from_kecamatan_id',
    results: [
      {
        id: 17480,
        kelurahan_name: 'Kalideres',
        kecamatan_id: 2089
      },
      {
        id: 17481,
        kelurahan_name: 'Kamal',
        kecamatan_id: 2089
      },
      {
        id: 17482,
        kelurahan_name: 'Pegadungan',
        kecamatan_id: 2089
      },
      {
        id: 17483,
        kelurahan_name: 'Semanan',
        kecamatan_id: 2089
      },
      {
        id: 17484,
        kelurahan_name: 'Tegal Alur',
        kecamatan_id: 2089
      }
    ]
  }
};

const data = { province, city, district, subdistrict };

export default data;
