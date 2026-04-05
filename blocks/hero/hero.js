export default function decorate(block) {
  const pic = block.querySelector('picture');
  if (pic) {
    const picWrapper = pic.closest('div');
    if (picWrapper) picWrapper.classList.add('hero-image');
  }

  const contentDivs = [...block.querySelectorAll(':scope > div > div')];
  contentDivs.forEach((div) => {
    if (!div.querySelector('picture')) {
      div.classList.add('hero-content');
    }
  });
}
