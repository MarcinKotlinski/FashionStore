"use strict";

const init = () => {

    let topGallery = fadeGallery({
        galleryBlock: '#top-gallery',              // gallery block
        items: '.fade-gallery__item',         // slides selector
        galleryImage: '.fade-gallery__image', // gallery image
        pagerClass: 'fade-gallery__pager'     // pager class
    });

    let vodCarousel = slideGallery({
        carouselBlock: '#vod-gallery',      // slider block
        prevBtn: '.btn--prev',              // previous button
        nextBtn: '.btn--next',              // next button
        mask: '.slide-gallery__mask',       // masking div
        list: 'ul',                         // elements list
        items: 'li'                         // element selector
    });

    let tvCarousel = slideGallery({
        carouselBlock: '#tv-gallery',       // slider block
        prevBtn: '.btn--prev',              // previous button
        nextBtn: '.btn--next',              // next button
        mask: '.slide-gallery__mask',       // masking div
        list: 'ul',                         // elements list
        items: 'li'                         // element selector
    });
};

window.onload = () => init();
