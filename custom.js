(function ($) {
  "use strict";

  // NAVBAR
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  // Add styles dynamically
  const styles = `
    .vegas-prev, .vegas-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1000;
      width: 50px;
      height: 50px;
      border: none;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 20px;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .vegas-prev { left: 20px; }
    .vegas-next { right: 20px; }
    .vegas-prev:hover, .vegas-next:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    .vegas-dots {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 1000;
    }
    .vegas-dots span {
      width: 12px;
      height: 12px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .vegas-dots span.active {
      background-color: rgba(255, 255, 255, 1);
    }
  `;
  $('head').append(`<style>${styles}</style>`);

  // Add navigation buttons for larger screens
  if ($(window).width() > 768) {
    $('body').append('<button class="vegas-prev">&#9664;</button>');
    $('body').append('<button class="vegas-next">&#9654;</button>');
  }

  // Add dots container for navigation
  $('body').append('<div class="vegas-dots"></div>');

  // Define the slideshow content using videos
  const slides = [
    { video: { src: ['videos/video1.mp4'], mute: false, loop: false } },
    { video: { src: ['videos/video2.mp4'], mute: false, loop: false } },
    { video: { src: ['videos/video3.mp4'], mute: false, loop: false } },
    { video: { src: ['videos/video4.mp4'], mute: false, loop: false } }
  ];

  // Initialize Vegas slideshow using videos
  $('.hero-slides').vegas({
    slides: slides,
    timer: false,
    walk: function (index) {
      $('.vegas-dots span').removeClass('active');
      $('.vegas-dots span').eq(index).addClass('active');
    },
    transition: 'fade',
    delay: 5000,
    animation: 'random',
  });

  // Add dots dynamically for each slide
  slides.forEach((_, index) => {
    $('.vegas-dots').append(`<span data-index="${index}"></span>`);
  });

  // Set the first dot as active
  $('.vegas-dots span').first().addClass('active');

  // Dot click functionality
  $('.vegas-dots span').on('click', function () {
    const slideIndex = $(this).data('index');
    $('.hero-slides').vegas('jump', slideIndex);
  });

  // Navigation buttons functionality for larger screens
  if ($(window).width() > 768) {
    $('.vegas-prev').on('click', function () {
      $('.hero-slides').vegas('previous');
    });
    $('.vegas-next').on('click', function () {
      $('.hero-slides').vegas('next');
    });
  }
})(window.jQuery);
