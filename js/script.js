let textoEncriptar = document.querySelector(".input-texto");
let textoEncriptado = document.querySelector(".output-texto");
let msjInicial = document.querySelector('.msjInicial');
let msjError = document.querySelector('.msjError');
let msjEncriptado = document.querySelector('.msjEncriptado');
let msjDesencriptado = document.querySelector('.msjDesencriptado');
let encriptarButton = document.getElementById("encriptar");
let desencriptarButton = document.getElementById("desencriptar");
let copiarButton = document.getElementById("copiar");
let pegarButton = document.getElementById("pegar");
let areaTexto = document.getElementById('texto');

/* Llaves Desencriptador */
const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

/* Codigo que al escribir en el área de texto, limita los caracteres y largo de las palabras mediante  expresiones regulares y el elemnto .replace, ademas de pasar solo texto en minusculas y bloquear caracteres especiales */
function capturarTexto(){
    let areaTexto = textoEncriptar;
    // ImagenMuneco.style.display = 'none' 
    return areaTexto.value.toLowerCase(); 
}

areaTexto.addEventListener('input', () => {
    let texto = capturarTexto();
    texto = texto.replace(/[^a-z,0-9,.ñ ¿?\n]/gi, '');
    areaTexto.value = texto;
    if (texto.length > 24) {
    const palabras = texto.split(' ');
    const palabrasCortas = palabras.filter(palabra => palabra.length <= 24);
    areaTexto.value = palabrasCortas.join(' ');
    }
}); 

/* Evento al hacer clic en el área de texto */
areaTexto.addEventListener('click', ()=>{
    textoEncriptado.style.backgroundImage = "url('./img/hacker256.png')";
    textoEncriptado.value = '';
    msjInicial.style.display = 'block';
    msjError.style.display = 'none';
    msjEncriptado.style.display = 'none';
    msjDesencriptado.style.display = 'none';
})

/* Función para encriptar un mensaje */
function encriptar(texto){
    if (texto === '') {
        textoEncriptado.style.backgroundImage = "url('./img/advertencia.png')";
        msjInicial.style.display = 'none';
        msjError.style.display = 'block';
        msjEncriptado.style.display = 'none';
        msjDesencriptado.style.display = 'none';
    }
    else{
    for (let i = 0; i < llaves.length; i++)
    if (texto.includes(llaves[i][0])){
        texto = texto.replaceAll(llaves[i][0],llaves[i][1]);
        msjInicial.style.display = 'none';
        msjEncriptado.style.display = 'block';
        textoEncriptado.style.backgroundImage = "none";
    }
    }
    return texto; 
}


/* Función para desencriptar un mensaje */
function desencriptar(texto){
    if (texto === '') {
        textoEncriptado.style.backgroundImage = "url('./img/advertencia.png')";
        msjInicial.style.display = 'none';
        msjError.style.display = 'block';
        msjEncriptado.style.display = 'none';
        msjDesencriptado.style.display = 'none';
    }
    else{
    for (let i = 0; i < llaves.length; i++)
    if (texto.includes(llaves[i][1])){
        texto = texto.replaceAll(llaves[i][1],llaves[i][0]);
        msjInicial.style.display = 'none';
        msjDesencriptado.style.display = 'block';
        textoEncriptado.style.backgroundImage = "none";
    }
    }
    return texto; 
}

/* Función para boton encriptar un mensaje */
function btnEncriptar () {
    const textoSaldia = encriptar(textoEncriptar.value);
    textoEncriptado.value = textoSaldia;
    textoEncriptar.value = "";
}

/* Función para boton desencriptar un mensaje */
function btnDesencriptar () {
    const textoSaldia = desencriptar(textoEncriptar.value);
    textoEncriptado.value = textoSaldia;
    textoEncriptar.value = "";
}

/* Funcion copiar el Resultado */
function copiarTexto() {
    if (textoEncriptado.value != "") {
        let textoCopiar = textoEncriptado.value;
        navigator.clipboard.writeText(textoCopiar).then(() => {
        })
        textoEncriptado.value = "";
        textoEncriptado.style.backgroundImage = "url('./img/hacker256.png')";
        msjInicial.style.display = 'block';
        msjEncriptado.style.display = 'none';
        msjDesencriptado.style.display = 'none';
    }
    
}
    
/* funcion para pegar el texto copiado */
function pegarTextorCopiado(){
    navigator.clipboard.readText()
    .then(textoPegado => {
    areaTexto.value = textoPegado;
    textoEncriptado.style.backgroundImage = "url('./img/hacker256.png')";
    textoEncriptado.value = '';
    msjInicial.style.display = 'block';
    msjError.style.display = 'none';
    msjEncriptado.style.display = 'none';
    msjDesencriptado.style.display = 'none';
}
)} 


/* Llamada de los botones para ejecutar las funciones */
encriptarButton.onclick = btnEncriptar;

desencriptarButton.onclick = btnDesencriptar;

copiarButton.onclick = copiarTexto;

pegarButton.onclick = pegarTextorCopiado;



/*
  ICONO EN LA PESTAÑA DE LA PAGINA
*/