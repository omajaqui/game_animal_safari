import Comun from "../services/Comun.js";
export default class Niveles {
  constructor(scene) {
    this.relatedScene = scene;
    this.comun = new Comun();
    
    this.nivelesDisponibles = [];
     
    //variables game
    this.cw = 960;
    this.ch = 540;
    this.sceneToLoad = '';
  }   
  
  preload() {
    this.relatedScene.load.path = './assets/';      
  }

  async create() {
    this.bgLevels = this.relatedScene.add.image(this.cw/2, this.ch/2, 'bgLevels').setAlpha(0).setDepth(2);
    
    // Crear un rectángulo semitransparente para oscurecer el fondo
    this.overlay = this.relatedScene.add.image(this.cw/2, this.ch/2, 'bgOverlay')
      .setDepth(2)
      .setVisible(false);  // Lo mantenemos invisible hasta que queramos oscurecer
    
    //Definicion de botones
    this.btnHome = this.relatedScene.add.sprite(40, 40, 'btn_home').setAlpha(0).setVisible(false);
    this.nivel_safari_easy = this.relatedScene.add.sprite(200, 250, 'safari_easy').setScale(0.8).setDepth(10).setInteractive({cursor:'pointer'});
    this.nivel_safari_normal = this.relatedScene.add.sprite(450, 250, 'safari_normal').setScale(0.8).setDepth(10).setInteractive({cursor:'pointer'});
    this.nivel_safari_hard = this.relatedScene.add.sprite(700, 250, 'safari_hard').setScale(0.8).setDepth(10).setInteractive({cursor:'pointer'});
    this.textLevel = this.relatedScene.add.text(0, 0, 'Selecciona un nivel',
      { font: '40px Arial', fill: '#ffffff',stroke: '#000000', strokeThickness: 6 }
    ).setOrigin(0.5).setPosition(this.cw/2, 50);
    
    this.containerNiveles = this.relatedScene.add.container(20, -500, 
      [this.btnHome, this.nivel_safari_easy, this.nivel_safari_normal, this.nivel_safari_hard, this.textLevel]
    ).setDepth(10);
    
    // Intancias audios de niveles
    //this.soundLetraA = this.relatedScene.sound.add('letraA', { volume: 0.8, loop: false });
  }

  cargarNivelesDisponibles(){
    return new Promise(async resolve =>{
      //let clave = `AVANCE_JUEGOS_USUARIO_${window.parent.$.IdentificaUsuario}`;
      //this.nivelesDisponibles = await window.parent.cargar_storage(clave);           
      resolve(true);
    });
  }

  styleNiveles(){
      return new Promise(async resolve =>{
          this.nivelesDisponibles.avanceJuego.forEach(item =>{
              switch(item.nivel){
                  //el nivel 1 siempre estará disponible por eso no se valida
                  case "2": //nivel spacio
                      //validar si el nivel esta como disponible 'N'
                      if(item.disponible == "N"){
                          this.nivel_space.setTint(0x1abc9c);
                      }else{
                          this.nivel_space.setInteractive({cursor:'pointer'});
                      }
                  break;
              }
          });
          resolve(true);
      });
  }

  mostrarNiveles(){
    this.overlay.setVisible(true);
    let self = this;

    //mostrar bgDark
    this.relatedScene.tweens.add({
      targets: this.bgLevels,
      alphaTopLeft: { value: 1, duration: 1500, ease: 'Power1' },
      alphaTopRight: { value: 1, duration: 1500, ease: 'Power1' },
      alphaBottomRight: { value: 1, duration: 3000, ease: 'Power1' },
      alphaBottomLeft: { value: 1, duration: 1500, ease: 'Power1', delay: 500 },
    });

    //console.log("mostrar niveles desde componente");
    this.relatedScene.tweens.add({
      targets: [this.containerNiveles],
      y: 0,
      ease: 'Power1',
      duration: 2000,
      onComplete: function () {
        self.interaccionNiveles();
        self.btnHome.setScale(0.25).setDepth(10).setInteractive({cursor:'pointer'}).setVisible(true);
        self.relatedScene.tweens.add({
          targets: self.btnHome,
          alpha: 1,          // Cambia alpha de 0 a 1 (opacidad completa)
          duration: 500,     // Duración de la animación en milisegundos
          ease: 'Power2',    // Efecto de suavizado
        });                                           
      },
    });
  }

  interaccionNiveles(){
    //console.log("establecet interaccion con los btn de los niveles")

    //INTERACION CON EL NIVEL SAFARI EASY
    this.nivel_safari_easy.on('pointerover', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_safari_easy,
            scaleX: 1,      // Nuevo valor de escala en X
            scaleY: 1,      // Nuevo valor de escala en Y
            duration: 200,    // Duración de la animación en milisegundos
            ease: 'Power1',   // Tipo de easing
        });
    });  
    this.nivel_safari_easy.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_safari_easy,
            scaleX: 0.8,      // Restaurar el valor original de escala en X
            scaleY: 0.8,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_safari_easy.on('pointerdown', () => {
      this.startLevel('easy');
    });

    //INTERACION CON EL NIVEL SAFARI NORMAL
    this.nivel_safari_normal.on('pointerover', () => {
      this.relatedScene.tweens.add({
          targets: this.nivel_safari_normal,
          scaleX: 1,      // Nuevo valor de escala en X
          scaleY: 1,      // Nuevo valor de escala en Y
          duration: 200,    // Duración de la animación en milisegundos
          ease: 'Power1',   // Tipo de easing
      });
    });  
    this.nivel_safari_normal.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_safari_normal,
            scaleX: 0.8,      // Restaurar el valor original de escala en X
            scaleY: 0.8,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_safari_normal.on('pointerdown', () => {
      this.startLevel('normal');
    });

    //INTERACION CON EL NIVEL SAFARI HARD
    this.nivel_safari_hard.on('pointerover', () => {
      this.relatedScene.tweens.add({
          targets: this.nivel_safari_hard,
          scaleX: 1,      // Nuevo valor de escala en X
          scaleY: 1,      // Nuevo valor de escala en Y
          duration: 200,    // Duración de la animación en milisegundos
          ease: 'Power1',   // Tipo de easing
      });
    });  
    this.nivel_safari_hard.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_safari_hard,
            scaleX: 0.8,      // Restaurar el valor original de escala en X
            scaleY: 0.8,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_safari_hard.on('pointerdown', () => {
      this.startLevel('hard');
    });

    //INTERACION CON EL BOTON HOME        
    this.btnHome.on('pointerover', () => { this.btnHome.setScale(0.35); });
    this.btnHome.on('pointerout', () => {  this.btnHome.setScale(0.25); });
    this.btnHome.on('pointerdown', () => {
      if (this.relatedScene.backgroundMusic && this.relatedScene.backgroundMusic.isPlaying) {
        this.relatedScene.backgroundMusic.stop();
      }
      this.relatedScene.scene.start('Intro'); 
    });        
  } 

  async startLevel(level) {
    this.sceneToLoad = '';

    // Configuración para el nivel fácil
    const config = {
      difficulty: level,
      spritePlayer: `jeepSprite_${level}`,
    };
    localStorage.setItem('gameConfig', JSON.stringify(config));

    // Ocultar todos los niveles, estrellas y el boton de home
    this.nivel_safari_easy.setAlpha(0);
    this.btnHome.setAlpha(0);
    this.textLevel.setAlpha(0);

    // Eliminar los eventos previos de interacción => a todos los niveles
    this.nivel_safari_easy.removeAllListeners('pointerover');
    this.nivel_safari_easy.removeAllListeners('pointerout');
    this.nivel_safari_easy.removeAllListeners('pointerdown');

    this.nivel_safari_normal.removeAllListeners('pointerover');
    this.nivel_safari_normal.removeAllListeners('pointerout');
    this.nivel_safari_normal.removeAllListeners('pointerdown');

    this.nivel_safari_hard.removeAllListeners('pointerover');
    this.nivel_safari_hard.removeAllListeners('pointerout');
    this.nivel_safari_hard.removeAllListeners('pointerdown');

    // Dejar visible solo el nivel seleccionado
    switch (level) {
      case 'easy':
        this.sceneToLoad = 'ScenePpal';
        this.nivel_safari_easy.setAlpha(1);        

        //Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_safari_easy,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue();
          }
        });
        break;
      
      case 'normal':
        this.sceneToLoad = 'ScenePpal';
        this.nivel_safari_normal.setAlpha(1);        

        //Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_safari_normal,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue();
          }
        });
        break;

      case 'hard':
        this.sceneToLoad = 'ScenePpal';
        this.nivel_safari_hard.setAlpha(1);        

        //Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_safari_hard,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue();
          }
        });
        break;

      default:
        sceneToLoad = 'DefaultScene';
        break;
    }    
  }

  async controlContinue() {
    if (this.relatedScene.backgroundMusic && this.relatedScene.backgroundMusic.isPlaying) {
      this.relatedScene.backgroundMusic.stop();
    }   

    await this.comun.delay(1000);
    this.showIndications();
    setTimeout(() => {
      this.relatedScene.scene.start('Loading', { sceneToLoad: this.sceneToLoad });      
    }, 5000);    
  }

  showIndications() {
    const keyBgIndications = `bg_${this.sceneToLoad}_indications`;
    this.bgLevels.setAlpha(0);
    this.overlay.setAlpha(0);
    this.bgIndications = this.relatedScene.add.image(this.cw/2, this.ch/2, keyBgIndications).setDepth(10); 

    const soundIndications = this.relatedScene.sound.add('sound_indications', { volume: 1, loop: false });
    soundIndications.play();

    // Agregar un texto para el contador regresivo en la esquina inferior derecha
    const countdownText = this.relatedScene.add.text(
      this.cw - 50, // Ajusta la posición horizontal (50px desde el borde derecho)
      this.ch - 50, // Ajusta la posición vertical (50px desde el borde inferior)
      '5', // Texto inicial
      {
          font: '32px Arial',
          fill: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4,
          align: 'center'
      }
    ).setDepth(11).setOrigin(0.5); // Centra el texto

    // Crear el contador regresivo
    let countdownValue = 5;
    const countdownTimer = this.relatedScene.time.addEvent({
        delay: 1000, // 1 segundo
        callback: () => {
            countdownValue--;
            countdownText.setText(countdownValue); // Actualiza el texto
            if (countdownValue <= 0) {
                countdownTimer.remove(); // Detiene el temporizador
                countdownText.destroy(); // Elimina el texto
            }
        },
        repeat: 4 // Se repite 4 veces para llegar a 0
    });
  }
}