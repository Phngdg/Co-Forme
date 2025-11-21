
  const newsList = document.querySelector('.home__news-list');
  const prevBtn = document.querySelector('.home__news-prev');
  const nextBtn = document.querySelector('.home__news-next');
  const cards = document.querySelectorAll('.news-card');

  const visibleCards = 3; // hiển thị 3 mỗi lần
  const totalCards = cards.length;
  const maxIndex = totalCards - visibleCards; // số lần có thể trượt
  let currentIndex = 0;

  function updateSlide() {
    const cardWidth = cards[0].offsetWidth + 20; // card + gap
    newsList.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) currentIndex++;
    updateSlide();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    updateSlide();
  });

  // nếu resize màn hình, cập nhật lại transform
  window.addEventListener('resize', updateSlide);