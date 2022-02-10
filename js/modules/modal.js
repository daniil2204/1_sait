const showModal = function(modalSelector , timerModal){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    document.body.classList.add('hidden');
    if (modal.classList.contains('show')) {
        if (timerModal) {
            clearTimeout(timerModal);
        }
    }
}

const closeModal = function(modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.classList.toggle('show');
    document.body.classList.remove('hidden');
};

function modal(triggerSelector , modalSelector , timerModal){
    const modalTrigger = document.querySelectorAll(triggerSelector)
    const modal = document.querySelector(modalSelector);
    //const modalClose = document.querySelector('[data-modal-close]');

    modalTrigger.forEach(item =>{
        item.addEventListener('click' , () => showModal(modalSelector , timerModal));
    })


    modal.addEventListener('click' , (e)=>{
        if (e.target ===  modal || e.target.getAttribute('data-modal-close') == '') {
            closeModal(modalSelector);
        };
    });
    document.addEventListener('keydown' , (e)=>{
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    })

    const showScrollModal = function(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector , timerModal);
            window.removeEventListener('scroll' , showScrollModal);
        }
    }

    const scrollModal = window.addEventListener('scroll',showScrollModal);
}

export default modal;
export {closeModal , showModal};