export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 2) return;

    const details = document.createElement('details');
    details.className = 'accordion-item';

    const summary = document.createElement('summary');
    summary.className = 'accordion-heading';
    summary.textContent = cols[0].textContent.trim();

    const body = document.createElement('div');
    body.className = 'accordion-body';
    body.append(...cols[1].childNodes);

    details.append(summary, body);
    row.replaceWith(details);
  });
}
