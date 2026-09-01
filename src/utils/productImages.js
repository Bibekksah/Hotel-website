const categoryPalette = {
  sweets: ['#2C1810', '#D4AF37', '#FFE7A8'],
  khuwa: ['#4A2F1A', '#A76A20', '#F4D28B'],
  snacks: ['#161616', '#7A4B12', '#F8C76E'],
  milk: ['#1E2A3A', '#4F7C8A', '#E6F4FF'],
  drinks: ['#0C3B2E', '#2E8B57', '#C8F3D8'],
  default: ['#2C1810', '#D4AF37', '#FFF8EF']
};

const categoryIcon = {
  sweets: '🍬',
  khuwa: '🥄',
  snacks: '🥨',
  milk: '🥛',
  drinks: '🥤',
  default: '✨'
};

function getInitials(name) {
  const words = name
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return 'RH';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export function getProductDisplayImage(product) {
  const palette = categoryPalette[product?.category] || categoryPalette.default;
  const icon = categoryIcon[product?.category] || categoryIcon.default;
  const initials = getInitials(product?.name || 'Roshani');
  const title = (product?.name || 'Roshani').replace(/'/g, "’");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette[0]}" />
          <stop offset="50%" stop-color="${palette[1]}" />
          <stop offset="100%" stop-color="${palette[2]}" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="40" fill="url(#bg)" />
      <circle cx="200" cy="160" r="110" fill="rgba(255,255,255,0.15)" />
      <circle cx="200" cy="160" r="88" fill="rgba(255,248,239,0.22)" />
      <text x="200" y="170" text-anchor="middle" font-size="84" font-family="Georgia, serif" fill="#FFF8EF">${initials}</text>
      <text x="200" y="248" text-anchor="middle" font-size="28" font-family="Arial, sans-serif" fill="#FFF8EF" letter-spacing="3">${icon}</text>
      <rect x="70" y="300" width="260" height="46" rx="23" fill="rgba(22,22,22,0.35)" />
      <text x="200" y="330" text-anchor="middle" font-size="20" font-family="Arial, sans-serif" fill="#FFF8EF">${title}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
