/*
<script>
*/

document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll('.slide');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const slider = document.querySelector('.slider');
  let current = 0;
  let interval;

    showSlide(current);

    function showSlide(index){
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
    }

  function nextSlide(){
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlideFunc(){
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  if(next) next.addEventListener('click', nextSlide);
  if(prev) prev.addEventListener('click', prevSlideFunc);

  /* 自動播放淡入淡出 */
  function startAutoSlide(){ interval = setInterval(nextSlide, 4000); }
  function stopAutoSlide(){ clearInterval(interval); }
  startAutoSlide();

  if(slider){
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
  }

  /* IntersectionObserver 動畫效果 */
  const sections = document.querySelectorAll('.service-section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add('visible'); }
    });
  },{ threshold: 0.2 });
  sections.forEach(sec => observer.observe(sec));

  /* Lightbox */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  // 點擊背景關閉 lightbox
  if(lightbox && lightboxImg){
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    // 點擊圖片本身不關閉 lightbox
    lightboxImg.addEventListener('click', e => e.stopPropagation());
  }

  /* 動態生成 media-item 內容 */
  document.querySelectorAll('.media-item').forEach(item => {
    const src = item.dataset.src;
    if(!src) return;

    const ext = src.split('.').pop().toLowerCase();

    if(ext === 'mp4' || ext === 'mov' || ext === 'webm') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata"; // 僅預載影片資訊
      video.style.cursor = 'pointer';

      item.addEventListener('mouseenter', () => video.play());
      item.addEventListener('mouseleave', () => video.pause());

      // 手機點擊切換播放/暫停
      item.addEventListener('click', () => {
        if (video.paused) video.play();
        else video.pause();
      });

      item.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.style.cursor = 'pointer';

      img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = src;
      });

      item.appendChild(img);
    }
  });

  function updateMediaHeight() {
    const rows = document.querySelectorAll('.media-row');

    rows.forEach(row => {
      const style = getComputedStyle(row);
      const gap = parseInt(style.gap) || 0;

      let columns = window.innerWidth <= 768 ? 2 : 4;

      const totalGap = gap * (columns - 1);
      const width = row.clientWidth;
      const itemWidth = (width - totalGap) / columns;

      const height = itemWidth * 16 / 9;

      row.querySelectorAll('.media-item').forEach(item => {
        item.style.height = height + 'px';
      });
    });
  }

  window.addEventListener('load', updateMediaHeight);
  window.addEventListener('resize', updateMediaHeight);



});
/*
</script>
*/