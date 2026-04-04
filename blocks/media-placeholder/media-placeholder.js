export default function decorate(block) {
  const rows = [...block.children];
  const card = document.createElement('div');
  card.className = 'media-placeholder-card';

  rows.forEach((row) => {
    const cols = [...row.children];
    cols.forEach((col) => {
      const text = col.textContent.trim();
      if (!text) return;
      const p = document.createElement('p');
      p.textContent = text;
      card.append(p);
    });
  });

  block.replaceChildren(card);
}
