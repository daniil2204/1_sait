function calc(){
    const result = document.querySelector('.calculating__result span');
    let number_calories;
    let height, weight, age , ratio , sex;
    
    
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex' , 'female')
    }
    
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio' , 1.375)
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


    const initLocalStorage = (selector , activeClass )=>{
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
    }

    initLocalStorage('#gender div' , 'calculating__choose-item_active');
    initLocalStorage('.calculating__choose_big div' , 'calculating__choose-item_active');
    if (localStorage.getItem('height')) {
        
    }
    const initInput = (selector)=>{
        const inputs = document.querySelectorAll(selector);
        inputs.forEach(item => {
            if (item.getAttribute('id') === 'height') {
                item.value = localStorage.getItem('height')
            }
            if (item.getAttribute('id') === 'weight') {
                item.value = localStorage.getItem('weight')
            }
            if (item.getAttribute('id') === 'age') {
                item.value = localStorage.getItem('age')
            }
        })
    }

    initInput('.calc__input');

    const calcTotal = ()=>{
        if (!height || !sex || !weight || !age || !ratio) {
            return;
        }

        if (sex === 'female') {
            number_calories = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            if (number_calories < 0) {
                result.textContent = "Что-то введено не верно";
            }else{
                result.textContent = number_calories;
            }     
        }else{
            number_calories = Math.round((88.36 + (13.4 * weight) + (4.8 *  height) - (5.7 * age)) * ratio);
            if (number_calories < 0) {
                result.textContent = "Что-то введено не верно";
            }else{
                result.textContent = number_calories;
            }  
        }
    }

    calcTotal();

    const getStaticInfo = (selector , activeClass) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            item.addEventListener('click' , (e)=>{
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio' , ratio);
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex' , sex)
                }
    
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                })
                e.target.classList.add(activeClass);
                calcTotal();
            })
        })
    }
    getStaticInfo('#gender div' , 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div' , 'calculating__choose-item_active');

    const getInputValue = (selector)=>{
        const input = document.querySelector(selector);
        input.addEventListener('input' , ()=>{
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            }else{
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    localStorage.setItem('height' , height);
                    break;
                case 'weight':
                    weight = +input.value;
                    localStorage.setItem('weight' , weight);
                    break;
                case 'age':
                    age = +input.value
                    localStorage.setItem('age' , age)
                    break;
            }
            calcTotal();
        });
    }
    getInputValue('#height')
    getInputValue('#age')
    getInputValue('#weight')
}

export default calc;