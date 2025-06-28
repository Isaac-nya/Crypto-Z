const dropList = document.querySelectorAll("select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select");


for (let i=0; i <dropList.length; i++) {
    for(let currency_code in country_list){
        // selecting USD by default as FROM currency and AFN as TO currenecy
        let selected = i === 0 ? currency_code === "USD" ? "selected" : "" : currency_code == "AFN" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", (e) => {
        loadFlag(e.target);
        getExchangeRate();
    });
}

function loadFlag(element){
    for(let code in country_list){
        if(code === element.value){//if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", ()=>{
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

document
  .querySelector(".from input")
  .addEventListener("input", getExchangeRate);



function getExchangeRate(){
    const amount = document.querySelector(".from input");
    const toInput = document.querySelector(".to input");
    let amountVal = amount.value;
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if(amountVal === "" || amountVal === "0"){
        amount.value = "1";
        amountVal = 1;
    }

    let url = `https://v6.exchangerate-api.com/v6/630d256496dc7deae1407d9f/latest/${fromCurrency.value}`;
    //fetching api response and returning it with parsing into js obj and in another then method

    fetch(url).then((response) => response.json()).then((result) =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        const convertedVal = (amountVal * exchangeRate).toFixed(3);
        toInput.value = convertedVal;
    }).catch(() => {
        toInput.value = "Error";
    });
}