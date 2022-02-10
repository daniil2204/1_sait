function timer(selector , deadline , endTimeSelector){
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime)- new Date(),
              d = Math.floor(t / (1000 * 60 * 60 * 24)),
              h = Math.floor(t / (1000 * 60 * 60) % 24),
              m = Math.floor(t / (1000 * 60) % 60),
              s = Math.floor(t / (1000) % 60);
            
              return {
                  'total':t,
                  'days':d,
                  'hours':h,
                  'minutes':m,
                  'seconds':s
              }
    }

    function setClock(selector , endtime){
        const timer = document.querySelector(selector),
              days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateClock , 1000);

              updateClock();
            function updateClock(){
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


    function getZero(num){
        if (num >= 0 && num < 10) {
            return `0${num}`
        }else{
            return num;
        }
    }
    setClock(selector , deadline)

    const ending = document.querySelector(endTimeSelector);

    const endingDays = deadline.substr(8)

    const endingMonth = deadline.substr(5 , 2);

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
            console.log("GG")
            break;
    }
    
}

export default timer;