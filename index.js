const initSlider = () => {
  const imgList = document.querySelector(".slider .img_list");
  const sliderBtn = document.querySelectorAll(".slider .slider-btn");
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollThumb = sliderScrollbar.querySelector(".scroll-icon");
  const maxScrollLeft = imgList.scrollWidth - imgList.clientWidth;


  scrollThumb.addEventListener("mouseover", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollThumb.offsetLeft;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width - scrollThumb.offsetWidth;

      const bounded = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPos = (bounded / maxThumbPosition) * maxScrollLeft;

      scrollThumb.style.left = `${bounded}px`;
      imgList.scrollLeft = scrollPos;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  sliderBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const direction = btn.id === "prev" ? -1 : 1;
      const scrollAmount = imgList.clientWidth * direction;
      imgList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  const handleSliderBtn = () => {
    sliderBtn[0].style.display = imgList.scrollLeft <= 0 ? "none" : "block";
    sliderBtn[1].style.display =
      imgList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  const updateScrollThumposition = () => {
    const scrollPosition = imgList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollThumb.offsetWidth);
    scrollThumb.style.left = `${thumbPosition}px`;
  };

  imgList.addEventListener("scroll", () => {
    handleSliderBtn();
    updateScrollThumposition();
  });

};

window.addEventListener("load", initSlider);
