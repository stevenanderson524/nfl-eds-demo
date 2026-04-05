export default function decorate(block) {
  // Move picture to be a direct child of the block for background positioning
  const pic = block.querySelector('picture');
  if (pic) {
    block.append(pic);
  }

  // Mark remaining content divs
  [...block.querySelectorAll(':scope > div > div')].forEach((div) => {
    if (!div.querySelector('picture')) {
      div.classList.add('hero-content');
    }
  });
}
