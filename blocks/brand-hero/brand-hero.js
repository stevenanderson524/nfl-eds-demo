export default function decorate(block) {
  const rows = [...block.children];
  const content = document.createElement('div');
  content.className = 'brand-hero-content';

  rows.forEach((row) => {
    while (row.firstElementChild) content.append(row.firstElementChild);
  });

  block.replaceChildren(content);
}
