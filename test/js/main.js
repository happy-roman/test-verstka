'use strict'

/**
 *
 * Плавное скрытие Header
 *
 *
 **/

let header = document.querySelector('.header'),
    scrollPrev = 0
window.addEventListener('scroll', ()=>{
    let scrolled = window.scrollY    // не удалось запустить через scrollTop
    if( scrolled > 30){
        header.style.background = 'rgb( 235, 238, 245, 0.5)'
    }
    if ( scrolled > 100 && scrolled > scrollPrev ) {
        header.classList.add('header_out')
    } else {
        header.classList.remove('header_out')
    }
    scrollPrev = scrolled
})

/**
 *
 * отклики  кнопок
 *
 */

//blocks
let callBackForm = document.querySelector('.callback-block')
let closeButtonSanded = document.querySelector('.callback__close_sanded')
let confirmSandButton = document.querySelector('.callback__button-sanded')
let popUpSound = document.querySelector('.pop_up_sound')

//buttons
let callBackButton = document.querySelector('.slider__block_button-callback')
let closeButton = document.querySelector('.callback__close')
let sendCallbackForm = document.querySelector('.callback__input-button')
let confirmSend = document.querySelector('.callback-block__sanded')
let popUpSoundClick = document
let popUpSoundOpen1 = document.querySelector('.img__block_sound-right')
let popUpSoundOpen2 = document.querySelector('.img__block_sound-left')

//actions
callBackButton.addEventListener('click', ()=>openPopUp(callBackForm))
closeButton.addEventListener('click', ()=>closePopUp(callBackForm))
closeButtonSanded.addEventListener('click', ()=>closePopUp(confirmSend))
sendCallbackForm.addEventListener('click', ()=>sendCallback(callBackForm, confirmSend))
confirmSandButton.addEventListener('click', ()=>closePopUp(confirmSend))

popUpSoundClick.addEventListener('click',(event)=>{
    let element = event.target
    if ( element === popUpSoundOpen1 || element === popUpSoundOpen2 ){
        openPopUp( popUpSound, 'flex' )
    }else{
        closePopUp(popUpSound)
    }
})

//тут будет функция отправки формы для обратного звонка

function openPopUp( block, display = 'block') {
    block.style.display = display
}
function closePopUp( block ) {
    block.style.display = 'none'
}
function sendCallback( closeBlock, openBlock ) {
    closePopUp( closeBlock )
    //здесь вызовется функция отправки формы, в случае успеха вызовется следущая функция или сообщение об ошибке
    openPopUp( openBlock )
}


/**
 *
 * Slider (carousel)
 *
 */

const slides = document.querySelectorAll('#slides .slide')
const slider = document.querySelector('.slider')
const sliderBg = document.querySelector('.slider__bg')
const sliderBgImg = document.querySelector('.slider__bg-img')
let currentSlide = 0

const carouselItems = document.querySelectorAll('.slider_show-item')
const carousel = document.querySelector('.slider_show')

function nextSlide() {
    goToSlide(currentSlide+1)

}
function previousSlide() {
    goToSlide(currentSlide-1)
}

function changBg(n) {
    let img = ''
    //добавляем 1 чтобы можно было нумеровать изображения с 1 (1,2,3...)
    //выбираем картинку в зависимости от разрешения экрана
    if ( document.body.clientWidth < 500 ){
        img = "./img/slider_bg-mini" + (n+1) + ".png"
    }else {
        img = "./img/slider_bg" + (n+1) + ".png"
    }

    sliderBgImg.setAttribute('src', img)
    sliderBg.style.opacity = 0.5
    setTimeout(()=>{sliderBg.style.opacity = 1},500)
}

function changCarousel(currentSlide) {
    carousel.style = "transform: translateX("+ (currentSlide * (-400)) + 'px);'
    for ( let key in carouselItems ){
        if ( key > currentSlide+1 || key < currentSlide ){
            carouselItems[key].style.opacity = 0
        } else if ( key > currentSlide  ){
            carouselItems[key].style.opacity = '30%'
        } else if ( key == currentSlide){
            carouselItems[key].style.opacity = '100%'
        }
    }
}

function goToSlide(n) {
    slides[currentSlide].className = 'slide'
    carouselItems[currentSlide].className = 'slider_show-item'
    currentSlide = (n+slides.length)%slides.length
    slides[currentSlide].className = 'slider__text slide showing'
    carouselItems[currentSlide].className = 'slider_show-item carouse-active'

    //передаем в функцию номер картинки-1 (0,1,2,3...)
    changBg(currentSlide)

    //передаем количество слайдов для сдвига карусели

    changCarousel(currentSlide)

}

const previous = document.getElementById('previous')
let next = document.getElementById('next')

next.onclick = ()=> {
    nextSlide()
}
previous.onclick = ()=> {
    previousSlide()
}

//можно доработать автопроигрывание
setInterval(nextSlide, 5000)


/**
 *
 * mobile menu
 *
 */

const menuButton = document.querySelector('#checkbox2')
const menu = document.querySelector('.mobile-nav')
menuButton.addEventListener('click', ()=>{
    menu.style.display = (menu.style.display === 'none') ? 'block' : 'none'

})

