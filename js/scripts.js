// Seleção de Elementos

const generatePasswordButton = document.querySelector("#generate-password");
const generatePasswordElement = document.querySelector("#generated-password");

// Novas Funcionalidades V2

const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lenghtInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")



// Funções

const getLetterLowerCase = () => {

    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {

    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    const symbols = "(){}[]=<>/,.@#$%*&=+-";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatedPassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    // Segunda versão
    let password = "";
    const passowrdLength = +lenghtInput.value;

    const generators = [];
    if (lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }
    if (numbersInput.checked) {
        generators.push(getNumber)
    }
    if (symbolsInput.checked) {
        generators.push(getSymbol)
    }
    console.log(generators.length)
    if (generators.length === 0) {
        return "";
    }


    for (i = 0; i < passowrdLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();
            password += randomValue;
        })
    }
    password = password.slice(0, passowrdLength);
    generatePasswordElement.style.display = "block"
    generatePasswordElement.querySelector("h4").innerText = password


};
// Eventos

generatePasswordButton.addEventListener("click", () => {

    generatedPassword(getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol);
});

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide")
})

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault()

    const password = generatePasswordElement.querySelector("h4").innerText;


    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada com sucesso!";

        setTimeout(()=>{
            copyPasswordButton.innerText = "Copiar"
        },1000)
    })
});