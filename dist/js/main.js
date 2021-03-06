
window.onload = function () {

    slideGallery();

    showSlides(1);

    openCity(1);

};
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}


function slideGallery() {
    var slideGallery = document.querySelector('.component-slider'); // slider div container
    var slidesList = slideGallery.querySelector('.mask ul'); // slides ul list
    var slideItems = slideGallery.querySelectorAll('.mask ul li'); // slides li elements
    var slidesNumber = slideItems.length;
    var slidesWidth = slideItems[0].offsetWidth; // getting width by first element
    var currentSlide = 0; // active slide indicator

    // lets set our slides ul width by slides number;
    var slidesListWidth = slidesWidth * slidesNumber;
    slidesList.style.width = slidesListWidth + "px";

    // default state, slide[0] active;
    setPosition();
    //autoSlide();
    delay();

    // slide to next
    function slideLeft() {
        if (currentSlide < slidesNumber - 1) { // -1 cause our first element has index [0]
            currentSlide++;
        }
        else {
            currentSlide = 0;
        }
        setPosition();
    }

    // slide to prev
    function slideRight() {
        if (currentSlide !== 0) {
            currentSlide--;
        }
        else {
            currentSlide = slidesNumber - 1; // -1 cause our first element has index [0]
        }
        setPosition();
    }

    // set slides list position
    function setPosition() {
        var offset = currentSlide * slidesWidth * -1 + 'px';
        jQuery(slidesList).animate({
            marginLeft: offset,
        }, 500, function() {
            setActiveClass();
        });
        slidesList.style.marginLeft = offset;
    }

    // set active class for slide element
    function setActiveClass() {
        // reset all active classes
        for (item of slideItems) {
            item.classList.remove('active');
        }

        // set active class
        slideItems[currentSlide].classList.add('active');
    }

    function autoSlide() {
        setTimeout(slideLeft(), 3000);
    }

    function delay() {
        jQuery(document).ready(function () {
            jQuery('.content').hide();
            jQuery('.content').delay(2000).fadeIn(500);
        });
    }

    // adding buttons event handlers
    slideGallery.querySelector('.arrows .right').addEventListener("click", function (event) {
        console.log("prawo");
        event.preventDefault();
        slideLeft();
    });
    slideGallery.querySelector('.arrows .left').addEventListener("click", function (event) {
        console.log("lewo");
        event.preventDefault();
        slideRight();
    });
}

function openCity(evt, cityName) {

    document.getElementById("Paris").hidden;
    document.getElementById("Tokyo").hidden;

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if (cityName) {
        document.getElementById(cityName).style.display = "block";
    }
    if (evt) {
        evt.currentTarget.className += " active";
    }
}