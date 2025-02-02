import PlayerJeep from "../clases/PlayerJeep.js?v=1.0";
import StikerClass from "../clases/StikerClass.js?v=1.0";
import GeneralInfo from "../components/GeneralInfo.js?v=1.0";
import InfoImagen from "../components/InfoImagen.js?v=1.0";
import Comun from "../services/Comun.js?v=1.0";

class ScenePpal extends Phaser.Scene {
  constructor(){
    super('ScenePpal');
    this.generalInfo = new GeneralInfo(this);
    this.infoImagen = new InfoImagen(this);
    this.comun = new Comun(this);    
  }

  init(){
    this.canRespawnStiker = false;
    this.scoreStiker = 0;
    this.scoreStikerLimit = 5;
    this.respawnStiker = 0;
    this.respawnIntervalStiker = 30000;
    this.isPaused = false;    
    this.finished = 0;
    this.colectionActual = this.comun.getDataLocalStorage('collection');

    this.config = this.comun.getDataLocalStorage('gameConfig');
    switch (this.config.difficulty) {
      case 'easy': this.scoreStikerLimit = 4; break;
      case 'normal': this.scoreStikerLimit = 5; break;
      case 'hard': this.scoreStikerLimit = 8; break;    
      default:
        break;
    }
  }

  preload(){
    this.load.path = './assets/';    
  }

  create(){    
    // PARALLAX
    this.bgLayer1 = this.add.tileSprite(480, 270, 960, 540, 'parallaxLayer1').setDepth(1).setScrollFactor(0); // sol
    this.bgLayer2 = this.add.tileSprite(480, 270, 960, 540, 'parallaxLayer2').setDepth(2).setScrollFactor(0); // kilimanjaro
    this.bgLayer3 = this.add.tileSprite(480, 270, 960, 540, 'parallaxLayer3').setDepth(3).setScrollFactor(0); // nubes
    this.bgLayer4 = this.add.tileSprite(480, 270, 960, 540, 'parallaxLayer4').setDepth(4).setScrollFactor(0); // arboles lejanos
    this.bgLayer5 = this.add.tileSprite(480, 270, 960, 540, 'parallaxLayer5').setDepth(5).setScrollFactor(0); // tierra y arboles cercanos
    this.bgLayer6 = this.add.tileSprite(480, 270, 960, 540, 'parallaxLayer6').setDepth(8).setScrollFactor(0); // pasto

    // Crear un sprite para el cursor personalizado
    this.cursor = this.add.sprite(0, 0, 'lupa').setScale(0.2);
    this.cursor.setDepth(100); // Asegurarte de que siempre esté encima de otros elementos

    this.showCustomCursor();

    // Actualizar la posición del cursor personalizado en cada frame
    this.input.on('pointermove', (pointer) => {
      this.cursor.setPosition(pointer.x, pointer.y);
    });

    
    //Sonido de fondo
    this.soundTheme = this.sound.add('soundTheme', { volume: 0.3, loop: true });
    this.soundTheme.play();  
    
    //Sonido de motor carro
    this.playerSonund = this.sound.add('soundMotor', { volume: 0.3, loop: true });
    this.playerSonund.play();  
      
    // CREATE KEYBOARD CURSOS
    this.cursors = this.input.keyboard.createCursorKeys();

    // PLAYER
    this.player = new PlayerJeep(this, 1100, 380, this.config.spritePlayer);
    this.player.movePlayer();

    // GROUPS
    this.stikerGroup = new StikerClass(this.physics.world, this);

    this.generalInfo.create('lupa');
    
    setTimeout(() => {
      this.canRespawnStiker = true;
    }, 3000);
  }

  addStiker() {
    this.stikerGroup.newItem(this.config.difficulty);    
  }

  controlParallax() {
    if (!this.isPaused) {
      // Velocidades diferentes para el efecto parallax
      this.bgLayer1.tilePositionX += 0.05;
      this.bgLayer2.tilePositionX += 0.1;
      this.bgLayer3.tilePositionX += 0.2;
      this.bgLayer4.tilePositionX += 0.3;
      this.bgLayer5.tilePositionX += 0.4;
      this.bgLayer6.tilePositionX += 0.5;
    } else {
      // Pausar el movimiento de los fondos
      this.bgLayer1.tilePositionX = 0;
      this.bgLayer2.tilePositionX = 0;
      this.bgLayer3.tilePositionX = 0;
      this.bgLayer4.tilePositionX = 0;
      this.bgLayer5.tilePositionX = 0;
      this.bgLayer6.tilePositionX = 0;
    }
  }

  controlPlayer() {
    if (!this.isPaused) {
      this.player.setVisible(true);     
      this.player.setVelocity(0, 0).anims.play('turn', true);
    } else {
      this.player.setVisible(false);
    }
  }

  //  STIKER RESPAWN CONTROL
  controlRespawnStikers(time) {
    if (time > this.respawnStiker) {
      if (this.scoreStiker <= this.scoreStikerLimit && this.canRespawnStiker && !this.isPaused) {
        this.addStiker();
        this.respawnStiker = time + this.respawnIntervalStiker;
      }
    }
    this.stikerGroup.getChildren().forEach(sticker => {
      if (sticker.x < -201 || sticker.x > 1161) {
        sticker.destroy();
      }
    });
  }

  handleClick(sprite) {
    this.scoreStiker += 1;
    const key = sprite.texture.key;
    sprite.setTint(0xff0000); // Cambiar el color como ejemplo
    this.tweens.add({
      targets: sprite,
      scale: 0,
      duration: 500,
      ease: 'Power2',
      onComplete: () => sprite.destroy(), // Eliminar el sprite después de la animación
    });
    this.isPaused = true;
    this.generalInfo.actualizarScore();
    this.soundTheme.pause();
    this.playerSonund.pause();
    this.showDefaultCursor();
    this.infoImagen.show(key);
    this.controlVisivilityStikers();
  }

  // Función para mostrar el cursor predeterminado
  showDefaultCursor () {
    this.input.setDefaultCursor('default'); // Mostrar el cursor del navegador
    this.cursor.setVisible(false); // Ocultar el cursor personalizado
  }

  // Función para mostrar el cursor personalizado
  showCustomCursor () {
    this.input.setDefaultCursor('none'); // Ocultar el cursor del navegador
    this.cursor.setVisible(true); // Mostrar el cursor personalizado
  };

  controlVisivilityStikers() {
    this.stikerGroup.setVisibility(!this.isPaused);
  }

  checkCollection(name) {
    let updated = false;
    for (let i = 0; i < this.colectionActual.length; i++) {
      if
      (this.colectionActual[i].name === name && !this.colectionActual[i].visible) {
        this.colectionActual[i].visible = true;
        updated = true;
      }
    }
    if (updated) {
      this.comun.createColeccion(this.colectionActual);
    }
  }
   
  update(time, delta){
    if(this.finished > 0){
      this.scene.start('Winner');
      this.finished = 0;
    }

    this.controlPlayer();
    this.controlRespawnStikers(time);
    this.controlParallax();
  }
}

export default ScenePpal;