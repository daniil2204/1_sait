function slider({container , slide , nextArrow , prevArrow , totalCounter , currentCounter , wrapper , field}){
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
    }else{
        total.textContent = `0${slides.length}`
    }
    

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(item => {
        item.style.width = width;
    })

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          dots_arr = []; 
    
    dots.classList.add('carousel-indicators');
    
    slider.append(dots);
    

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to' , i + 1);
        dot.classList.add('dot');
        dots_arr.push(dot);
        dots.append(dot);     
        if( i === 0){
            dot.classList.add('dot__active');
        }   
    }

    
    
    next.addEventListener('click' , ()=>{
        slideCounter += 1;
        renderCurrent(slideCounter);
        if (offset == width * (slides.length - 1)) {
            offset = 0;
        }else{
            offset += width;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    })
    
    
    
    prev.addEventListener('click' , ()=>{
        slideCounter -= 1;
        renderCurrent(slideCounter);
        if (offset == 0) {
            offset += width * (slides.length - 1)
        }else{
            offset -= width;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    })
    
    dots_arr.forEach(item => {
        item.addEventListener('click' , (e)=>{
            const toSLide = +e.target.getAttribute('data-slide-to');
            slideCounter = toSLide;
            offset = width * (toSLide - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            renderCurrent()
        })
    })
    
    
    const renderCurrent = ()=>{
        if (slideCounter - 1 === slides.length) {
            slideCounter = 1;
        }
        if (slideCounter < 1) {
            slideCounter = slides.length;
        }
        if (slideCounter > 9) {
            current.textContent = slideCounter
        }else{
            current.textContent = `0${slideCounter}`;
        }
        dots_arr.forEach(item => item.classList.remove('dot__active'))
        dots_arr[slideCounter - 1].classList.add('dot__active')
    }
    
    
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

export default slider;