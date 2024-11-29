var config = {
    type: Phaser.AUTO,
    backgroundColor: 'black',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('Background1', '/img/Backgrounds/Background1.png');
}

function create() {
    // Ajustamos la imagen al centro del canvas
    let background = this.add.image(0, 0, 'Background1');
    background.setOrigin(0, 0);

    // Escala automática para que la imagen se ajuste a la pantalla
    let scaleX = this.scale.width / background.width;
    let scaleY = this.scale.height / background.height;
    let scale = Math.min(scaleX, scaleY);

    background.setScale(scale);
}

function update() {
    // Puedes agregar lógica adicional si es necesario
}
