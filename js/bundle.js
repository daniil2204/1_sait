/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  const result = document.querySelector('.calculating__result span');
  let number_calories;
  let height, weight, age, ratio, sex;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  if (localStorage.getItem('height')) {
    height = localStorage.getItem('height');
  }

  if (localStorage.getItem('weight')) {
    weight = localStorage.getItem('weight');
  }

  if (localStorage.getItem('age')) {
    age = localStorage.getItem('age');
  }

  const initLocalStorage = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(item => {
      item.classList.remove(activeClass);

      if (localStorage.getItem('sex') === item.getAttribute('id')) {
        item.classList.add(activeClass);
      }

      if (localStorage.getItem('ratio') === item.getAttribute('data-ratio')) {
        item.classList.add(activeClass);
      }
    });
  };

  initLocalStorage('#gender div', 'calculating__choose-item_active');
  initLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');

  if (localStorage.getItem('height')) {}

  const initInput = selector => {
    const inputs = document.querySelectorAll(selector);
    inputs.forEach(item => {
      if (item.getAttribute('id') === 'height') {
        item.value = localStorage.getItem('height');
      }

      if (item.getAttribute('id') === 'weight') {
        item.value = localStorage.getItem('weight');
      }

      if (item.getAttribute('id') === 'age') {
        item.value = localStorage.getItem('age');
      }
    });
  };

  initInput('.calc__input');

  const calcTotal = () => {
    if (!height || !sex || !weight || !age || !ratio) {
      return;
    }

    if (sex === 'female') {
      number_calories = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);

      if (number_calories < 0) {
        result.textContent = "Что-то введено не верно";
      } else {
        result.textContent = number_calories;
      }
    } else {
      number_calories = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);

      if (number_calories < 0) {
        result.textContent = "Что-то введено не верно";
      } else {
        result.textContent = number_calories;
      }
    }
  };

  calcTotal();

  const getStaticInfo = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        }

        elements.forEach(item => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  };

  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

  const getInputValue = selector => {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          localStorage.setItem('height', height);
          break;

        case 'weight':
          weight = +input.value;
          localStorage.setItem('weight', weight);
          break;

        case 'age':
          age = +input.value;
          localStorage.setItem('age', age);
          break;
      }

      calcTotal();
    });
  };

  getInputValue('#height');
  getInputValue('#age');
  getInputValue('#weight');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  class MenuCard {
    constructor(src, alt, title, text, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.text = text;
      this.price = price;
      this.transfer = 28;
      this.changeToHrivna();
    }

    changeToHrivna() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `<img src=${this.src} alt=${this.alt}>
                                    <h3 class="menu__item-subtitle">${this.title}</h3>
                                    <div class="menu__item-descr">${this.text}</div>
                                    <div class="menu__item-divider"></div>
                                    <div class="menu__item-price">
                                        <div class="menu__item-cost">Цена: </div>
                                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                    </div>`;
      this.parent.append(element);
    }

  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
  /*getResource('http://localhost:3000/menu')
      .then(data => createCard(data));
  function createCard(data){
      data.forEach(({img , altimg , title , descr , price}) => {
          const elem = document.createElement('div');
          price *= 28;
          elem.classList.add('menu__item');
          elem.innerHTML = `
              <img src=${img} alt=${altimg}>
              <h3 class="menu__item-subtitle">${title}</h3>
              <div class="menu__item-descr">${descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена: </div>
                  <div class="menu__item-total"><span>${price}</span> грн/день</div>
              </div>
              `;
              document.querySelector('.menu .container').append(elem)
      });
  };
  Библиотека axios 
  axios.get('http://localhost:3000/menu')
      .then(obj => {
          obj.data.forEach(({img , altimg , title , descr , price}) => {
              new MenuCard(img , altimg , title , descr , price , '.menu .container').render();
          });
      })*/
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(timerModal, formSelector) {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach(item => {
    bindPostData(item);
  });
  const message = {
    loading: "img/form/spinner.svg",
    load: "Отправлено",
    fail: "ГГ"
  };

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display:block;
                margin:0 auto;   
            `; //form.append(statusMessage);

      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showThanksModal(message.load);
        statusMessage.remove();
      }).catch(() => {
        console.log("Ошибка");
        showThanksModal(message.fail);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', timerModal);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class = "modal__close" data-modal-close>×</div>
                    <div class = "modal__title">${message}</div>
                </div>
            `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 5000);
  }

  fetch('http://localhost:3000/menu').then(data => data.json()); //.then(result => console.log(result))
}

/* harmony default export */ __webpack_exports__["default"] = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "showModal": function() { return /* binding */ showModal; }
/* harmony export */ });
const showModal = function (modalSelector, timerModal) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  document.body.classList.add('hidden');

  if (modal.classList.contains('show')) {
    if (timerModal) {
      clearTimeout(timerModal);
    }
  }
};

const closeModal = function (modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.toggle('show');
  document.body.classList.remove('hidden');
};

function modal(triggerSelector, modalSelector, timerModal) {
  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector); //const modalClose = document.querySelector('[data-modal-close]');

  modalTrigger.forEach(item => {
    item.addEventListener('click', () => showModal(modalSelector, timerModal));
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-modal-close') == '') {
      closeModal(modalSelector);
    }

    ;
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  const showScrollModal = function () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal(modalSelector, timerModal);
      window.removeEventListener('scroll', showScrollModal);
    }
  };

  const scrollModal = window.addEventListener('scroll', showScrollModal);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
  } = _ref;
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = +window.getComputedStyle(slidesWrapper).width.match(/\d/g).join('');
  let slideCounter = 1,
      offset = 0;

  if (slides.length > 10) {
    total.textContent = slides.length;
  } else {
    total.textContent = `0${slides.length}`;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(item => {
    item.style.width = width;
  });
  slider.style.position = 'relative';
  const dots = document.createElement('ol'),
        dots_arr = [];
  dots.classList.add('carousel-indicators');
  slider.append(dots);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    dots_arr.push(dot);
    dots.append(dot);

    if (i === 0) {
      dot.classList.add('dot__active');
    }
  }

  next.addEventListener('click', () => {
    slideCounter += 1;
    renderCurrent(slideCounter);

    if (offset == width * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += width;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
  });
  prev.addEventListener('click', () => {
    slideCounter -= 1;
    renderCurrent(slideCounter);

    if (offset == 0) {
      offset += width * (slides.length - 1);
    } else {
      offset -= width;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
  });
  dots_arr.forEach(item => {
    item.addEventListener('click', e => {
      const toSLide = +e.target.getAttribute('data-slide-to');
      slideCounter = toSLide;
      offset = width * (toSLide - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      renderCurrent();
    });
  });

  const renderCurrent = () => {
    if (slideCounter - 1 === slides.length) {
      slideCounter = 1;
    }

    if (slideCounter < 1) {
      slideCounter = slides.length;
    }

    if (slideCounter > 9) {
      current.textContent = slideCounter;
    } else {
      current.textContent = `0${slideCounter}`;
    }

    dots_arr.forEach(item => item.classList.remove('dot__active'));
    dots_arr[slideCounter - 1].classList.add('dot__active');
  };

  renderCurrent();
  /*function showSlide(){
      if (slideCounter - 1 === slides.length) {
          slideCounter = 1;
      }
      if (slideCounter < 1) {
          slideCounter = 4;
      }
      slides.forEach(item => {
          item.classList.add('hide')
      })
      slides[slideCounter - 1].classList.remove('hide')
      if (slides.length < 9) {
          total.textContent = `0${slides.length}`
          current.textContent = `0${slideCounter}`
      }else{
          total.textContent = slides.length;
          current.textContent = slideCounter;
      }
    };
  next.addEventListener('click' , ()=>{
      slideCounter += 1;
      showSlide(slideCounter);
  });
  prev.addEventListener('click' , ()=>{
      slideCounter -= 1;
      showSlide(slideCounter);
  })
  showSlide(slideCounter);*/
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  let tabsContent = document.querySelectorAll(tabsContentSelector);
  let tabs = document.querySelectorAll(tabsSelector);
  let tabsParent = document.querySelector(tabsParentSelector);

  const hideTabsContent = function () {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  };

  const showTabsContent = function () {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add(activeClass);
  };

  hideTabsContent();
  showTabsContent();
  tabsParent.addEventListener('click', function (event) {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }

    ;
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(selector, deadline, endTimeSelector) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - new Date(),
          d = Math.floor(t / (1000 * 60 * 60 * 24)),
          h = Math.floor(t / (1000 * 60 * 60) % 24),
          m = Math.floor(t / (1000 * 60) % 60),
          s = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': d,
      'hours': h,
      'minutes': m,
      'seconds': s
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  setClock(selector, deadline);
  const ending = document.querySelector(endTimeSelector);
  const endingDays = deadline.substr(8);
  const endingMonth = deadline.substr(5, 2);

  switch (endingMonth) {
    case '01':
      ending.textContent = `${endingDays} января`;
      break;

    case '02':
      ending.textContent = `${endingDays} февраля`;
      break;

    case '03':
      ending.textContent = `${endingDays} марта`;
      break;

    case '04':
      ending.textContent = `${endingDays} апреля`;
      break;

    case '05':
      ending.textContent = `${endingDays} мая`;
      break;

    case '06':
      ending.textContent = `${endingDays} июня`;
      break;

    case '07':
      ending.textContent = `${endingDays} июля`;
      break;

    case '08':
      ending.textContent = `${endingDays} августа`;
      break;

    case '09':
      ending.textContent = `${endingDays} сентября`;
      break;

    case '10':
      ending.textContent = `${endingDays} октября`;
      break;

    case '11':
      ending.textContent = `${endingDays} ноября`;
      break;

    case '12':
      ending.textContent = `${endingDays} декабря`;
      break;

    default:
      console.log("GG");
      break;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": function() { return /* binding */ postData; },
/* harmony export */   "getResource": function() { return /* binding */ getResource; }
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: data
  });
  return await res.json();
};

const getResource = async (url, data) => {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Fetch не сработал по адресу ${url} , состояние : ${res.status}`);
  }

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");








window.addEventListener('DOMContentLoaded', function () {
  const timerModal = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.showModal)('.modal', timerModal), 500000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2022-04-11', '#ending-timer');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', timerModal);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])(timerModal, 'form');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map