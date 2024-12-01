// Variables blobales

let timer_time = 30;
let timer__object
let palabra_global = "";

let contador_veces_ganadas = 0;
let nombre_player = "";


const input_user= document.getElementById("nombre_user");

input_user.addEventListener('keypress',function(event){
    if (event.key === 'Enter') {
       
        event.preventDefault();
        console.log("Enter presionado, pero no se recarga la página");
    }
});


const playButton = document.getElementById('play-button');
const menu = document.getElementById('menu');
const loginsection = document.getElementById('menu-de-ingreso');

  playButton.addEventListener('click', () => {
    // Añadir clase para la animación de desvanecimiento
    menu.classList.add('fade-out');
    // Mostrar el juego después de la animación (1s)
    setTimeout(() => {
      menu.style.display = 'none'; // Ocultar el menú completamente

    }, 1000);
  });

const gameSection = document.getElementById('game-section');
const nextButton = document.getElementById('next-button');
const menu_de_ingreso = document.getElementById('menu-de-ingreso');

nextButton.addEventListener('click', ()=>
{
    if(input_user.value)
    {
        menu_de_ingreso.classList.add('fade-out');
        gameSection.classList.add('fade-int');
    
        setTimeout(()=>
        {
            user_data()
            gameSection.style.display = 'block'; // Mostrar el juego
            recibePalabra();
        },500);
    
    }else{
        alert("Ingrese un usuario");
    }
});







// Gpas
function fill_gabps(n,palabra) {
    let form_to_add_gaps = document.getElementById("gaps");
    const array_Inputs  = []
    // Usar un bucle para agregar los campos de entrada de texto
    for (let i = 0; i < n; i++) {
      // Crear el elemento input
      let input = document.createElement("input");
      input.className = "inputs-letras"; // Asignar la clase
      input.type = "text"; // Tipo de campo
      input.maxLength = 1; // Limitar a un solo carácter
      input.pattern = "[A-Za-z]+"; // Solo permitir letras
      input.id = "input-texto-" + i; // Asignar un id único
      
      palabra_global +=""+i;
      input.addEventListener('input', function (event) {
        // Reemplazar cualquier cosa que no sea una letra
        this.value = this.value.replace(/[^A-Za-z]/g, '');
        
        
        if(validar_letra(this,palabra,i))
        {
            palabra_global=palabra_global.replace(""+i,palabra[i])
            console.log("Estamos añaniendo una letra", palabra_global)

            if (palabra_global == palabra)
            {
                contador_veces_ganadas++;
                alert("Haz ganado");
                
                
                showVictoryModal();
            }
        }
      });



      array_Inputs.push(input);
      // Agregar el input al formulario
      form_to_add_gaps.appendChild(input);
    }

    

    return array_Inputs
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

function logic_Game(palabra) {
    // Obtener palabra
    
    console.log(palabra)
    const let_Word = palabra.length;

    //aregkis de inputs :D
    const arreglo_de_inputs = fill_gabps(let_Word,palabra);  
    timer_to_down();

}


function validar_letra(input,palabra,numero_de_input)
{
    return palabra[numero_de_input] == input.value
}


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
    // Usa Bootstrap para mostrar el modal
    const victoryModal = new bootstrap.Modal(document.getElementById('victoryModal'));
    
    stopTimer()
    victoryModal.show();
  }
  
  function showLoseModal() {
    // Usa Bootstrap para mostrar el modal
    const victoryModal = new bootstrap.Modal(document.getElementById('loseModal'));
    
    stopTimer()
    victoryModal.show();
  }
  const replayButton = document.getElementById('replayButton');
  replayButton.addEventListener('click', () => {
    // Reinicia el juego
    resetGame();
    // Cierra el modal
    const victoryModal = bootstrap.Modal.getInstance(document.getElementById('victoryModal'));
    victoryModal.hide();
  });

  const replayButton2 = document.getElementById('replayButton2');
  replayButton2.addEventListener('click', () => {
    // Reinicia el juego
    resetGame();
    // Cierra el modal
    const loseModal = bootstrap.Modal.getInstance(document.getElementById('loseModal'));
    loseModal.hide();
  });
  
  

  function resetGame() {
    timer_time = 30;
    stopTimer()
    palabra_global = ""; // Reinicia la palabra global
    document.getElementById('gaps').innerHTML = ""; // Limpia los inputs del juego
    recibePalabra(); // Genera una nueva palabra
  }
  

  // Obtener referencia al botón "Cerrar" del modal
const closeButton = document.getElementById('closeButton');

// Escuchar el clic en el botón "Cerrar"
closeButton.addEventListener('click', () => {
  guardarYRedirigir();
});

const closeButton2 = document.getElementById('closeButton2');

// Escuchar el clic en el botón "Cerrar"
closeButton2.addEventListener('click', () => {
  guardarYRedirigir();
});

function guardarYRedirigir() {
  // Verificar si hay un nombre de usuario válido
  if (!nombre_player) {
    alert("Error: El nombre de usuario no es válido.");
    return;
  }

  // Recuperar los puntajes almacenados
  let savedScores = localStorage.getItem("gameScores");
  if (!savedScores) {
    savedScores = {}; // Inicializar si no existen puntajes
  } else {
    savedScores = JSON.parse(savedScores); // Convertir de JSON a objeto
  }

  // Verificar y actualizar puntaje solo si es mayor al actual
  if (!savedScores[nombre_player] || savedScores[nombre_player] < contador_veces_ganadas) {
    savedScores[nombre_player] = contador_veces_ganadas; // Actualizar puntaje
    localStorage.setItem("gameScores", JSON.stringify(savedScores)); // Guardar en localStorage
  }

  // Redirigir a la página de puntuaciones
  window.location.href = "score.html";
}



function timer_to_down() {

    let contador_element = document.getElementById("contador"); 
    timer__object = setInterval(() => {
        console.log("Contador: " + timer_time); // Mostrar el contador
        contador_element.innerText= "";
        contador_element.innerText= timer_time;
        timer_time--; // Decrementar cada segundo

        if (timer_time < 0) {
            clearInterval(timer2); // Detener el temporizador cuando llegue a 0

            console.log("El tiempo se ha agotado");
            showLoseModal();
        }
    }, 1000); // Ejecutar cada segundo
}


function stopTimer() {
    clearInterval(timer__object);  // Detener el temporizador desde fuera de la función
    console.log("Temporizador detenido");
}
