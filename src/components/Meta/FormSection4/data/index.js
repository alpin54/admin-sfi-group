// Contoh data dummy berisi multiline HTML/script supaya tampil seperti desain
const data = {
  id: 'section-4',
  section: 'tracking and integration',
  googleAnalytics: `<!-- Google Analytics (Dummy) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  // Dummy Measurement ID
  gtag('config', 'G-XXXXXXXXX');
</script>`,
  googleTagManager: `<!-- Google Tag Manager (Dummy) -->
<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>

<!-- Google Tag Manager (noscript) Dummy -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
};

export default data;
