export default function decorate(block) {
  const table = document.createElement('table');
  const rows = [...block.children];

  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    const cols = [...row.children];

    cols.forEach((col) => {
      const cell = document.createElement(i === 0 ? 'th' : 'td');
      cell.append(...col.childNodes);
      tr.append(cell);
    });

    if (i === 0) {
      const thead = document.createElement('thead');
      thead.append(tr);
      table.append(thead);
    } else {
      let tbody = table.querySelector('tbody');
      if (!tbody) {
        tbody = document.createElement('tbody');
        table.append(tbody);
      }
      tbody.append(tr);
    }
  });

  block.replaceChildren(table);
}
