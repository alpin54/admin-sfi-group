/**
 * Dummy data for Career Form (Career/Form/data.js)
 *
 * - careers: array of career objects shaped for the form (nested title/summary/description objects per language)
 * - workplaceTypes: array of job type options (id, name)
 * - employmentStatus: array of workplace options (id, name)
 *
 * You can tweak values here while testing the form view/widget.
 */

const data = {
  summaryApplication: { total: 20 },
  summaryCareer: { total: 1 },
  careers: [
    {
      id: 1,
      title: { en: 'Marketing Executive', id: 'Marketing Eksekutif' },
      summary: {
        en: 'Join our marketing team to create growth campaigns.',
        id: 'Bergabunglah dengan tim pemasaran untuk membuat kampanye pertumbuhan.'
      },
      description: {
        en: '<p>This is the full job description (EN).</p>',
        id: '<p>Ini adalah deskripsi pekerjaan lengkap (ID).</p>'
      },
      qualifications: {
        en: '<ul><li>Bachelor degree in Marketing</li><li>2+ years experience</li></ul>',
        id: '<ul><li>S1 di bidang Pemasaran</li><li>Pengalaman 2+ tahun</li></ul>'
      },
      benefits: {
        en: '<ul><li>Health insurance</li><li>Competitive salary</li></ul>',
        id: '<ul><li>Asuransi kesehatan</li><li>Gaji kompetitif</li></ul>'
      },
      workplace_type_id: 1,
      employment_status_id: 1,
      created_by: 1,
      updated_by: 1,
      created_at: '2025-08-15T06:06:51.338Z',
      updated_at: '2025-08-15T06:06:51.338Z'
    }
  ],
  workplaceTypes: [
    { id: 1, name: 'Full Time', status: 1 },
    { id: 2, name: 'Part Time', status: 1 },
    { id: 3, name: 'Contract', status: 1 }
  ],
  employmentStatus: [
    { id: 1, name: 'On Site', status: 1 },
    { id: 2, name: 'Remote', status: 1 },
    { id: 3, name: 'Hybrid', status: 1 }
  ]
};

export default data;
