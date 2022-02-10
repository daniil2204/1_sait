import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import form from './modules/form';
import slider from './modules/slider';
import calc from './modules/calc';
import {showModal} from './modules/modal'

window.addEventListener('DOMContentLoaded', function(){   
    
    const timerModal = setTimeout(() => showModal('.modal' , timerModal) , 500000);

    tabs('.tabheader__item' , '.tabcontent' , '.tabheader__items' , 'tabheader__item_active');
    timer('.timer' , '2022-04-11' , '#ending-timer');
    modal('[data-modal]' , '.modal' , timerModal);
    cards();
    form(timerModal , 'form');
    slider({
        container : '.offer__slider',
        slide : '.offer__slide',
        nextArrow : '.offer__slider-next' , 
        prevArrow : '.offer__slider-prev',
        totalCounter : '#total',
        currentCounter : '#current',
        wrapper : '.offer__slider-wrapper', 
        field : '.offer__slider-inner'
    });
    calc();
});