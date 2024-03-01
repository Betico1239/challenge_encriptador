document.getElementById("encriptar").addEventListener(
    "click",
    () => {
    
    var texto = '';
    texto = document.getElementById("areaTexto").value;

    removePutdHidden(); //Ponemos por defecto en hidden los elementos del aside que no necesitamos

    /*Encriptar el texto captado */
    let textEncripted = encriptarTexto(texto);

    
    document.getElementById("area1").value = textEncripted; /*poner el texto al final*/

    },
    false,
  );


  function encriptarTexto(texto){
    var textoEncriptado = '';
    let i =0;
    let letra ='';
    while(i < texto.length){
        var contenedor = texto.split('');
        letra = contenedor[i];

        let newletra = devolverEncriptado(letra);
        
        removePutdHidden();
        if(newletra == undefined){
          showAlert();
          putHidden();
          break;
        }
        textoEncriptado = textoEncriptado + newletra;


        i++;
    }
    return textoEncriptado;
  }


  function devolverEncriptado(letra){
    let vocales =['a','e','i','o','u'];
    let vowelsEncriptadas = ['ai','enter','imes','ober','ufat'];
    let permitidas = ['q','w','r','t','y','p','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m', ' '];

    
    for (let i = 0; i < permitidas.length; i++) {
        if (vocales[i] === letra) {
            return vowelsEncriptadas[i];
            break;
        }
        else if(permitidas[i] === letra){
            return letra;
            break;
        }
        else {
          continue;  
        }
        }
    }

  function showAlert() {
    document.getElementById('alert').style.display = 'block';
    setTimeout(function(){
        document.getElementById('alert').style.display = 'none';
        location.reload();
    }, 1000); // La alerta se oculta después de 3 segundos (3000 milisegundos)
}

function showMessage() {
  document.getElementById('alert2').style.display = 'block';
  setTimeout(function(){
      document.getElementById('alert2').style.display = 'none';
      location.reload();
  }, 1000); // La alerta se oculta después de 3 segundos (3000 milisegundos)
}



/*poner en oculto la imagen, los textos pero el botón no */
function removePutdHidden(){
    document.getElementById('area1').hidden= false;
    document.getElementById("imagenMuneco").hidden = true;
    document.getElementById("textAside").hidden = true;
    document.getElementById("pAside").hidden = true;
    document.getElementById("copyButton").hidden = false;

}

function putHidden(){
  document.getElementById('area1').hidden= true;
  document.getElementById("imagenMuneco").hidden = false;
  document.getElementById("textAside").hidden = false;
  document.getElementById("pAside").hidden = false;
  document.getElementById("copyButton").hidden = true;
}


function copiarTexto() {
  var texto = document.getElementById('area1').value;

  // Crear un área de texto temporal
  var tempTextArea = document.createElement("textarea");
  tempTextArea.value = texto;
  document.body.appendChild(tempTextArea);

  // Seleccionar el texto y copiarlo al portapapeles
  tempTextArea.select();
  document.execCommand("copy");
  showMessage();

  // Eliminar el área de texto temporal
  document.body.removeChild(tempTextArea);
  console.log('Texto copiado efectivamente: '+ texto);
}

/*Desencriptar */

document.getElementById("desencriptar").addEventListener(
  "click",
  () => {
  
  var texto = '';
  texto = document.getElementById("areaTexto").value;

  /*Encriptar el texto captado */
  let textoDesencriptado = desencriptarTexto(texto); 
  document.getElementById("area1").value = textoDesencriptado; /*poner el texto al final*/

  },
  false,
);

function desencriptarTexto(texto){
  let vocales =['a','e','i','o','u'];
  let vowelsEncriptadas = ['ai','enter','imes','ober','ufat'];
  let permitidas = ['q','w','r','t','y','p','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m', ' ','a','e','i','o','u'];
  let caractersNoPermitidosEncontrados = false;

  //console.log(texto); //hoberlai aienter
  for (let i = 0; i < vowelsEncriptadas.length; i++) {
    texto = texto.replace(new RegExp(vowelsEncriptadas[i], 'g'), vocales[i]);
  }

  for (let i = 0; i < texto.length; i++) {
      let caracterPermitido = false;
      for (let j = 0; j < permitidas.length; j++) {
          if (texto[i] === permitidas[j]) {
              caracterPermitido = true;
              break; // Salir del bucle si se encuentra un carácter permitido
          }
      }
      if (!caracterPermitido) {
          caractersNoPermitidosEncontrados = true;
          break; // Salir del bucle principal si se encuentra un carácter no permitido
      }
  }

if (caractersNoPermitidosEncontrados) {
    showAlert();
}

removePutdHidden(); //Ponemos por defecto en hidden los elementos del aside que no necesitamos
return texto;
}


/*let fraseCompleta = "Mi nombre es Cristian y soy el mejor";
const palabraBuscada = "me";
const nuevaPalabra = "fantástico";

if (fraseCompleta.includes(palabraBuscada)) {
    fraseCompleta = fraseCompleta.replace(palabraBuscada, nuevaPalabra);
    console.log(`La palabra "${palabraBuscada}" fue reemplazada por "${nuevaPalabra}": ${fraseCompleta}`);
} else {
    console.log(`La palabra "${palabraBuscada}" no está contenida dentro de la frase.`);
}
 Asi es como vamos a desencriptar*/