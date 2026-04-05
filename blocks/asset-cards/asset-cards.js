export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const cols = [...row.children];

    // First col = title, second col = link text / description
    const title = cols[0]?.textContent.trim() || '';
    const linkOrDesc = cols[1]?.textContent.trim() || '';
    const link = cols[1]?.querySelector('a');

    const card = document.createElement('a');
    card.className = 'asset-card';

    if (link) {
      card.href = link.href;
    } else {
      card.href = '#';
    }

    const h3 = document.createElement('h3');
    h3.textContent = title;
    card.append(h3);

    if (linkOrDesc) {
      const p = document.createElement('p');
      p.textContent = link ? link.textContent.trim() : linkOrDesc;
      card.append(p);
    }

    li.append(card);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
