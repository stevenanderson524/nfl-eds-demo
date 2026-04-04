import { loadScript } from '../../scripts/aem.js';

const THREE_VERSION = '0.147.0';
const CDN = `https://cdn.jsdelivr.net/npm/three@${THREE_VERSION}`;

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
  // Load Three.js r147 UMD build — pure WebGL, no WASM, CSP-safe
  await loadScript(`${CDN}/build/three.min.js`);
  await loadScript(`${CDN}/examples/js/loaders/GLTFLoader.js`);

  const { THREE } = window;

  const wrapper = document.createElement('div');
  wrapper.className = 'media-placeholder-3d';
  block.replaceChildren(wrapper);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  wrapper.append(renderer.domElement);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
  camera.position.set(0, 0, 60);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight1.position.set(5, 10, 7);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x5a9fd4, 0.5);
  dirLight2.position.set(-5, -3, 5);
  scene.add(dirLight2);

  const rimLight = new THREE.DirectionalLight(0xd4af37, 0.3);
  rimLight.position.set(0, 5, -10);
  scene.add(rimLight);

  // Size — use block parent width since wrapper may not have layout yet
  function resize() {
    const w = wrapper.clientWidth || block.clientWidth || 580;
    const h = wrapper.clientHeight || 420;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  // Observe wrapper for size changes (handles initial layout)
  const ro = new ResizeObserver(() => resize());
  ro.observe(wrapper);
  resize();
  window.addEventListener('resize', resize);

  // Load GLB model
  const loader = new THREE.GLTFLoader();
  loader.load(
    src,
    (gltf) => {
      const model = gltf.scene;

      // Center and scale
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 20 / maxDim;
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));

      scene.add(model);

      // Animate
      let animId;
      function animate() {
        animId = requestAnimationFrame(animate);
        model.rotation.y += 0.008;
        renderer.render(scene, camera);
      }
      animate();

      // Pause when off-screen
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!animId) animate();
          } else {
            cancelAnimationFrame(animId);
            animId = null;
          }
        });
      });
      observer.observe(wrapper);
    },
    undefined,
    (error) => {
      /* eslint-disable-next-line no-console */
      console.error('Failed to load 3D model:', error);
      wrapper.innerHTML = '<div class="media-placeholder-card"><p>3D Shield</p></div>';
    },
  );
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
