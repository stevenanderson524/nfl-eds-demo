export default function decorate(block) {
  const rows = [...block.children];
  const labels = rows.map((row) => row.textContent.trim()).filter(Boolean);
  if (labels.length === 0) {
    labels.push('AFC', 'NFC');
  }

  const toggle = document.createElement('div');
  toggle.className = 'conf-toggle';

  labels.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.type = 'button';
    if (i === 0) btn.classList.add('active');

    btn.addEventListener('click', () => {
      toggle.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const conf = label.toLowerCase().trim();
      document.querySelectorAll('.section[class*="conf-"]').forEach((section) => {
        if (section.classList.contains(`conf-${conf}`)) {
          section.style.display = '';
        } else {
          const isConf = [...section.classList].some((c) => c.startsWith('conf-'));
          if (isConf) section.style.display = 'none';
        }
      });
    });

    toggle.append(btn);
  });

  block.replaceChildren(toggle);

  // Hide NFC sections initially
  requestAnimationFrame(() => {
    const firstConf = labels[0].toLowerCase().trim();
    document.querySelectorAll('.section[class*="conf-"]').forEach((section) => {
      if (!section.classList.contains(`conf-${firstConf}`)) {
        section.style.display = 'none';
      }
    });
  });
}
