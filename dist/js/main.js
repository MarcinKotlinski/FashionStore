/* ResizeObserver like function */
let onResize = (element, callback) => {
    if (!onResize.watchedElementData) {

        // First time we are called, create a list of watched elements
        // and hook up the event listeners.
        onResize.watchedElementData = [];

        let checkForChanges = () => {
            onResize.watchedElementData.forEach((data) => {
                if (data.element.offsetWidth !== data.offsetWidth ||
                    data.element.offsetHeight !== data.offsetHeight) {
                    data.offsetWidth = data.element.offsetWidth;
                    data.offsetHeight = data.element.offsetHeight;
                    data.callback();
                }
            });
        };

        // Listen to the window's size changes
        window.addEventListener('resize', checkForChanges);

        // Listen to changes on the elements in the page that affect layout
        let observer = new MutationObserver(checkForChanges);
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    }

    // Save the element we are watching
    onResize.watchedElementData.push({
        element: element,
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight,
        callback: callback
    });
};


// mutationobserver-shim v0.3.2 (github.com/megawac/MutationObserver.js)
// Authors: Graeme Yeates (github.com/megawac)
window.MutationObserver = window.MutationObserver || function (w) {
    function v(a) {
        this.i = [];
        this.m = a
    }

    function I(a) {
        (function c() {
            var d = a.takeRecords();
            d.length && a.m(d, a);
            a.h = setTimeout(c, v._period)
        })()
    }

    function p(a) {
        var b = {
            type: null,
            target: null,
            addedNodes: [],
            removedNodes: [],
            previousSibling: null,
            nextSibling: null,
            attributeName: null,
            attributeNamespace: null,
            oldValue: null
        }, c;
        for (c in a) b[c] !== w && a[c] !== w && (b[c] = a[c]);
        return b
    }

    function J(a, b) {
        var c = C(a, b);
        return function (d) {
            var f = d.length, n;
            b.a && 3 === a.nodeType &&
            a.nodeValue !== c.a && d.push(new p({type: "characterData", target: a, oldValue: c.a}));
            b.b && c.b && A(d, a, c.b, b.f);
            if (b.c || b.g) n = K(d, a, c, b);
            if (n || d.length !== f) c = C(a, b)
        }
    }

    function L(a, b) {
        return b.value
    }

    function M(a, b) {
        return "style" !== b.name ? b.value : a.style.cssText
    }

    function A(a, b, c, d) {
        for (var f = {}, n = b.attributes, k, g, x = n.length; x--;) k = n[x], g = k.name, d && d[g] === w || (D(b, k) !== c[g] && a.push(p({
            type: "attributes",
            target: b,
            attributeName: g,
            oldValue: c[g],
            attributeNamespace: k.namespaceURI
        })), f[g] = !0);
        for (g in c) f[g] || a.push(p({
            target: b,
            type: "attributes", attributeName: g, oldValue: c[g]
        }))
    }

    function K(a, b, c, d) {
        function f(b, c, f, k, y) {
            var g = b.length - 1;
            y = -~((g - y) / 2);
            for (var h, l, e; e = b.pop();) h = f[e.j], l = k[e.l], d.c && y && Math.abs(e.j - e.l) >= g && (a.push(p({
                type: "childList",
                target: c,
                addedNodes: [h],
                removedNodes: [h],
                nextSibling: h.nextSibling,
                previousSibling: h.previousSibling
            })), y--), d.b && l.b && A(a, h, l.b, d.f), d.a && 3 === h.nodeType && h.nodeValue !== l.a && a.push(p({
                type: "characterData",
                target: h,
                oldValue: l.a
            })), d.g && n(h, l)
        }

        function n(b, c) {
            for (var g = b.childNodes,
                     q = c.c, x = g.length, v = q ? q.length : 0, h, l, e, m, t, z = 0, u = 0, r = 0; u < x || r < v;) m = g[u], t = (e = q[r]) && e.node, m === t ? (d.b && e.b && A(a, m, e.b, d.f), d.a && e.a !== w && m.nodeValue !== e.a && a.push(p({
                type: "characterData",
                target: m,
                oldValue: e.a
            })), l && f(l, b, g, q, z), d.g && (m.childNodes.length || e.c && e.c.length) && n(m, e), u++, r++) : (k = !0, h || (h = {}, l = []), m && (h[e = E(m)] || (h[e] = !0, -1 === (e = F(q, m, r, "node")) ? d.c && (a.push(p({
                type: "childList",
                target: b,
                addedNodes: [m],
                nextSibling: m.nextSibling,
                previousSibling: m.previousSibling
            })), z++) : l.push({j: u, l: e})),
                u++), t && t !== g[u] && (h[e = E(t)] || (h[e] = !0, -1 === (e = F(g, t, u)) ? d.c && (a.push(p({
                type: "childList",
                target: c.node,
                removedNodes: [t],
                nextSibling: q[r + 1],
                previousSibling: q[r - 1]
            })), z--) : l.push({j: e, l: r})), r++));
            l && f(l, b, g, q, z)
        }

        var k;
        n(b, c);
        return k
    }

    function C(a, b) {
        var c = !0;
        return function f(a) {
            var k = {node: a};
            !b.a || 3 !== a.nodeType && 8 !== a.nodeType ? (b.b && c && 1 === a.nodeType && (k.b = G(a.attributes, function (c, f) {
                if (!b.f || b.f[f.name]) c[f.name] = D(a, f);
                return c
            })), c && (b.c || b.a || b.b && b.g) && (k.c = N(a.childNodes, f)), c = b.g) : k.a =
                a.nodeValue;
            return k
        }(a)
    }

    function E(a) {
        try {
            return a.id || (a.mo_id = a.mo_id || H++)
        } catch (b) {
            try {
                return a.nodeValue
            } catch (c) {
                return H++
            }
        }
    }

    function N(a, b) {
        for (var c = [], d = 0; d < a.length; d++) c[d] = b(a[d], d, a);
        return c
    }

    function G(a, b) {
        for (var c = {}, d = 0; d < a.length; d++) c = b(c, a[d], d, a);
        return c
    }

    function F(a, b, c, d) {
        for (; c < a.length; c++) if ((d ? a[c][d] : a[c]) === b) return c;
        return -1
    }

    v._period = 30;
    v.prototype = {
        observe: function (a, b) {
            for (var c = {
                b: !!(b.attributes || b.attributeFilter || b.attributeOldValue), c: !!b.childList, g: !!b.subtree,
                a: !(!b.characterData && !b.characterDataOldValue)
            }, d = this.i, f = 0; f < d.length; f++) d[f].s === a && d.splice(f, 1);
            b.attributeFilter && (c.f = G(b.attributeFilter, function (a, b) {
                a[b] = !0;
                return a
            }));
            d.push({s: a, o: J(a, c)});
            this.h || I(this)
        }, takeRecords: function () {
            for (var a = [], b = this.i, c = 0; c < b.length; c++) b[c].o(a);
            return a
        }, disconnect: function () {
            this.i = [];
            clearTimeout(this.h);
            this.h = null
        }
    };
    var B = document.createElement("i");
    B.style.top = 0;
    var D = (B = "null" != B.attributes.style.value) ? L : M, H = 1;
    return v
}(void 0);
//# sourceMappingURL=mutationobserver.map

"use strict";

const init = () => {

    let visualGallery = fadeGallery({
        galleryBlock: '#visual-box',              // gallery block
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
