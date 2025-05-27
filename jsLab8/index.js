document.addEventListener('DOMContentLoaded', () => {
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    const totalItems = items.length;

    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = (index + totalItems) % totalItems;
        updateCarousel();
    }

    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    
    let autoSlide = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);

    
    carouselInner.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    carouselInner.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });

   
    updateCarousel();
});