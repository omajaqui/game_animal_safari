import { validateFix, getTranslate } from "../services/Strings.js";

export default class InfoImagen {
  constructor(scene) {
    this.relatedScene = scene; // La escena en la que estamos trabajando
    this.pauseOverlay = null;
    this.playButton = null;
    this.closeButton = null;

    //variables game
    this.cw = 960;
    this.ch = 540;
  }  

  show(paramImage) {
    let nameImage = '';
    let word = '';
    let translate = '';
    let chunksWords = [];
    let keyAudiotranslate = '';
    let keyAudioAnimal = '';
    const posX = 230;

    nameImage = paramImage.replace('stiker','recurso');
    keyAudiotranslate = paramImage.replace('stiker','translate');
    keyAudioAnimal = paramImage.replace('stiker','animal');
    chunksWords = paramImage.split('_');
    word = validateFix(chunksWords[1]);
    translate = getTranslate(chunksWords[1]);
    
    // Crear el fondo oscuro con opacidad
    this.pauseOverlay = this.relatedScene.add.graphics();
    this.pauseOverlay.fillStyle(0x000000, 0.8).setDepth(12); // Fondo oscuro con 80% de opacidad
    this.pauseOverlay.fillRect(0, 0, this.relatedScene.cameras.main.width, this.relatedScene.cameras.main.height);

    this.image = this.relatedScene.add
      .image(posX, this.ch/2 + 50, nameImage)
      .setScale(0.4)
      .setDepth(12)
    ;
    // Crear un gráfico para la máscara redondeada
    this.maskGraphics = this.relatedScene.add.graphics();

    // Configurar el gráfico para dibujar un rectángulo redondeado
    this.maskGraphics.fillStyle(0xffffff, 1); // Color blanco (la máscara no necesita ser visible)
    this.maskGraphics.fillRoundedRect(
      posX - (this.image.displayWidth / 2), // X (ajustado para centrar la imagen)
      (this.ch/2 + 50) - (this.image.displayHeight / 2), // Y (ajustado para centrar la imagen)
      this.image.displayWidth,  // Ancho de la imagen
      this.image.displayHeight, // Alto de la imagen
      20 // Radio de los bordes redondeados
    );
    // Establecer la máscara en la imagen
    this.image.setMask(this.maskGraphics.createGeometryMask());

    //Textos con nombre de imagen y traduccion (no visible inicialmente)
    this.textWord = this.relatedScene.add.text(0, 0, 
      word+' = '+translate,
      { font: '60px Arial', fill: '#ffffff' }).setDepth(12)
      .setVisible(false).setOrigin(0.5).setPosition(this.cw/2, 40);
    ;    
    
    this.createLetterContainer(chunksWords[1]);    

    this.audioTranslate = this.relatedScene.sound.add(keyAudiotranslate, { volume: 1, loop: false });
    this.audioEncuentraLetra = this.relatedScene.sound.add('encuentra_letra', { volume: 1, loop: false });
    this.audioAnimal = this.relatedScene.sound.add(keyAudioAnimal, { volume: 1, loop: false });
    //reproducir audio
    this.audioEncuentraLetra.play();
    this.audioEncuentraLetra.once('complete', () => {
      this.audioAnimal.play();      
    });
    
    //botons
    this.buttonClose = this.relatedScene.add.sprite(150, 50, 'btn_todobien')
      .setDepth(12)
      .setScale(0.25)      
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => this.closeInfo())
    ;
    this.buttonReplay = this.relatedScene.add.sprite(250, 50, 'btn_listen')
      .setDepth(12)
      .setScale(0.25)      
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => this.replayAudio())
    ;

    // Crear un contenedor (no visible inicialmente)
    this.buttonContainer = this.relatedScene.add
      .container(650, 430, [this.buttonClose ,this.buttonReplay])
      .setVisible(false)
      .setDepth(12)
    ;          
  }

  replayAudio(audio = '') {
    if (this.audioTranslate.isPlaying) { this.audioTranslate.stop(); }
    //if (this.audioAnimal.isPlaying) { this.audioAnimal.stop(); }

    switch (audio) {
      case '':
        this.audioTranslate.play();       
        break;
      
      case 'animal':
        this.audioAnimal.play();
        break;
    
      default:
        break;
    }
  }  

  closeInfo() {
    // Destruir elementos creados
    if (this.pauseOverlay) this.pauseOverlay.destroy();
    if (this.buttonContainer) this.buttonContainer.destroy();
    if (this.containerLetters) this.containerLetters.destroy();
    if (this.congratContainer) this.congratContainer.destroy();
    if (this.buttonReplayAnimal) this.buttonReplayAnimal.destroy();
    if (this.image) this.image.destroy();
    if (this.maskGraphics) this.maskGraphics.destroy();
    if (this.textWord) this.textWord.destroy();
    if (this.context) this.context.destroy();
    if (this.translate) this.translate.destroy();

    this.relatedScene.isPaused = false;    

    if(this.relatedScene.scoreStiker >= this.relatedScene.scoreStikerLimit) {
      this.relatedScene.finished = 1;
    } else {
      this.relatedScene.respawnStiker = 0;
      this.relatedScene.soundTheme.resume();
      this.relatedScene.showCustomCursor();
      if (this.relatedScene.playerSonund) {
        this.relatedScene.playerSonund.resume();
      }       
    }
  }

  createLetterContainer(word) {
    const letters = this.setLetters(word);
    const indication = this.relatedScene.add.text
      (0, 0, 'Encuentra la letra con la que se escribe',
        { font: '40px Arial', fill: '#ffffff' }
      ).setDepth(13).setOrigin(0.5).setPosition((this.cw/2 - 460), 20);
    ;

    //boton de reproduccion nombre animal
    this.buttonReplayAnimal = this.relatedScene.add.sprite(430, 20, 'btn_listen')
      .setDepth(13)
      .setScale(0.2)      
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => this.replayAudio('animal'))
    ;

    // Crear un contenedor para las letras
    this.containerLetters = this.relatedScene.add.container(460, 50,[indication,this.buttonReplayAnimal]).setDepth(13);
    let espacioEntreLetras = 100; // Espacio entre las letras

    letters.forEach((letter, index) => {
      if(letter == 'O') { espacioEntreLetras = 90; }
      // Crear un texto interactivo para cada letra
      const texto = this.relatedScene.add.text
        (index * espacioEntreLetras, 200, letter,
          { font: '80px Arial', fill: '#ffffff' }
        )
        .setDepth(13)
        .setInteractive({ cursor: 'pointer' })
      ;
      // Agregar un evento al hacer clic en la letra
      texto.on('pointerdown', () => {
        this.letraClickeada(texto, word); // Pasar el objeto de texto a la función
      });

      // Agregar el texto al contenedor
      this.containerLetters.add(texto);
    });

    // Crear un contenedor para las felicitaciones
    this.congratContainer = this.relatedScene.add.container(690, 280).setVisible(false).setDepth(13);
  }

  letraClickeada(letra, word) {
    //detener otros audios si estan en reproduccion
    if (this.audioEncuentraLetra.isPlaying) {this.audioEncuentraLetra.stop(); }
    if (this.audioAnimal.isPlaying) {this.audioAnimal.stop(); }

    const firstLetter = word.charAt(0).toUpperCase();
    if (letra._text !== firstLetter) {
      this.relatedScene.tweens.add({
        targets: letra,
        scale: 0,
        duration: 500,
        ease: 'Power2',
        onComplete: () => letra.destroy(), // Eliminar el sprite después de la animación
      });
    } else {
      const keyAudioLetra = `letra_${word.charAt(0)}`;
      this.audioBienhecho = this.relatedScene.sound.add('bien_hecho', { volume: 1, loop: false });
      this.audioLetra = this.relatedScene.sound.add(keyAudioLetra, { volume: 1, loop: false });
      this.containerLetters.setVisible(false);
      this.textWord.setVisible(true);      
      this.audioBienhecho.play();
      this.showContainerCongrat();

      // Detectar cuando terminan las reproducciones
      this.audioBienhecho.once('complete', () => {
        this.audioLetra.play();
        
        setTimeout(() => {
          this.audioTranslate.play();
          this.audioTranslate.once('complete', () =>{
            this.buttonContainer.setVisible(true);
          });          
        }, 1500);
      });
    }
  }

  setLetters(animal) {
    // Obtener la primera letra del animal
    const firstLetter = animal.charAt(0).toUpperCase();
    
    // Definir las vocales y consonantes
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
    
    // Verificar si la primera letra es una vocal
    if (vowels.includes(firstLetter)) {
      return vowels; // Devuelve un array con las vocales
    } else {
      // Crear un array con 4 consonantes aleatorias
      const consonantesAleatorias = [];
      while (consonantesAleatorias.length < 4) {
        const letra = consonants[Math.floor(Math.random() * consonants.length)];
        if (!consonantesAleatorias.includes(letra) && letra !== firstLetter) {
          consonantesAleatorias.push(letra);
        }
      }
      
      // Incluir la primera letra
      consonantesAleatorias.push(firstLetter);
      
      // Mezclar las consonantes
      return consonantesAleatorias.sort(() => Math.random() - 0.5);
    }
  }

  showContainerCongrat() {
    // Crear el fondo con un círculo brillante
    const background = this.relatedScene.add.circle(0, 0, 150, 0xffd700, 0.8); // Círculo dorado con opacidad
    this.congratContainer.add(background).setVisible(true);

    // Agregar un gráfico de estrella
    const star = this.relatedScene.add.image(0, 0, 'recurso_star');
    star.setScale(1);
    this.congratContainer.add(star);

    // Crear partículas para un efecto más llamativo
    const particles = this.relatedScene.add.particles('particle'); // Asegúrate de cargar 'particle' en tus assets
    particles.createEmitter({
        x: 0,
        y: 0,
        speed: { min: -100, max: 100 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.5, end: 0 },
        lifespan: 1000,
        blendMode: 'ADD',
    });
    this.congratContainer.add(particles);

    // Animar el contenedor (escala creciente y decreciente)
    this.relatedScene.tweens.add({
      targets: this.congratContainer,
      scale: { from: 0.5, to: 1 },
      ease: 'Bounce.easeOut',
      duration: 1000,
      yoyo: true,
      repeat: 5, // -1 Repetir indefinidamente
    });
  }
}
