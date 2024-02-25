import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules';

window.addEventListener('DOMContentLoaded', () => {
    // Анимация шапки
    +function setHeaderAnimations() {
        const header = document.querySelector('.header')
        let headerHeight = header.getBoundingClientRect().height
        let scroll = pageYOffset
        let previousScroll = 0

        window.addEventListener('resize', () => {
            headerHeight = header.getBoundingClientRect().height
        })

        scroll > headerHeight ?
            header.classList.add('--scroll') :
            header.classList.remove('--scroll')

        window.addEventListener('scroll', event => {
            scroll = pageYOffset

            if (!header.classList.contains('--feedback')) {
                if (scroll > 0) {
                    previousScroll < scroll ? 
                        header.classList.add('--hide') :
                        header.classList.remove('--hide')
                } else {
                    header.classList.remove('--hide')
                }
    
                scroll > headerHeight ?
                    header.classList.add('--scroll') :
                    header.classList.remove('--scroll')
    
                previousScroll = scroll
            } else {
                event.preventDefault()
            }
        })
    }()

    // Отступ под шапкой
    +function setOffsetHeader() {
        if (!document.querySelector('.header') && 
            !document.querySelector('.header__form') && 
            !document.querySelector('.hero__offset')) return

        const header = document.querySelector('.header')
        const offset = document.querySelector('.hero__offset')
        const feedback = document.querySelector('.header__form')
        const burger = document.querySelector('.header__menu-nav')

        const height = header.getBoundingClientRect().height.toFixed(2)
        feedback.style.paddingTop = `${height}px`
        burger.style.paddingTop = `${height}px`

        window.addEventListener('resize', () => {
            const height = header.getBoundingClientRect().height.toFixed(2)
            offset.style.height = `${height}px`
            feedback.style.paddingTop = `${height}px`
            burger.style.paddingTop = `${height}px`
        })
    }()

    // Бургер
    +function openBurger() {
        const header = document.querySelector('.header')
        const triggers = [...document.querySelectorAll('[data-menu]')]
        
        triggers.forEach(trigger => {
            trigger.addEventListener('click', event => {
                event.preventDefault()
                !header.classList.contains('--menu') ?
                    header.classList.add('--menu') :
                    header.classList.remove('--menu')
            })
        })
    }()

    // Заявка
    +function openFeedback() {
        const header = document.querySelector('.header')
        const triggers = [...document.querySelectorAll('[data-feedback]')]

        triggers.forEach(trigger => {
            trigger.addEventListener('click', event => {
                event.preventDefault()
                !header.classList.contains('--feedback') ?
                    header.classList.add('--feedback') :
                    header.classList.remove('--feedback')
            })
        })

        let width = window.innerWidth
        const requestTitle = header.querySelector('.header__request .form__title')

        setTitle(width)

        window.addEventListener('resize', () => {
            width = window.innerWidth
            setTitle(width)
        })

        function setTitle(width) {
            width < 576 ? 
                requestTitle.textContent = 'Заявка' :
                requestTitle.textContent = 'Предварительная заявка'
        }
    }()

    // Форма
    +function forms() {
        const forms = [...document.querySelectorAll('.form')]

        forms.forEach(form => {
            const inputs = [...form.querySelectorAll('.form__input')]

            form.addEventListener('submit', event => {
                let check = true
                event.preventDefault()
                
                inputs.forEach(input => {
                    const label = input.closest('.form__label')
                    if (input.value.length < 1) {
                        check = false
                        label.classList.add('--error')
                    } else {
                        label.classList.remove('--error')
                    }
                })

                if (!check) {

                } else {
                    //form.submit()
                    form.classList.add('--success')
                    form.reset()
                    inputs.forEach(input => input.classList.remove('--active', '--focus'))
                }
            })
        })
    }()

    // Инпуты
    +function inputsAnimation() {
        if (!document.querySelector('.form__input')) return
        const inputs = [...document.querySelectorAll('.form__input')]

        inputs.forEach(input => {
            const label = input.closest('.form__label')
            input.addEventListener('input', event => {
                const value = event.target.value
                if (value.length > 0) {
                    setActive(label)
                    label.classList.remove('--error')
                } else {
                    unsetActive(label)
                    label.classList.add('--error')
                }
            })
        })

        const setActive = (el) => el.classList.add('--active')
        const unsetActive = (el) => el.classList.remove('--active')

        inputs.forEach(input => {
            const label = input.closest('.form__label')
            input.addEventListener('focus', () => setFocus(label))
        })

        inputs.forEach(input => {
            const label = input.closest('.form__label')
            input.addEventListener('blur', () => unsetFocus(label))
        })

        const setFocus = (el) => el.classList.add('--focus')
        const unsetFocus = (el) => el.classList.remove('--focus')
    }()

    // Карточки портфолио
    // +function portfolioCards() {
    //     if (!document.querySelector('.portfolio__item')) return
    //     const items = [...document.querySelectorAll('.portfolio__link')]

    //     items.forEach(item => {
    //         if (!item.querySelector('.portfolio__info')) return

    //         const block = item.querySelector('.portfolio__info')
    //         const inner = block.querySelector('.portfolio__info-inner')
    //         const content = block.querySelector('.portfolio__info-content')

    //         inner.style.width = `${inner.getBoundingClientRect().width}px`
    //         block.style.width = 0
            
    //         item.addEventListener('mouseenter', () => {
    //             showInfo(block, inner, content)
    //         })

    //         item.addEventListener('mouseleave', () => {
    //             hideInfo(block, content)
    //         })
    //     })

    //     function showInfo(block, inner, content) {
    //         const width = inner.getBoundingClientRect().width
    //         const height = inner.getBoundingClientRect().height

    //         content.style.opacity = 1
    //         inner.style.width = `${width}px`
    //         block.style.width = `${width}px`
    //         block.style.maxHeight = `${height}px`
    //     }

    //     function hideInfo(block, content) {
    //         content.style.opacity = 0
    //         block.style.maxHeight = 0
    //         block.style.width = 0
    //     }
    // }()

    // Слайдер клиентов (мобильный)
    +function sliderClients() {
        if (!document.querySelector('.reviews__list .swiper')) return

        const view = 767

        const block = document.querySelector('.reviews__list .swiper')
        const slider = new Swiper(block, {
            modules: [Pagination],
            init: false,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
                576: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                }
            }
        })

        if (window.innerWidth <= view) slider.init()

        window.addEventListener('resize', () => {
            if (window.innerWidth <= view) {
                slider.init()
            } else {
                slider.destroy()
            }
        })
    }()

    // Слайдер отзывов
    +function sliderReviews() {
        if (!document.querySelector('.reviews__slider .swiper')) return

        const block = document.querySelector('.reviews__slider .swiper')
        const slider = new Swiper(block, {
            modules: [Navigation, Pagination],
            init: false,
            spaceBetween: 75,
            slidesPerView: 'auto',
            centeredSlides: true,
            navigation: {
                prevEl: '.reviews__prev',
                nextEl: '.reviews__next'
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            breakpoints: {
                0: {
                    spaceBetween: 30,
                    allowTouchMove: true,
                },
                768: {
                    spaceBetween: 60,
                },
                992: {
                    spaceBetween: 75,
                    allowTouchMove: false,
                }
            }
        })

        slider.on('afterInit', (swiper) => {
            if (swiper.activeIndex === 0) swiper.setTranslate(0)
        })

        slider.on('reachBeginning', (swiper) => {
            if (swiper.activeIndex === 0) swiper.setTranslate(0)
        })
        
        slider.on('slideChange', (swiper) => {
            if (swiper.activeIndex === 0) swiper.setTranslate(0)
        })

        slider.init()
    }()

    // Отзыв
    +function modalReviews() {
        if (!document.querySelector('#show-print') && !document.querySelector('[data-print]')) return

        const modal = document.querySelector('#show-print')
        const image = modal.querySelector('.print__image')
        const links = [...document.querySelectorAll('[data-print]')]

        links.forEach(link => {
            link.addEventListener('click', () => {
                const src = link.dataset.print
                image.src = src
                modal.classList.add('--show')
            })
        })
        
        document.body.addEventListener('keydown', event => {
            if (event.code === 'Escape') {
                modal.classList.remove('--show')
            }
        })

        modal.addEventListener('click', event => {
            const target = event.target
            if (target !== image) modal.classList.remove('--show')
        })
    }()

    // Скролл к элементу
    +function scrollToElement() {
        const triggers = [...document.querySelectorAll('a[href*="#"]')]

        triggers.forEach(trigger => {
            const href = trigger.href

            if (href !== '#') {
                trigger.addEventListener('click', event => {
                    event.preventDefault();
                    
                    const element = document.querySelector(event.currentTarget.getAttribute('href'));
                    const top = element.getBoundingClientRect().top;
                    let pageTo = window.scrollY + top;
                    const time = Date.now();

                    requestAnimationFrame(scroll);
                    function scroll(){
                        
                        var timeFracion = (Date.now() - time)/800;

                        if (timeFracion > 1) {
                            window.scrollTo(0,pageTo);
                            return;
                        }
                        var multiple = 1 - Math.sin(Math.acos(timeFracion - 1));

                        window.scrollTo(0,pageTo - top * multiple);
                        requestAnimationFrame(scroll);
                    }
                })
            }
        })
    }()

    // Высота первой картинки в секции блога на мобильных
    +function blogFirstImageHeight() {
        if (!document.querySelector('.blog')) return

        let screen = window.innerWidth

        const head = document.querySelector('.blog__head')
        const item = document.querySelector('.blog__item:first-child')
        const image = item.querySelector('.blog__bg')

        let heightHead = head.getBoundingClientRect().height
        let heightItem = item.getBoundingClientRect().height
        let height = heightHead + heightItem

        setHeight(height)

        window.addEventListener('resize', () => {
            screen = window.innerWidth

            heightHead = head.getBoundingClientRect().height
            heightItem = item.getBoundingClientRect().height
            height = heightHead + heightItem

            setHeight(height)
        })

        function setHeight(height) {
            if (screen <= 767) {
                image.style.height = `${height}px`
            } else {
                image.removeAttribute('style')
            }
        }
    }()
})
