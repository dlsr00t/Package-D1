/**
 * Preciso capturar o email e senha que o usuario digitou quando 
 * eu clicar no botão entrar.
 * 
 * Verificar se o email ou a senha estão errados.
 * 
 * Se tiver correto, entrar na tela principal
 * Se tiver errado, mandar mensagem e continuar na tela de login
 * 
 */

const EMAIL = "admin@admin.com";
const SENHA = '123456';

console.log("S={Douglas}")

let campoEmail = document.querySelector("#email");
let campoSenha = document.querySelector('#senha');
let btnEntrar = document.getElementById(`btn-entrar`);

btnEntrar.addEventListener("click", () => {
    // Capiturando os valores digitados pelo usuario
    let emailDigitado = campoEmail.value.toLowerCase();
    let senhaDigitada = campoSenha.value;

    autenticar(emailDigitado, senhaDigitada);
});


function autenticar (email, senha){

    //1° Preciso saber qual a URL da API
    const URL = 'http://localhost:3400/login';

    //2° Criar um request para a api
    fetch(URL, {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, senha})
    })
    //3° Se der certo, direcionar para a tela de home
    .then(response => response = response.json())
    .then(response => {
        console.log(response)

        if(!!response.mensagem){
            alert(response.mensagem);
            return;
        }

        // Mostrar loading
        mostrarLoading();

        // Aqui salvo o token e o usuario na storage
        salvarToken(response.token);
        salvarUsuario(response.usuario);

        setTimeout(() => {
            window.open('controle-clientes.html', '_self');
        }, 5000);
        
    })
    //4° Se der errado, mandar mensagem para o usuario.
    .catch(erro => {
        console.log(erro)
    })    
}

function mostrarLoading(){
    // Tenho que capturar o campo de loading e mostrar ele
    const divLoading = document.getElementById("loading");
    divLoading.style.display = "block";
    document.body.style.backgroundImage = 'none';
    // pegar o emento caixa de login e esconder ela.
    const divBoxLogin = document.querySelector('div.overall');
    divBoxLogin.style.display = "none";
}

const larguraTela = screen.width;
const alturaTela = screen.height;
let iconeT = document.getElementById("trancado");
let iconeA = document.getElementById("aberto");
let ver = document.getElementById("senha");
function mostrar(){
    iconeT.style.display = "none";
    ver.type = "text";
}

function esconder(){
    iconeT.style.display = "block";
    ver.type = "password"
}

console.log(`Resolução da tela: ${larguraTela} x ${alturaTela}`);



iconeA.addEventListener("click", esconder);
iconeT.addEventListener("click", mostrar);



