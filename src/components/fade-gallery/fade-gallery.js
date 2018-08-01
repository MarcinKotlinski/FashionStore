/* Fade Gallery init */
let fadeGallery = (options) => {
  let galleryBlock = document.querySelector(options.galleryBlock),
      items = galleryBlock.querySelectorAll(options.items),
      galleryImage = galleryBlock.querySelector(options.galleryImage),
      itemWidth = items[0].clientWidth,
      itemHeight = galleryImage.clientHeight,
      pager, pages;

  /* pager generator */
  let generatePager = (itemsNumber) => {
    let list = document.createElement('ul');
    list.classList.add(options.pagerClass);
    for(let i = 0; i < itemsNumber; i++) {
        let item = document.createElement('li');
        let link = document.createElement('a');
        link.setAttribute("href", "#");
        item.appendChild(link);
        link.appendChild(document.createTextNode(i + 1));
        list.appendChild(item);
    }
    return list;
  }

  if (items.length > 1) {
    galleryBlock.appendChild(generatePager(items.length));
    pager = galleryBlock.querySelector('.' + options.pagerClass);
    pages = pager.querySelectorAll('li');

    /* default state */
    pages[0].classList.add('active');
    items[0].classList.add('shown');
    galleryBlock.style.height = itemHeight + 'px';
  }

  /* window resize rehavior */
  onResize(galleryBlock, e => {
    if (items.length > 1) {
      itemHeight = galleryImage.clientHeight
      galleryBlock.style.height = itemHeight + 'px';
    }
  });

  /* switcher button handler */
  pager.addEventListener("click", e => {
    e.preventDefault();
    let activePage = pager.querySelector('.active'),
        activeSlide = galleryBlock.querySelector('.shown'),
        el = e.target.parentNode;

    if (el.nodeName === 'LI') {
      // pager switch
      activePage.classList.remove('active');
      el.classList.add('active');

      // slide switch
      let activeIndex = Array.prototype.indexOf.call(el.parentNode.children, el);
      activeSlide.classList.remove('shown');
      items[activeIndex].classList.add('shown');
    }
  });
}
