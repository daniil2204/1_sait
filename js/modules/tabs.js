function tabs (tabsSelector , tabsContentSelector , tabsParentSelector , activeClass) {
    
    
    let tabsContent = document.querySelectorAll(tabsContentSelector);
    let tabs = document.querySelectorAll(tabsSelector);
    let tabsParent = document.querySelector(tabsParentSelector);

    const hideTabsContent = function(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show' , 'fade');
        });
        tabs.forEach(item =>{
            item.classList.remove(activeClass)
        });
    };

    const showTabsContent = function(i = 0){
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show' , 'fade');
        tabs[i].classList.add(activeClass);
    }
    
    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click' , function(event){
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item , i)=>{
                if (target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        };
    });
}

export default tabs;