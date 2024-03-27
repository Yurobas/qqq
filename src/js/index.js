import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules';

window.addEventListener('DOMContentLoaded', () => {

    // Анимация шапки
    +function setHeaderAnimations() {
        if (!document.querySelector('.header')) return

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

            if (!header.classList.contains('--feedback') &&
                !header.classList.contains('--menu')) {
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

        const height = header.getBoundingClientRect().height
        
        feedback.style.paddingTop = `${height}px`
        burger.style.paddingTop = `${height + 30}px`

        window.addEventListener('resize', () => {
            const height = header.getBoundingClientRect().height
            
            offset.style.height = `${height}px`
            feedback.style.paddingTop = `${height}px`
            burger.style.paddingTop = `${height + 30}px`
        })
    }()

    // Бургер
    +function openBurger() {
        if (!document.querySelector('.header')) return

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
        if (!document.querySelector('.header')) return
        
        const header = document.querySelector('.header')
        const triggers = [...document.querySelectorAll('[data-feedback]')]

        triggers.forEach(trigger => {
            trigger.addEventListener('click', event => {
                event.preventDefault()
                if (!header.classList.contains('--feedback')) {
                    header.classList.add('--feedback')
                    header.classList.remove('--hide')
                } else {
                    header.classList.remove('--feedback')
                }
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
                    const type = input.name
                    const label = input.closest('.form__label')

                    if (type === 'name' || type === 'phone') {
                        if (input.value.length < 1) {
                            check = false
                            label.classList.add('--error')
                        } else {
                            label.classList.remove('--error')
                        }
                    }
                    // } else if (type === 'email') {
                    //     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

                    //     if (!emailRegex.test(input.value)) {
                    //         check = false
                    //         label.classList.add('--error')
                    //     } else {
                    //         label.classList.remove('--error')
                    //     }
                    // }
                })

                if (check) {
                    //form.submit()
                    form.classList.add('--success')
                    form.reset()

                    const elements = [...form.querySelectorAll('.form__elementToHide')]

                    elements.forEach(el => el.style.display = 'none')
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
    +function portfolioCards() {
        if (!document.querySelector('.portfolio__item')) return
        const items = [...document.querySelectorAll('.portfolio__link')]

        items.forEach(item => {
            if (!item.querySelector('.portfolio__info')) return

            const block = item.querySelector('.portfolio__info')
            const inner = block.querySelector('.portfolio__info-inner')
            const content = block.querySelector('.portfolio__info-content')

            inner.style.width = `${inner.getBoundingClientRect().width}px`
            block.style.width = 0
            
            item.addEventListener('mouseenter', () => {
                showInfo(block, inner, content)
            })

            item.addEventListener('mouseleave', () => {
                hideInfo(block, content)
            })
        })

        function showInfo(block, inner, content) {
            if (window.innerWidth < 1200) return
            const width = inner.getBoundingClientRect().width
            const height = inner.getBoundingClientRect().height

            content.style.opacity = 1
            inner.style.width = `${width}px`
            block.style.width = `${width}px`
            block.style.maxHeight = `${height}px`
        }

        function hideInfo(block, content) {
            content.style.opacity = 0
            block.style.maxHeight = 0
            block.style.width = 0
        }
    }()

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
            setHeightSlider(swiper.slides)
        })

        slider.on('reachBeginning', (swiper) => {
            if (swiper.activeIndex === 0) swiper.setTranslate(0)
        })
        
        slider.on('slideChange', (swiper) => {
            if (swiper.activeIndex === 0) swiper.setTranslate(0)
        })

        slider.init()

        window.addEventListener('load', () => {
            setTimeout(() => {
                setHeightSlider(slider.slides)
            }, 1000)
        })

        function setHeightSlider(slides) {
            let result = 0

            slides.forEach(slide => {
                const height = Math.round(slide.getBoundingClientRect().height)
                if (height > result) result = height
            })

            slider.el.style.height = `${result}px`
        }
    }()

    // Слайдер моделей сотрудничества
    +function sliderCooperation() {
        if (!document.querySelector('.cooperation__slider .swiper')) return

        const block = document.querySelector('.cooperation__slider .swiper')
        const slider = new Swiper(block, {
            modules: [Navigation, Pagination],
            init: false,
            spaceBetween: 30,
            slidesPerView: 'auto',
            navigation: {
                prevEl: '.cooperation__prev',
                nextEl: '.cooperation__next'
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            }
        })

        slider.on('afterInit', (swiper) => {
            if (swiper.activeIndex === 0) swiper.setTranslate(0)
            setHeightSlider(swiper.slides)
        })

        slider.on('reachBeginning', (swiper) => {
            if (swiper.activeIndex === 0) swiper.setTranslate(0)
        })
        
        slider.on('slideChange', (swiper) => {
            if (swiper.activeIndex === 0) swiper.setTranslate(0)
        })

        slider.init()

        window.addEventListener('load', () => {
            setTimeout(() => {
                setHeightSlider(slider.slides)
            }, 1000)
        })

        function setHeightSlider(slides) {
            let result = 0

            slides.forEach(slide => {
                const height = Math.round(slide.getBoundingClientRect().height)
                if (height > result) result = height
            })

            slider.el.style.height = `${result}px`
        }
    }()

    // Отзыв
    +function modalReviews() {
        if (!document.querySelector('#show-print') || !document.querySelector('[data-print]')) return

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
            modal.classList.remove('--show')
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

    // Ширина бэкграундов карточек блога на главной
    +function setWidthBlogBackgrounds() {
        if (!document.querySelector('.blog__item') && 
            document.querySelectorAll('.blog__item').length !== 3) return

        let screen = window.innerWidth
        
        const section = document.querySelector('.blog .container')
        let sectionWidth = section.getBoundingClientRect().width

        const items = [...section.querySelectorAll('.blog__item')]
        let widthCenterItem = Math.ceil(items[1].getBoundingClientRect().width + 1)
        let widthItem = Math.ceil((sectionWidth - widthCenterItem) / 2)

        setWidth()

        window.addEventListener('resize', () => {
            screen = window.innerWidth

            sectionWidth = section.getBoundingClientRect().width
            widthCenterItem = Math.ceil(items[1].getBoundingClientRect().width + 1)
            widthItem = Math.ceil((sectionWidth - widthCenterItem) / 2)

            setWidth()
        })

        function setWidth() {
            items.forEach((item, index) => {
                const bg = item.querySelector('.blog__bg')

                if (screen >= 768) {
                    bg.style.width = `${widthItem}px`
                    if (index == 1) bg.style.width = `${widthCenterItem}px`
                } else {
                    bg.style.width = '100%'
                }
            })
        }
    }()

    // Высота первой картинки в секции блога на мобильных
    +function blogFirstImageMobileHeight() {
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
                image.style.height = 'unset'
            }
        }
    }()

    // Затемнение блока услуг
    +function sectionToning() {
        if (!document.querySelector('#toning')) return
        const el = document.querySelector('#toning')
        
        function tonning(scroll) {
            const screenHeight = window.innerHeight
            const top = el.getBoundingClientRect().top
        
            // Высота секции минус 40%
            const height = el.getBoundingClientRect().height * 0.4
            // Когда экран проскролен до начала секции и еще на 10% ее высоты вниз
            let startPosition = (scroll + top - screenHeight) * 1.1
            let endPosition = startPosition + height
            let progress = (scroll - startPosition) / (endPosition - startPosition)
        
            if (scroll < startPosition) {
                el.style.opacity = `0`
            } else if (scroll < endPosition && progress > 0 && progress < 1) {
                el.style.opacity = `${progress / 2}`
            } else if (scroll > endPosition) {
                el.style.opacity = `0.5`
            }
        }

        window.addEventListener('scroll', () => {
            let scroll = window.pageYOffset
            tonning(scroll)
        })
    }()

    // Анимация по скроллу
    +function scrollAnimation() {
        if (!document.querySelector('.prices')) return

        const screenHeight = window.innerHeight
        const section = document.querySelector('.prices')
        const values = [...section.querySelectorAll('.prices__value')]

        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset
            const top = section.getBoundingClientRect().top
            const height = section.getBoundingClientRect().height

            const params = {
                pixelHeight: 500, // Когда проскролено n пикселей от верхней границы блока (500px)
                screenHeight: 0.6, // Когда проскролено n % от высоты экрана после блока (40%)
                blockHeight: height * 2.5 // Когда проскролено n от высоты анимируемого блока (2.5 раза больше высоты блока)
            }

            let positionPixel = scroll + top - (screenHeight - params.pixelHeight);
            if (params.pixelHeight !== null && positionPixel < scroll) {
                setValues()
            }
    
            let positionBlock = scroll + top - (screenHeight - params.blockHeight);
            if (params.blockHeight !== null && positionBlock < scroll) {
                setValues()
            }
    
            let positionScreen = scroll + top - (screenHeight * params.screenHeight);
            if (params.screenHeight !== null && positionScreen < scroll) {
                setValues()
            }
        })

        function setValues() {
            let start = 100

            values.forEach((value, index) => {
                let timeout = start * index
                let move = value.dataset.move
                let size = value.dataset.size

                value.style.bottom = move + '%'

                setTimeout(() => {
                    value.style.opacity = '1';
                    value.style.height = size + 'px';
                }, timeout)
            })
        }

        function resetValues() {
            values.forEach(value => {
              value.style.bottom = 0
              value.style.height = 0
              value.style.opacity = 0
            })
        }
    }()
})
