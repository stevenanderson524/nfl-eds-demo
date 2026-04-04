import { loadScript } from '../../scripts/aem.js';

function buildPlaceholderCard(rows) {
  const card = document.createElement('div');
  card.className = 'media-placeholder-card';

  rows.forEach((row) => {
    [...row.children].forEach((col) => {
      const text = col.textContent.trim();
      if (!text) return;
      const p = document.createElement('p');
      p.textContent = text;
      card.append(p);
    });
  });

  return card;
}

async function build3DViewer(src, block) {
  await loadScript('https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js', { type: 'module' });

  const viewer = document.createElement('model-viewer');
  viewer.setAttribute('src', src);
  viewer.setAttribute('auto-rotate', '');
  viewer.setAttribute('auto-rotate-delay', '0');
  viewer.setAttribute('rotation-per-second', '30deg');
  viewer.setAttribute('camera-controls', '');
  viewer.setAttribute('disable-zoom', '');
  viewer.setAttribute('interaction-prompt', 'none');
  viewer.setAttribute('shadow-intensity', '0.3');
  viewer.setAttribute('exposure', '1.2');
  viewer.setAttribute('environment-image', 'neutral');
  viewer.setAttribute('alt', 'NFL 3D Shield');

  const wrapper = document.createElement('div');
  wrapper.className = 'media-placeholder-3d';
  wrapper.append(viewer);
  block.replaceChildren(wrapper);
}

export default async function decorate(block) {
  const rows = [...block.children];
  const link = block.querySelector('a[href$=".glb"]');

  if (link) {
    await build3DViewer(link.href, block);
  } else {
    block.replaceChildren(buildPlaceholderCard(rows));
  }
}
