//Instanciação dos elementos html

const darkButton = document.querySelector('.dark-button');
const allOfThem = document.querySelectorAll('.modes');
const icon = document.querySelector('.icon');
const input = document.querySelector('.cpf');
const submit = document.querySelector('.submit');
const container = document.querySelector('.container');

//DARK MODE
darkButton.addEventListener('click', function(e){
    if(e)
        console.log('here')
        if(!darkButton.classList.contains('dark-mode')){
            allOfThem.forEach(element => {
                element.classList.add('dark-mode');
            }); 
            darkButton.classList.add('dark-mode')
            darkButton.innerHTML = `<div><i class="fa fa-sun"></i></div>`
        }else{
            darkButton.innerHTML = `<div><i class="fa fa-moon"></i></div>`
            allOfThem.forEach(element => {
                element.classList.remove('dark-mode');
            }); 
        }
})
function check(flag){
    if(!flag){
        icon.innerHTML = '<i class="wrong fa fa-times-circle"></i>';
    }else{
        icon.innerHTML = '<i class="check fa fa-check-circle"></i>';
    }
}

//VALIDADOR DE CPF 
function CPF(cpf){
    this.cpf = Array.from(cpf);
}

CPF.prototype.validarCPF =  function(){
    if(this.cpf.length !== 11){
        return false;
    }

    let digito;

    digito = this.validarDig();
    
    if(digito != this.cpf[9]){
        return false
    }

    digito = this.validarDig(digito);

    if(digito != this.cpf[10]){
        return false
    }
    
    return true;
}

CPF.prototype.validarDig = function(dig){
    let digito;
    let j = 0, acumulador = 0;

    if(!dig){
        for(i = 10; i >= 2; i-- ){
            console.log(`${acumulador} += ${this.cpf[j]} * ${i}`);
            acumulador += (this.cpf[j]*i);
            j++;
        }
        digito = ((acumulador*10)%11);
        console.log(`digito1: ${digito}`);
    }else{
        this.cpf[9] = dig;
        for(i = 11; i >= 2; i-- ){
            console.log(`${acumulador} += ${this.cpf[j]} * ${i}`);
            acumulador += (this.cpf[j]*i);
            j++;
        }
        digito = ((acumulador*10)%11);
        console.log(`digito2: ${digito}`);
    }

    return digito;
}

submit.addEventListener('click', function(e){
    if(e){
        const cpf = new CPF(input.value);
        if(cpf.cpf.length > 0){
            check(cpf.validarCPF());
        }else{
            icon.innerHTML = '';
        }
    }
})

container.addEventListener('keypress', function(e){
    if(e.code == 'Enter'){
        const cpf = new CPF(input.value);
        if(cpf.cpf.length > 0){
            check(cpf.validarCPF());
        }else{
            icon.innerHTML = '';
        }
    }
})
