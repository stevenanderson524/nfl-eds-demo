export default function decorate(block) {
  const rows = [...block.children];
  // Row 0: background image (picture element)
  // Row 1: label text (e.g. "NFL Visual Identity")
  // Row 2: title - h1 with optional <em> for subtitle
  // Row 3: description paragraph

  const picture = rows[0]?.querySelector('picture');
  const label = rows[1]?.textContent.trim() || '';
  const titleEl = rows[2]?.querySelector('h1') || rows[2]?.querySelector('h2');
  const titleHTML = titleEl ? titleEl.innerHTML : (rows[2]?.innerHTML || '');
  const desc = rows[3]?.textContent.trim() || '';

  const hero = document.createElement('div');
  hero.className = 'photo-hero-inner';

  if (picture) {
    const bg = document.createElement('div');
    bg.className = 'photo-hero-bg';
    bg.append(picture);
    hero.append(bg);
  }

  const content = document.createElement('div');
  content.className = 'photo-hero-content';

  if (label) {
    const labelEl = document.createElement('span');
    labelEl.className = 'photo-hero-label';
    labelEl.textContent = label;
    content.append(labelEl);
  }

  const h1 = document.createElement('h1');
  h1.innerHTML = titleHTML;
  content.append(h1);

  if (desc) {
    const p = document.createElement('p');
    p.textContent = desc;
    content.append(p);
  }

  hero.append(content);
  block.replaceChildren(hero);
}
