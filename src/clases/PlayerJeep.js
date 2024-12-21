export default class PlayerJeep extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite); 
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.init();
    this.animatePlayer();   
  }

  init(){
    this
    .setBounce(0.2)
    .setCollideWorldBounds(false)
    //.setGravityY(300)
    .setDepth(7)
    .setScale(0.8)  // Reducir el tamaño de la abeja
    //.body.setSize(100,100,150,150); // custom mask => setSize(width, height, XinSprite, YinSprite)
  }

  animatePlayer() {
    // Animación hacia la derecha (fotogramas 0 a 5)
    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('jeepSprite', { start: 0, end: 5 }),
      frameRate: 20,
      repeat: -1
    });
  }

  movePlayer() {
    // Crea un tween para mover el jeep
    this.scene.tweens.add({
      targets: this, // El sprite del jugador
      x: 110,        // Posición final en X
      duration: 5000, // Duración del movimiento en milisegundos
      ease: 'Power1', // Efecto de suavizado
      /* onStart: () => {
        this.play('turn'); // Inicia la animación mientras se mueve
      },
      onComplete: () => {
        this.stop(); // Detiene la animación al finalizar
      } */
    });
  }
}