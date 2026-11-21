const form = document.querySelector('.form'),
    orderLog = document.querySelector('.order-log');


const addOrderRow = (drinkName) => {
    const item = document.createElement('li');
    item.classList.add('row-pending');
    item.textContent = `⏳ ${drinkName} · у роботі…`;
    return item;
}

const makeOrder = (delay, shouldResolve) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(shouldResolve){
                resolve(delay);
            } else{
                reject(delay);
            }
        }, delay);
    }) 
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const drink = data.get('drink');
    const state = data.get('state');
    const delay = PREP_TIME[drink];
    const shouldResolve = (state === "fulfilled");
    const row = orderLog.appendChild(addOrderRow(drink));
    makeOrder(delay, shouldResolve)
        .then((delay) => { row.classList.replace('row-pending', 'row-ok'); row.textContent = `✅ ${drink} · готове · ${delay}ms ` })
        .catch((delay) => { row.classList.replace('row-pending','row-err'); row.textContent = `❌ ${drink} · скасовано · ${delay}ms ` })
        .finally(() => { row.textContent += new Date().toLocaleTimeString("uk-UA") });
        
})


// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
//   import { something } from './something.js';
import { PREP_TIME } from './js/menu.js';
// console.log('Шаблон готовий. Можна писати код 🚀');
