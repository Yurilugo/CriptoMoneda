// Selectors
const coin = document.querySelector('#coin-selec');
const crypto = document.querySelector('#crypto-selec');
const form = document.querySelector('#form');
const infoDiv = document.querySelector('#coin-info');
const monto = document.querySelector('#monto-imput');




// Events

form.addEventListener('submit', async e => {
    e.preventDefault();

    infoDiv.innerHTML = `
        <div class="loader"></div>
    `

    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const montoValue = monto.value;
    const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`;
    const reponse = await (await fetch(URL, { method: 'GET' })).json();
    const price = reponse.DISPLAY[cryptoSelected][coinSelected].PRICE;
    const high = reponse.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
    const low = reponse.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
    const changePCT = reponse.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;


    if (!montoValue) {
        infoDiv.innerHTML = `
        <p> El precio actual es: <span class="coin-value">${price}</span> </p>
        <p> El precio mas alto es: <span class="coin-value">${high}</span> </p>
        <p> El precio mas bajo es: <span class="coin-value">${low}</span> </p>
        <p> Diferencia 24h: <span class="coin-value">${changePCT}%</span> </p>
        `
    } else {
        const priceRaw = reponse.RAW[cryptoSelected][coinSelected].PRICE;
        const result = (montoValue / priceRaw).toFixed(4);
        infoDiv.innerHTML = `
        <p> El precio actual es: <span class="coin-value">${price}</span> </p>
        <p> El precio mas alto es: <span class="coin-value">${high}</span> </p>
        <p> El precio mas bajo es: <span class="coin-value">${low}</span> </p>
        <p> Diferencia 24h: <span class="coin-value">${changePCT}%</span> </p>
        <p> Puedes comprar: <span class="coin-value">${result} ${cryptoSelected}</span></p>
        `
    }



});