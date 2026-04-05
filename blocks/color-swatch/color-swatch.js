export default function decorate(block) {
  const swatches = [...block.children];
  swatches.forEach((swatch) => {
    const cols = [...swatch.children];
    if (cols.length >= 2) {
      const hex = cols[1].textContent.trim();
      const preview = document.createElement('div');
      preview.className = 'color-preview';
      preview.style.backgroundColor = hex;

      // Set text color based on luminance
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      preview.style.color = luminance > 0.5 ? '#000' : '#fff';

      swatch.insertBefore(preview, cols[0]);
    }
  });
}
