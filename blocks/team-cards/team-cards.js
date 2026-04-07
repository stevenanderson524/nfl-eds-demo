const TEAM_COLORS = {
  buf: ['#00338d', '#0048c8'],
  mia: ['#008e97', '#00b4c5'],
  ne: ['#125740', '#1a7a5a'],
  nyj: ['#002244', '#003366'],
  bal: ['#241773', '#3a2aa0'],
  pit: ['#101820', '#2a2a2a'],
  cin: ['#fb4f14', '#ff6a33'],
  cle: ['#311d00', '#4a2e00'],
  hou: ['#03202f', '#053a54'],
  ind: ['#002c5f', '#004080'],
  jax: ['#006778', '#008a9e'],
  ten: ['#0c2340', '#14365e'],
  kc: ['#e31837', '#ff2d4d'],
  lac: ['#0080c6', '#00a0f0'],
  den: ['#002244', '#fb4f14'],
  lv: ['#000000', '#333333'],
  phi: ['#004c54', '#007a87'],
  dal: ['#003594', '#0050cc'],
  wsh: ['#5a1414', '#8a2020'],
  nyg: ['#0b2265', '#143399'],
  det: ['#0076b6', '#009ee0'],
  min: ['#4f2683', '#6b35b0'],
  gb: ['#203731', '#2d4f45'],
  chi: ['#0b162a', '#c83803'],
  tb: ['#d50a0a', '#ff1a1a'],
  atl: ['#000000', '#a71930'],
  no: ['#101820', '#d3bc8d'],
  car: ['#0085ca', '#00a8ff'],
  sf: ['#aa0000', '#dd0000'],
  lar: ['#003594', '#ffd100'],
  sea: ['#002244', '#69be28'],
  ari: ['#97233f', '#c42d52'],
};

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function decorate(block) {
  const rows = [...block.children];
  const cards = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const code = cells[0]?.textContent.trim().toLowerCase() || '';
    const name = cells[1]?.textContent.trim() || '';
    const location = cells[2]?.textContent.trim() || '';
    const record = cells[3]?.textContent.trim() || '0-0';
    const description = cells[4]?.textContent.trim() || '';
    const status = cells[5]?.textContent.trim() || '';

    const [wins, losses] = record.split('-').map(Number);
    const total = wins + losses;
    const winPct = total > 0 ? (wins / total) * 100 : 0;

    let badgeClass = '';
    if (status === 'Playoff Bound') badgeClass = 'in';
    else if (status === 'In the Hunt') badgeClass = 'hunt';
    else if (status === 'Eliminated') badgeClass = 'out';

    const [color1, color2] = TEAM_COLORS[code] || ['#013369', '#024a9c'];
    const slug = slugify(name);

    const card = document.createElement('a');
    card.className = 'team-card';
    card.href = `/teams/${slug}`;

    card.innerHTML = `
      <div class="team-card-banner" style="background: linear-gradient(135deg, ${color1} 0%, ${color2} 100%);">
        <img src="https://a.espncdn.com/i/teamlogos/nfl/500/${code}.png" alt="" loading="lazy" width="80" height="80">
      </div>
      <div class="team-card-logo">
        <img src="https://a.espncdn.com/i/teamlogos/nfl/500/${code}.png" alt="${name} logo" loading="lazy" width="48" height="48">
      </div>
      <div class="team-card-body">
        <div class="team-card-info">
          <h4>${name}</h4>
          <span>${location}</span>
        </div>
        <div class="team-card-record">
          <span class="team-record-big">${record}</span>
          <div class="team-record-bar">
            <div class="team-record-fill" style="width: ${winPct}%; background: linear-gradient(90deg, ${color1}, ${color2});"></div>
          </div>
        </div>
        <p class="team-card-desc">${description}</p>
        <div class="team-card-footer">
          <span class="playoff-badge ${badgeClass}">${status}</span>
          <span class="team-card-arrow">\u2192</span>
        </div>
      </div>`;

    cards.push(card);
  });

  const grid = document.createElement('div');
  grid.className = 'team-grid';
  cards.forEach((card) => grid.append(card));

  block.textContent = '';
  block.append(grid);
}
