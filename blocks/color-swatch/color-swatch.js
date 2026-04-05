export default function decorate(block) {
  const rows = [...block.children];
  const ul = document.createElement('ul');
  ul.className = 'color-swatch-list';

  rows.forEach((row) => {
    const cols = [...row.children];
    const li = document.createElement('li');
    li.className = 'color-swatch-item';

    const colorValue = cols[0]?.textContent.trim() || '';
    const label = cols[1]?.textContent.trim() || '';

    const swatch = document.createElement('div');
    swatch.className = 'color-swatch-preview';
    swatch.style.backgroundColor = colorValue;

    const info = document.createElement('div');
    info.className = 'color-swatch-info';
    if (label) {
      const nameEl = document.createElement('p');
      nameEl.className = 'color-swatch-name';
      nameEl.textContent = label;
      info.append(nameEl);
    }
    const valueEl = document.createElement('p');
    valueEl.className = 'color-swatch-value';
    valueEl.textContent = colorValue;
    info.append(valueEl);

    li.append(swatch, info);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
