export default function decorate(block) {
  const rows = [...block.children];
  const subtitle = rows[0]?.textContent.trim() || '';
  const title = rows[1]?.textContent.trim() || '';
  const description = rows[2]?.textContent.trim() || '';

  // Build inner wrapper
  const inner = document.createElement('div');
  inner.className = 'team-hero-inner';

  // Subtitle
  const h2 = document.createElement('h2');
  h2.textContent = subtitle;
  inner.append(h2);

  // Title
  const h1 = document.createElement('h1');
  h1.textContent = title;
  inner.append(h1);

  // Description
  const p = document.createElement('p');
  p.textContent = description;
  inner.append(p);

  // Logo marquee
  const codes = [
    'buf', 'mia', 'ne', 'nyj', 'bal', 'pit', 'cin', 'cle',
    'hou', 'ind', 'jax', 'ten', 'kc', 'lac', 'den', 'lv',
    'phi', 'dal', 'wsh', 'nyg', 'det', 'min', 'gb', 'chi',
    'tb', 'atl', 'no', 'car', 'sf', 'lar', 'sea', 'ari',
  ];

  const strip = document.createElement('div');
  strip.className = 'hero-logos-strip';
  const track = document.createElement('div');
  track.className = 'hero-logos-track';

  // Duplicate set for seamless infinite scroll
  [...codes, ...codes].forEach((code) => {
    const img = document.createElement('img');
    img.src = `https://a.espncdn.com/i/teamlogos/nfl/500/${code}.png`;
    img.alt = '';
    img.width = 48;
    img.height = 48;
    img.loading = 'lazy';
    track.append(img);
  });

  strip.append(track);
  inner.append(strip);

  // Stat bar
  const stats = [
    { value: '32', label: 'Teams' },
    { value: '2', label: 'Conferences' },
    { value: '8', label: 'Divisions' },
    { value: '14', label: 'Playoff Spots' },
  ];

  const statsBar = document.createElement('div');
  statsBar.className = 'hero-stats-bar';
  stats.forEach(({ value, label }) => {
    const stat = document.createElement('div');
    stat.className = 'hero-stat';
    const valSpan = document.createElement('span');
    valSpan.className = 'hero-stat-value';
    valSpan.textContent = value;
    const lblSpan = document.createElement('span');
    lblSpan.className = 'hero-stat-label';
    lblSpan.textContent = label;
    stat.append(valSpan, lblSpan);
    statsBar.append(stat);
  });
  inner.append(statsBar);

  // Shield watermark
  const shield = document.createElement('div');
  shield.className = 'hero-shield';
  const shieldImg = document.createElement('img');
  shieldImg.src = '/images/NFL_Shield_rgb.png';
  shieldImg.alt = '';
  shieldImg.setAttribute('aria-hidden', 'true');
  shield.append(shieldImg);

  // Replace block children
  block.textContent = '';
  block.append(inner, shield);
}
