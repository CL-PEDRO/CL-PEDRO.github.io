// Variables blobales

let timer_time = 150;
let timer__object
let palabra_global = "";

let contador_veces_ganadas = 0;
let nombre_player = "";

let num_pistas = 4;

const gameSection = document.getElementById('game-section');
const nextButton = document.getElementById('next-button');
const menu_de_ingreso = document.getElementById('menu-de-ingreso');
const input_user= document.getElementById("nombre_user");
const menu = document.getElementById('menu');



const playButton = document.getElementById('play-button');


//Sonidos

const clickSound = './sounds/sfx_button.mp3'
const wrong_Sound = './sounds/wrong_sound.wav'
const correct_Sound = './sounds/correct_sound.wav'
const win_Sound = './sounds/success.wav'
const lose_sound = './sounds/lose_sound.wav'

document.addEventListener('DOMContentLoaded', () => {
    menu.style.display = 'block';
    menu_de_ingreso.style.display = 'none';
    gameSection.style.display = 'none';
  });




input_user.addEventListener('keypress',function(event){
    if (event.key === 'Enter') {
       
        event.preventDefault();
        console.log("Enter presionado, pero no se recarga la página");
    }
});

playButton.addEventListener('click', () => {
    playSound(clickSound);
    menu.classList.add('fade-out');
    setTimeout(() => {
      menu.style.display = 'none'; 
      menu_de_ingreso.style.display = 'block';
      menu_de_ingreso.classList.add('fade-in');
    }, 1000); 
  });
  
  // Evento para "Continuar"
  nextButton.addEventListener('click', (event) => {
    event.preventDefault();
    playSound(clickSound);
    if (input_user.value.trim() === "") {
    //   alert("Ingrese un usuario válido.");
      return;
    }
  
    menu_de_ingreso.classList.add('fade-out');
    setTimeout(() => {
      menu_de_ingreso.style.display = 'none'; 
      gameSection.style.display = 'block'; 
      gameSection.classList.add('fade-in');
  
      user_data(); 
      timer_to_down(); 
      recibePalabra(); 
    }, 1000);
  });


// Gpas
function fill_gabps(n, palabra) {
  let form_to_add_gaps = document.getElementById("gaps");
  palabra_global = "_".repeat(n); // Inicializamos palabra_global con guiones bajos
  const array_Inputs = [];
  
  for (let i = 0; i < n; i++) {
      let input = document.createElement("input");
      input.className = "inputs-letras";
      input.type = "text";
      input.maxLength = 1;
      input.pattern = "[A-Za-záéíóúÁÉÍÓÚñÑ]+";
      input.id = "input-texto-" + i;
      input.style.color = "white";

      input.addEventListener('input', function (event) {
          const value = this.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ]/g, ''); // Eliminamos caracteres no válidos
          this.value = value;

          // Evitamos errores por letras inválidas
          if (value === "") {
              return; // No procesamos si el input está vacío
          }

          // Validar la letra ingresada
          const isCorrect = validar_letra(value, palabra, i);

          if (isCorrect) {
              palabra_global = palabra_global.substring(0, i) + palabra[i] + palabra_global.substring(i + 1);
              playSound(correct_Sound);
              this.classList.add('respuesta_correcta');

              // Verificar si la palabra completa coincide
              if (palabra_global === palabra) {
                  playAudio(false);
                  playSound(win_Sound);
                  playAudio(true);
                  contador_veces_ganadas++;
                  showVictoryModal();
              }
          } else {
              playSound(wrong_Sound);
              registrarError(); // Manejo de errores
          }
      });

      array_Inputs.push(input);
      form_to_add_gaps.appendChild(input);
  }

  return array_Inputs;
}

// Función validar_letra mejorada
function validar_letra(letra, palabra, numero_de_input) {
  return palabra[numero_de_input] === letra;
}


//Logica


const recibePalabra = async () =>{
    
    try{
        const response = await fetch("https://clientes.api.greenborn.com.ar/public-random-word?c=1&l=8");
        if(response.ok)
        {
            const jsonResponse = await response.json();
            
            logic_Game(jsonResponse[0])
        }
    }catch(error){
        console.log(error)

    }

}
let palabra_correcta 
let arreglo_de_inputs_blogal 
function logic_Game(palabra) {
    // Obtener palabra
    palabra_correcta = palabra;
    console.log(palabra)
    const let_Word = palabra.length;

    //areglos de inputs :D
    const arreglo_de_inputs = fill_gabps(let_Word,palabra); 
    arreglo_de_inputs_blogal = arreglo_de_inputs;
    
    

}


// function validar_letra(input,palabra,numero_de_input)
// {
//     return palabra[numero_de_input] == input.value
// }


// datos the login :D

function user_data(){
    
    nombre_player = input_user.value;

    console.log(nombre_player)
}

function storege_data()
{
    if(nombre_player)
    {
        let valor_en_local_storage = localStorage.getItem(nombre_player);

        if (valor_en_local_storage == null)
        {
            localStorage.setItem(nombre_player,contador_veces_ganadas);
        }else
        {
            if(valor_en_local_storage <= contador_veces_ganadas)
            {
                localStorage.setItem(nombre_player,contador_veces_ganadas);
            }
        }

    }else
    {
        console.log("El nombre no existe :D");
    }
}



// Funcioones extras

function mover_section(id){
    const targetSection = document.getElementById(id);


    targetSection.scrollIntoView({behavior:"smooth"});
}

function showVictoryModal() {
    
    const victoryModal = new bootstrap.Modal(document.getElementById('victoryModal'),
    {
        backdrop: 'static',  
        keyboard: false  
    });
    
    stopTimer()
    victoryModal.show();
  }
  
  function showLoseModal() {
    playAudio(false);
    playSound(lose_sound);
    playAudio(true);
    const victoryModal = new bootstrap.Modal(document.getElementById('loseModal'),{
        backdrop: 'static',  
        keyboard: false   
    });
    
    stopTimer()
    victoryModal.show();
  }
  const replayButton = document.getElementById('replayButton');
  replayButton.addEventListener('click', () => {
    
    playSound(clickSound);
    resetGame();
    
    const victoryModal = bootstrap.Modal.getInstance(document.getElementById('victoryModal'));
    victoryModal.hide();
  });

  const replayButton2 = document.getElementById('replayButton2');
  replayButton2.addEventListener('click', () => {
    
    playSound(clickSound);
    resetGame();
    
    const loseModal = bootstrap.Modal.getInstance(document.getElementById('loseModal'));
    loseModal.hide();
  });
  
  

  function resetGame() {
    stopTimer()
    timer_time = 150;
    num_pistas=4;
    timer_to_down();
    reset_Dibujo();
    pistas_button.textContent = 'Pistas ' + num_pistas;
    palabra_global = ""; 
    document.getElementById('gaps').innerHTML = "";
    recibePalabra(); 
  }
  

  
const closeButton = document.getElementById('closeButton');


closeButton.addEventListener('click', () => {
    playSound(clickSound);
    setTimeout(()=>{
        guardarYRedirigir();
    },1000);
});

const closeButton2 = document.getElementById('closeButton2');


closeButton2.addEventListener('click', () => {
    playSound(clickSound);
  guardarYRedirigir();
});

function guardarYRedirigir() {
 
  if (!nombre_player) {
    alert("Error: El nombre de usuario no es válido.");
    return;
  }

  
  let savedScores = localStorage.getItem("gameScores");
  if (!savedScores) {
    savedScores = {}; 
  } else {
    savedScores = JSON.parse(savedScores); 
  }

  
  if (!savedScores[nombre_player] || savedScores[nombre_player] < contador_veces_ganadas) {
    savedScores[nombre_player] = contador_veces_ganadas; 
    localStorage.setItem("gameScores", JSON.stringify(savedScores)); 
  }

  
  window.location.href = "score.html";
}



function timer_to_down() {

    let contador_element = document.getElementById("contador"); 
    timer__object = setInterval(() => {
        console.log("Contador: " + timer_time); 
        contador_element.innerText= "";
        contador_element.innerText= timer_time;
        timer_time--; 

        if (timer_time < 0) {
            clearInterval(timer__object); 
            
            console.log("El tiempo se ha agotado");
            showLoseModal();
        }
    }, 1000); 
}


function stopTimer() {
    clearInterval(timer__object);  
    console.log("Temporizador detenido");
}

const pistas_button = document.getElementById("pistas");

pistas_button.addEventListener('click',()=>
{
    generador_pistas()
});

function generador_pistas() {
  if (num_pistas > 0) {
      let tamaño_palabra = palabra_global.length;

      // Encontrar un índice válido que aún no haya sido resuelto
      let numero_pista;
      do {
          numero_pista = Math.floor(Math.random() * tamaño_palabra); // Elegimos un índice aleatorio
      } while (palabra_global[numero_pista] === palabra_correcta[numero_pista]); // Repetimos si ya está resuelto

      // Mostrar la letra correspondiente en el input y marcarla como correcta
      arreglo_de_inputs_blogal[numero_pista].value = palabra_correcta[numero_pista];
      arreglo_de_inputs_blogal[numero_pista].classList.add("respuesta_correcta");

      // Actualizar la palabra_global con la letra revelada
      palabra_global = 
          palabra_global.substring(0, numero_pista) +
          palabra_correcta[numero_pista] +
          palabra_global.substring(numero_pista + 1);

      console.log("Pista utilizada. Palabra global actualizada:", palabra_global);

      // Reducir el número de pistas disponibles
      num_pistas--;
      pistas_button.textContent = 'Pistas ' + num_pistas;
  } else {
      console.log("No quedan pistas disponibles.");
  }
}


let erroresJugador = -1;

const intentosMaximos = 8;


const ahorcadoImg = document.getElementById('ahorcado-img');

function reset_Dibujo()
{
    ahorcadoImg.src = `./img/Personaje/male/ahorcado.png`;
    erroresJugador=-1;
}

function actualizarAhorcado() {
    if (erroresJugador < intentosMaximos) {
      ahorcadoImg.src = `./img/Personaje/male/ahorcado${erroresJugador}.png`;
      console.log(erroresJugador)
    } else {
        reset_Dibujo();
      
      showLoseModal();
    }
}
function registrarError() {
    erroresJugador++;
    actualizarAhorcado();
}

// function validar_letra(input, palabra, numero_de_input) {
//     if (palabra[numero_de_input] === input.value) {
//       return true;
//     } else {
      
//       return false;
//     }
//   }





function playSound(soundFile)
{
    const audio = new Audio(soundFile)
    audio.play();
}
  


function playAudio(play)
{
    if(play)
    {
        console.log("play musica");
        document.getElementById("audio").play();
    }else{
        console.log("Pause musica");
        document.getElementById("audio").pause();
    }
}