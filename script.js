/* ═══════════════════════════════════════════
   ORBITE — Premium Digital Agency
   Interactions & Animations
   test
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── NAVIGATION SCROLL ─────────────────
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    function handleNavScroll() {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ─── MOBILE MENU ───────────────────────
    const burger = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

    if (burger && mobileMenu) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ─── SMOOTH SCROLL ─────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = nav.offsetHeight + 20;
                var targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── REVEAL ON SCROLL ──────────────────
    function createRevealObserver() {
        var reveals = document.querySelectorAll('.reveal');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            });

            reveals.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback for older browsers
            reveals.forEach(function (el) {
                el.classList.add('revealed');
            });
        }
    }

    createRevealObserver();

    // ─── COUNTER ANIMATION ─────────────────
    function animateCounters() {
        var counters = document.querySelectorAll('[data-count]');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        var target = parseInt(el.getAttribute('data-count'), 10);
                        var duration = 2000;
                        var startTime = null;

                        function step(timestamp) {
                            if (!startTime) startTime = timestamp;
                            var progress = Math.min((timestamp - startTime) / duration, 1);
                            // Ease out cubic
                            var eased = 1 - Math.pow(1 - progress, 3);
                            el.textContent = Math.floor(eased * target);
                            if (progress < 1) {
                                requestAnimationFrame(step);
                            } else {
                                el.textContent = target;
                            }
                        }

                        requestAnimationFrame(step);
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(function (counter) {
                observer.observe(counter);
            });
        }
    }

    animateCounters();

    // ─── FAQ ACCORDION ─────────────────────
    var faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(function (item) {
        var question = item.querySelector('.faq__question');
        var answer = item.querySelector('.faq__answer');

        question.addEventListener('click', function () {
            var isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(function (other) {
                other.classList.remove('active');
                var otherAnswer = other.querySelector('.faq__answer');
                otherAnswer.style.maxHeight = null;
            });

            // Open clicked (if it wasn't already open)
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ─── STAGGERED REVEAL FOR GRIDS ────────
    function staggerReveal() {
        var grids = document.querySelectorAll(
            '.services__grid, .why__grid, .pricing__grid, .testimonials__grid'
        );

        grids.forEach(function (grid) {
            var children = grid.querySelectorAll('.reveal');
            children.forEach(function (child, index) {
                child.style.transitionDelay = (index * 0.1) + 's';
            });
        });
    }

    staggerReveal();

    // ─── ACTIVE NAV LINK HIGHLIGHT ─────────
    function highlightActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav__link');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var id = entry.target.getAttribute('id');
                        navLinks.forEach(function (link) {
                            link.classList.remove('nav__link--active');
                            if (link.getAttribute('href') === '#' + id) {
                                link.classList.add('nav__link--active');
                            }
                        });
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-100px 0px -50% 0px'
            });

            sections.forEach(function (section) {
                observer.observe(section);
            });
        }
    }

    highlightActiveNav();

    // ─── MAGNETIC BUTTON EFFECT ────────────
    var magneticButtons = document.querySelectorAll('.btn--primary, .btn--white');

    magneticButtons.forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
        });

        btn.addEventListener('mouseleave', function () {
            btn.style.transform = '';
        });
    });

    // ─── PARALLAX GLOW EFFECT ──────────────
    var glows = document.querySelectorAll('.hero__glow');

    window.addEventListener('mousemove', function (e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 2;
        var y = (e.clientY / window.innerHeight - 0.5) * 2;

        glows.forEach(function (glow, index) {
            var speed = (index + 1) * 15;
            glow.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px)';
        });
    }, { passive: true });

})();
