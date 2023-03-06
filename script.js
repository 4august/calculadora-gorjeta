//valor da conta
const bill =  document.querySelector("#bill");

// pega todas as opções de gorjeta
const tipsOptions = document.querySelectorAll(".item");
const allInputs = document.querySelectorAll(".input")

//numero de pessoas
const numPeople = document.querySelector("#numPeople");

//output dos valores da calculadora
let tipValue = document.querySelector("#tipAmount");
let amountPerPerson = document.querySelector("#totalPerson");

//armazena a gorjeta atual
let actualTipPercent = 0;

const spanError = document.querySelector(".span-error")
const resetButton = document.querySelector(".reset")

function calcValues(tipPercent) {
    let biilValue = parseFloat(bill.value);
    let nPeople = parseFloat(numPeople.value);
    actualTipPercent = parseFloat(tipPercent);

    if (isNaN(biilValue) || isNaN(actualTipPercent) || isNaN(nPeople)) {
        tipValue.innerHTML = "$0.00"
        amountPerPerson.innerHTML = "$0.00"
    }else{
        tipValue.innerHTML = ((tipPercent / 100 * biilValue) / nPeople).toFixed(2);
        amountPerPerson.innerHTML = ((parseFloat(tipValue.innerHTML) + biilValue) / nPeople).toFixed(2);    
        
        actualTipPercent = tipPercent
    
        tipValue.innerHTML = "$" + tipValue.innerHTML;
        amountPerPerson.innerHTML = "$" + amountPerPerson.innerHTML;
    }
}

//dispara o calculo pelo input bill
bill.addEventListener('change', () => calcValues(parseFloat(actualTipPercent)));

tipsOptions.forEach((option) => {
    option.addEventListener('click', () =>{
        calcValues(parseFloat(option.value))
    })
})
    
//dispara o calculo pelo input de numero de pessoas
numPeople.addEventListener('change', () => {
    if (numPeople.value <= 0) {
        document.getElementById("numPeople").classList.add("error")
        document.querySelector(".span-error").style.display = "block"
    }else{
        document.getElementById("numPeople").classList.remove("error")
        document.querySelector(".span-error").style.display = "none"

        calcValues(actualTipPercent)
    }  
});

allInputs.forEach((input) => {
    input.addEventListener('change', () => {
        if (input.value == 0 || isNaN(input.value) || input.value == "") 
            resetButton.setAttribute('disabled', 'disabled');
        else
        resetButton.removeAttribute('disabled')
    })
})
resetButton.addEventListener('click', () => {
    allInputs.forEach((input) => {input.value = ""})
    resetButton.setAttribute('disabled', 'disabled')
})