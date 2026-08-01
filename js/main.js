(() => {
    'use strict';

    const initHeader = () => {
        const menuButton = document.querySelector('.header__menu-button');
        const languageButton = document.querySelector('.header__language-button');
        const languageSelector = document.querySelector('.header__language-selector');
        const languageOptions = document.querySelectorAll('.header__language-option');

        menuButton?.addEventListener('click', () => {
            const isActive = menuButton.classList.toggle('is-active');
            menuButton.setAttribute('aria-pressed', String(isActive));
        });

        const closeLanguageSelector = () => {
            if (!languageButton || !languageSelector) return;

            languageButton.setAttribute('aria-expanded', 'false');
            languageSelector.hidden = true;
        };

        languageButton?.addEventListener('click', () => {
            if (!languageSelector) return;

            const isOpen = languageButton.getAttribute('aria-expanded') === 'true';
            languageButton.setAttribute('aria-expanded', String(!isOpen));
            languageSelector.hidden = isOpen;
        });

        languageOptions.forEach((option) => {
            option.addEventListener('click', () => {
                languageOptions.forEach((item) => {
                    const isSelected = item === option;
                    item.classList.toggle('is-selected', isSelected);
                    item.setAttribute('aria-pressed', String(isSelected));
                });

                document.documentElement.lang = option.dataset.language || 'ko';
                closeLanguageSelector();
                languageButton?.focus();
            });
        });

        document.addEventListener('click', (event) => {
            if (!(event.target instanceof Element)) return;
            if (event.target.closest('.header__language')) return;

            closeLanguageSelector();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;

            closeLanguageSelector();
            languageButton?.focus();
        });
    };

    const initCategoryNavigation = () => {
        const categoryButtons = document.querySelectorAll('.category-nav__button');

        categoryButtons.forEach((button) => {
            button.addEventListener('click', () => {
                categoryButtons.forEach((item) => {
                    const isSelected = item === button;
                    item.classList.toggle('is-selected', isSelected);
                    item.setAttribute('aria-pressed', String(isSelected));
                });
            });
        });
    };

    const initHero = () => {
        const hero = document.querySelector('.hero.swiper');

        if (hero && typeof Swiper !== 'undefined') {
            const wrapper = hero.querySelector('.swiper-wrapper');
            const sourceSlide = wrapper?.querySelector('.swiper-slide');

            if (wrapper && sourceSlide) {
                for (let index = 1; index < 4; index += 1) {
                    const slide = sourceSlide.cloneNode(true);
                    const title = slide.querySelector('#heroTitle');
                    const image = slide.querySelector('.hero__image');

                    title?.removeAttribute('id');
                    if (image) image.alt = '';
                    wrapper.append(slide);
                }

                const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                new Swiper(hero, {
                    loop: true,
                    speed: 700,
                    autoplay: reduceMotion
                        ? false
                        : {
                              delay: 5000,
                              disableOnInteraction: false,
                              pauseOnMouseEnter: true,
                          },
                    navigation: {
                        prevEl: '.hero__arrow--prev',
                        nextEl: '.hero__arrow--next',
                    },
                    pagination: {
                        el: '.hero__pagination',
                        clickable: true,
                    },
                    a11y: {
                        prevSlideMessage: '이전 배너',
                        nextSlideMessage: '다음 배너',
                        paginationBulletMessage: '{{index}}번 배너로 이동',
                    },
                });
            }
        }
    };

    const initTopButtons = () => {
        const topButtons = document.querySelectorAll('.top-button');

        topButtons.forEach((button) => {
            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            });
        });
    };

    const initReviewCards = () => {
        const reviewLinks = document.querySelectorAll('.review-card__link');

        reviewLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                if (link.getAttribute('href') === '#') event.preventDefault();
            });
        });
    };

    const initReviewScroll = () => {
        const section = document.querySelector('.review-section');
        const sticky = section?.querySelector('.review-section__sticky');
        const gallery = section?.querySelector('.review-gallery');
        const leftColumn = gallery?.querySelector('.review-gallery__column--left');
        const rightColumn = gallery?.querySelector('.review-gallery__column--right');

        if (!section || !sticky || !gallery || !leftColumn || !rightColumn) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frameId = 0;
        let leftMove = 0;
        let rightMove = 0;
        let rightRevealMove = 0;
        let scrollDistance = 0;

        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

        const update = () => {
            frameId = 0;

            if (reduceMotion.matches) {
                leftColumn.style.removeProperty('transform');
                rightColumn.style.removeProperty('transform');
                return;
            }

            const sectionRect = section.getBoundingClientRect();
            const progress = sectionRect.top >= -0.5 || scrollDistance <= 0
                ? 0
                : clamp(-sectionRect.top / scrollDistance, 0, 1);

            if (progress === 0) {
                leftColumn.style.removeProperty('transform');
                rightColumn.style.removeProperty('transform');
                return;
            }

            const rightRevealEnd = 0.12;
            const rightHoldEnd = 0.22;
            let rightOffset = 0;

            if (progress <= rightRevealEnd) {
                rightOffset = rightRevealMove * (progress / rightRevealEnd);
            } else if (progress <= rightHoldEnd) {
                rightOffset = rightRevealMove;
            } else {
                const rightProgress = (progress - rightHoldEnd) / (1 - rightHoldEnd);
                rightOffset = rightRevealMove - ((rightMove + rightRevealMove) * rightProgress);
            }

            leftColumn.style.transform = `translate3d(0, ${(-leftMove * progress).toFixed(3)}px, 0)`;
            rightColumn.style.transform = `translate3d(0, ${rightOffset.toFixed(3)}px, 0)`;
        };

        const requestUpdate = () => {
            if (frameId) return;
            frameId = window.requestAnimationFrame(update);
        };

        const measure = () => {
            const galleryHeight = gallery.clientHeight;
            const stickyHeight = sticky.clientHeight;
            const visibleGalleryHeight = Math.min(galleryHeight, Math.max(0, stickyHeight - gallery.offsetTop));
            const leftStart = Number.parseFloat(window.getComputedStyle(leftColumn).top) || 0;
            const rightStart = Number.parseFloat(window.getComputedStyle(rightColumn).top) || 0;
            const leftMaxMove = Math.max(0, leftColumn.scrollHeight - visibleGalleryHeight);
            const rightMaxMove = Math.max(0, rightColumn.scrollHeight - visibleGalleryHeight);

            leftMove = Math.max(0, leftMaxMove + leftStart);
            rightMove = Math.max(0, rightMaxMove + rightStart);
            rightRevealMove = Math.max(0, -rightStart + 12);
            scrollDistance = Math.max(leftMove, rightMove);
            section.style.height = reduceMotion.matches
                ? `${stickyHeight}px`
                : `${stickyHeight + scrollDistance}px`;
            requestUpdate();
        };

        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', measure);
        reduceMotion.addEventListener('change', measure);
        measure();
    };

    const initBackgroundObserver = () => {
        const sections = document.querySelectorAll('.travel-section, .review-section');

        if (!sections.length || !('IntersectionObserver' in window)) return;

        const isNearViewport = (section) => {
            const rect = section.getBoundingClientRect();
            const margin = window.innerWidth * 0.12;

            return rect.bottom >= -margin && rect.top <= window.innerHeight + margin;
        };

        sections.forEach((section) => {
            section.classList.toggle('is-background-visible', isNearViewport(section));
        });

        document.documentElement.classList.add('has-background-observer');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle('is-background-visible', entry.isIntersecting);
                });
            },
            {
                root: null,
                rootMargin: '12% 0px',
                threshold: 0.01,
            }
        );

        sections.forEach((section) => observer.observe(section));
    };

    const init = () => {
        initHeader();
        initCategoryNavigation();
        initHero();
        initTopButtons();
        initReviewCards();
        initReviewScroll();
        initBackgroundObserver();
    };

    document.addEventListener('DOMContentLoaded', init);
})();
