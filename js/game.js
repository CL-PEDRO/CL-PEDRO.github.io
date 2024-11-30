

const playButton = document.getElementById('play-button');
const menu = document.getElementById('menu');
const gameSection = document.getElementById('game-section');

  playButton.addEventListener('click', () => {
    // Añadir clase para la animación de desvanecimiento
    menu.classList.add('fade-out');
    // Mostrar el juego después de la animación (1s)
    setTimeout(() => {
      menu.style.display = 'none'; // Ocultar el menú completamente
      gameSection.style.display = 'block'; // Mostrar el juego
    }, 1000);
  });
