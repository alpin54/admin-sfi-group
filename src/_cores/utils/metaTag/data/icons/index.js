// -- configs
import DefaultSEO from '@configs/SEO';

// transformToIconMap
const transformToIconMap = (icons) => {
  const iconMap = { default: { src: icons.default } };

  Object.keys(icons).forEach((size) => {
    if (size !== 'default') {
      iconMap[Number(size)] = { src: icons[size] };
    }
  });

  return iconMap;
};

const metaTagIcons = () => {
  const { icons } = DefaultSEO;
  const metadataBase = new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');

  const generateIcons = (iconMap, type) =>
    Object.entries(iconMap)
      .filter(([size]) => size !== 'default' && !isNaN(Number(size)))
      .map(([size, icon]) => ({
        url: new URL(icon.src, metadataBase).toString(),
        sizes: `${size}x${size}`,
        ...(type ? { type } : {})
      }));

  return {
    shortcut: new URL(icons.android.default, metadataBase).toString(),
    icon: generateIcons(transformToIconMap(icons.android), 'image/png'),
    apple: generateIcons(transformToIconMap(icons.apple)),
    other: [
      {
        rel: 'apple-touch-startup-image',
        url: new URL(icons.apple.default, metadataBase).toString()
      }
    ]
  };
};

export default metaTagIcons;
