export default function decorate(block) {
  // Support optional background video: if first child contains an MP4 link, use as bg video
  const firstLink = block.querySelector('a[href$=".mp4"]');
  if (firstLink) {
    const video = document.createElement('video');
    video.className = 'hero-bg-video';
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';

    const source = document.createElement('source');
    source.src = firstLink.href;
    source.type = 'video/mp4';
    video.append(source);

    // Remove the link container
    const linkContainer = firstLink.closest('div');
    if (linkContainer) linkContainer.remove();

    block.prepend(video);
    block.classList.add('hero-with-video');

    // Pause when off-screen for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) video.play();
        else video.pause();
      });
    });
    observer.observe(block);
  }
}
