import LogoImg from '@assets/image/logo/logo-primary.png';

const data = {
  id: 1,
  title: 'Forgot Password',
  logo: { url: LogoImg.src },
  url: 'https://dummy.com/reset',
  greetings: ['Hello', '[Participant Name]', '👋'],
  paragraph1:
    "You're receiving this email because you requested a password reset for your account.\nIf you didn't request this, you can ignore this message.\nReset your password by clicking the link below",
  cta_text: 'RESET PASSWORD',
  cta_url: 'https://dummy.com/reset',
  paragraph2: 'This link will expire in 60 minutes. If it expires, request a new password reset.',
  signature_left: 'Best regards,',
  signature_right: 'Your Company',
  created_by: 1,
  updated_by: 1,
  created_at: '2025-06-13T09:00:00Z',
  updated_at: '2025-06-13T09:00:00Z'
};

export default data;
