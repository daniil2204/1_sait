import { showModal , closeModal } from "./modal";
import {postData} from "../services/services";

function form(timerModal , formSelector){
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item =>{
        bindPostData(item);
    })

    const message = {
        loading:"img/form/spinner.svg",
        load:"Отправлено",
        fail:"ГГ"
    }


    function bindPostData(form) {
        form.addEventListener('submit' , (e)=>{
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin:0 auto;   
            `;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend' , statusMessage);

            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data =>{
                console.log(data);
                showThanksModal(message.load);
                statusMessage.remove(); 
            }).catch(() =>{
                console.log("Ошибка");
                showThanksModal(message.fail)
            }).finally(() =>{  
                form.reset();  
            })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        showModal('.modal' , timerModal);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class = "modal__close" data-modal-close>×</div>
                    <div class = "modal__title">${message}</div>
                </div>
            `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        },5000)
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        //.then(result => console.log(result))

}
export default form;