import Niveles from "./../components/Niveles.js?v=1.0";
import Menu from "../components/Menu.js?v=1.0";
import InfoImagen from "../components/InfoImagen.js?v=1.0";

class Intro extends Phaser.Scene {  
  constructor() {
    super('Intro');
    this.niveles = new Niveles(this);
    this.menu = new Menu(this);
    this.infoImagen = new InfoImagen(this);
  }
  init() {     
    this.verindicaciones = 'N';
    this.iniciar;
  }

  preload() {         
  }

  create() {
    this.btnMusicOn = this.add.sprite(40, 40, 'btn_music').setScale(0.25).setDepth(5).setInteractive({cursor:'pointer'}).setVisible(true);      
    this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgroundIntro')
      .setVisible(true).setDepth(1) ;
    ;

    // Reproduce la música de fondo en bucle
    this.soundTheme = this.sound.add('backgroundMusic', { volume: 0.4, loop: true });

    if (!this.soundTheme.isPlaying) {        
      // Detecta la interacción inicial del usuario
      this.input.keyboard.once('keydown', () => {
        this.startBackgroundMusic();
      });
      this.input.once('pointerdown', () => {
        this.startBackgroundMusic();
      });
    }   

    this.niveles.create();
    this.menu.create();
  }

  startBackgroundMusic() {  
    setTimeout(() => {
      if (!this.soundTheme.isPlaying) {
        this.soundTheme.play();  // Reproduce el audio   
      }                     
    }, 1000);      
  }

  indicaciones(){
    this.niveles.mostrarNiveles();
  }

  async startScene(data) {
    this.soundTheme.stop();
    try {
      await this.textToSpeech.speak(`Letra, ${data.leter}.`, 2);            
    } catch (error) {
      console.log(error);
    }
    await this.textToSpeech.speak(`En inglés se pronuncia.`, 2);
    await this.textToSpeech.speak(`${data.leter}.`, 1);
    await this.textToSpeech.speak('Comencemos.', 2);
    this.scene.start('Loading', { sceneToLoad: data.sceneToLoad });    
  }

  handleClickCollection(image) {
    this.soundTheme.pause();
    this.infoImagen.show(image, 'collection');
  }
  showCustomCursor(){}
  
  update(time, delta) {
    // Controlar visivility del boton music
    if (this.soundTheme.isPlaying) {
      this.btnMusicOn.setVisible(false);
    }
  } 
} export default Intro;