import Niveles from "./../components/Niveles.js?v1.0";
import Comun from "../services/Comun.js?v=1.0";

class Loading extends Phaser.Scene {
  constructor() {
    super('Loading');
    this.targetScene = null; // Escena objetivo
    this.niveles = new Niveles(this);
    this.comun = new Comun(this);   
  }

  init(data) {
    // Recibe el nombre de la escena a cargar desde los datos pasados al iniciar la escena
    this.targetScene = data.sceneToLoad || 'Intro'; // Valor predeterminado si no se proporciona una escena
    this.config = this.comun.getDataLocalStorage('gameConfig');
  }

  preload() {
    // Fondo de gradiente
    this.bgGradient = this.add.graphics();
    this.bgGradient.fillGradientStyle(0x123456, 0x654321, 0x321654, 0xabcdef, 1);
    this.bgGradient.fillRect(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height);

    this.controlBackGroundGradient();        

    this.loadingText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Loading...', {
        font: '32px Arial',
        fill: '#ffffff'
    }).setOrigin(0.5);

    // Crear el tween de escala para el efecto de rebote
    this.tweens.add({
        targets: this.loadingText,         // Objetivo de la animación
        scale: { from: 1, to: 1.2 },       // Escala (crecimiento y reducción)
        duration: 500,                     // Duración de cada pulso (en milisegundos)
        ease: 'Sine.easeInOut',            // Suavizado para un rebote natural
        yoyo: true,                        // Hace que la animación regrese a su escala original
        repeat: -1                         // Repite indefinidamente
    });

    // Configuración de colores y dimensiones
    const boxColor = 0x222222; // Color de fondo del cuadro
    const boxAlpha = 0.8;       // Transparencia del cuadro
    const borderRadius = 15;    // Radio de las esquinas redondeadas

    // Posición y tamaño del cuadro
    const boxX = 30, boxY = 300, boxWidth = 900, boxHeight = 30;

    // Dibujar el cuadro con bordes redondeados
    const progressBox = this.add.graphics();
    progressBox.fillStyle(boxColor, boxAlpha);
    progressBox.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, borderRadius); // Usa fillRoundedRect en lugar de fillRect

    // Barra de progreso
    const progressBar = this.add.graphics().setVisible(false);        

    // Actualizar la barra de progreso mientras se cargan los recursos
    this.load.on('progress', (value) => {
      progressBar.clear().setVisible(true);
      progressBar.fillGradientStyle(0x4ba3f7, 0x2196F3, 0x4ba3f7, 0x2196F3, 1);
      progressBar.fillRoundedRect(boxX + 5, boxY + 5, (boxWidth - 10) * value, boxHeight - 10, borderRadius - 5); // Resta un poco para el borde redondeado
      const percentage = (Math.floor(value * 100) == 100) ? '' : Math.floor(value * 100) + '%'; 
      this.loadingText.setText('Loading... ' + percentage);
    });       

    // Limpiar los gráficos al terminar la carga
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      this.loadingText.destroy();
    });

    // Partículas en movimiento
    this.createParticles();

    // Crear engranajes
    this.createGears();

    // Aquí carga los recursos en función de la escena objetivo
    this.load.path = './assets/';

    //Recursos para todas las scenas
    this.load
      .image('btn_listen',`img/icons/listen.png?${_autoVersionPhaser}`)
      .image('btn_todobien', `img/icons/todoBien.png?${_autoVersionPhaser}`)            
      .image('btn_home', `img/icons/home.png?${_autoVersionPhaser}`)
      .image('recurso_star', `img/niveles/star.png?${_autoVersionPhaser}`)

      .audio('winner', 'sonidos/winner.mp3')
    ;

    // cargar todos los stiker para que esten disponibles para la coleccion
    //stikers
    this.load
      .image('stiker_buho', 'img/niveles/safari/stiker_buho.png')
      .image('stiker_cerdo', 'img/niveles/safari/stiker_cerdo.png')
      .image('stiker_gato', 'img/niveles/safari/stiker_gato.png')
      .image('stiker_hormiga', 'img/niveles/safari/stiker_hormiga.png')
      .image('stiker_murcielago', 'img/niveles/safari/stiker_murcielago.png')
      .image('stiker_rata', 'img/niveles/safari/stiker_rata.png')
      .image('stiker_perro','img/niveles/safari/stiker_perro.png')
      .image('stiker_zorro', 'img/niveles/safari/stiker_zorro.png')

      .image('stiker_aguila', 'img/niveles/safari/stiker_aguila.png')
      .image('stiker_caballo', 'img/niveles/safari/stiker_caballo.png')
      .image('stiker_hipopotamo', 'img/niveles/safari/stiker_hipopotamo.png')
      .image('stiker_iguana', 'img/niveles/safari/stiker_iguana.png')
      .image('stiker_leon', 'img/niveles/safari/stiker_leon.png')
      .image('stiker_mono', 'img/niveles/safari/stiker_mono.png')
      .image('stiker_rana', 'img/niveles/safari/stiker_rana.png')
      .image('stiker_oso', 'img/niveles/safari/stiker_oso.png')
      .image('stiker_tigre', 'img/niveles/safari/stiker_tigre.png')
      .image('stiker_zebra', 'img/niveles/safari/stiker_zebra.png')

      .image('stiker_araña', 'img/niveles/safari/stiker_araña.png')
      .image('stiker_ardilla', 'img/niveles/safari/stiker_ardilla.png')
      .image('stiker_armadillo', 'img/niveles/safari/stiker_armadillo.png')
      .image('stiker_caiman', 'img/niveles/safari/stiker_caiman.png')
      .image('stiker_canguro', 'img/niveles/safari/stiker_canguro.png')
      .image('stiker_colibri', 'img/niveles/safari/stiker_colibri.png')
      .image('stiker_cucaracha', 'img/niveles/safari/stiker_cucaracha.png')
      .image('stiker_elefante', 'img/niveles/safari/stiker_elefante.png')
      .image('stiker_escorpion', 'img/niveles/safari/stiker_escorpion.png')
      .image('stiker_jirafa', 'img/niveles/safari/stiker_jirafa.png')
      .image('stiker_mariposa', 'img/niveles/safari/stiker_mariposa.png')
      .image('stiker_mariquita', 'img/niveles/safari/stiker_mariquita.png')
      .image('stiker_puercoespin', 'img/niveles/safari/stiker_puercoespin.png')
      .image('stiker_saltamontes','img/niveles/safari/stiker_saltamontes.png')
      .image('stiker_serpiente', 'img/niveles/safari/stiker_serpiente.png')
      .image('stiker_urraca', 'img/niveles/safari/stiker_urraca.png')
    ;

    // cargar todos los recursos de imagens para que esten disponibles para la coleccion
    this.load
      .image('recurso_buho', 'img/niveles/safari/buho.png')
      .image('recurso_cerdo', 'img/niveles/safari/cerdo.png')
      .image('recurso_gato', 'img/niveles/safari/gato.png')
      .image('recurso_hormiga', 'img/niveles/safari/hormiga.png')
      .image('recurso_murcielago', 'img/niveles/safari/murcielago.png')
      .image('recurso_rata', 'img/niveles/safari/rata.png')
      .image('recurso_perro','img/niveles/safari/perro.png')
      .image('recurso_zorro', 'img/niveles/safari/zorro.png')

      .image('recurso_aguila', 'img/niveles/safari/aguila.png')
      .image('recurso_caballo', 'img/niveles/safari/caballo.png')
      .image('recurso_hipopotamo', 'img/niveles/safari/hipopotamo.png')
      .image('recurso_iguana', 'img/niveles/safari/iguana.png')
      .image('recurso_leon', 'img/niveles/safari/leon.png')
      .image('recurso_mono', 'img/niveles/safari/mono.png')
      .image('recurso_rana', 'img/niveles/safari/rana.png')
      .image('recurso_oso', 'img/niveles/safari/oso.png')
      .image('recurso_tigre', 'img/niveles/safari/tigre.png')
      .image('recurso_zebra', 'img/niveles/safari/zebra.png')

      .image('recurso_araña', 'img/niveles/safari/araña.png')
      .image('recurso_ardilla', 'img/niveles/safari/ardilla.png')
      .image('recurso_armadillo', 'img/niveles/safari/armadillo.png')
      .image('recurso_caiman', 'img/niveles/safari/caiman.png')
      .image('recurso_canguro', 'img/niveles/safari/canguro.png')
      .image('recurso_colibri', 'img/niveles/safari/colibri.png')
      .image('recurso_cucaracha', 'img/niveles/safari/cucaracha.png')
      .image('recurso_elefante', 'img/niveles/safari/elefante.png')
      .image('recurso_escorpion', 'img/niveles/safari/escorpion.png')
      .image('recurso_jirafa', 'img/niveles/safari/jirafa.png')
      .image('recurso_mariposa', 'img/niveles/safari/mariposa.png')
      .image('recurso_mariquita', 'img/niveles/safari/mariquita.png')
      .image('recurso_puercoespin', 'img/niveles/safari/puercoespin.png')
      .image('recurso_saltamontes','img/niveles/safari/saltamontes.png')
      .image('recurso_serpiente', 'img/niveles/safari/serpiente.png')
      .image('recurso_urraca', 'img/niveles/safari/urraca.png')
    ;

    // cargar todos los translates para que esten disponibles para la collection
    this.load
      .audio('translate_buho', 'sonidos/translate_buho.mp3')
      .audio('translate_cerdo', 'sonidos/translate_cerdo.mp3')
      .audio('translate_gato', 'sonidos/translate_gato.mp3')
      .audio('translate_hormiga', 'sonidos/translate_hormiga.mp3')
      .audio('translate_murcielago', 'sonidos/translate_murcielago.mp3')
      .audio('translate_rata', 'sonidos/translate_rata.mp3')
      .audio('translate_perro','sonidos/translate_perro.mp3')
      .audio('translate_zorro', 'sonidos/translate_zorro.mp3')

      .audio('translate_aguila', 'sonidos/translate_aguila.mp3')
      .audio('translate_caballo', 'sonidos/translate_caballo.mp3')
      .audio('translate_hipopotamo', 'sonidos/translate_hipopotamo.mp3')
      .audio('translate_iguana', 'sonidos/translate_iguana.mp3')
      .audio('translate_leon', 'sonidos/translate_leon.mp3')
      .audio('translate_mono', 'sonidos/translate_mono.mp3')
      .audio('translate_rana', 'sonidos/translate_rana.mp3')
      .audio('translate_oso', 'sonidos/translate_oso.mp3')
      .audio('translate_tigre', 'sonidos/translate_tigre.mp3')
      .audio('translate_zebra', 'sonidos/translate_zebra.mp3')

      .audio('translate_araña', 'sonidos/translate_araña.mp3')
      .audio('translate_ardilla', 'sonidos/translate_ardilla.mp3')
      .audio('translate_armadillo', 'sonidos/translate_armadillo.mp3')
      .audio('translate_caiman', 'sonidos/translate_caiman.mp3')
      .audio('translate_canguro', 'sonidos/translate_canguro.mp3')
      .audio('translate_colibri', 'sonidos/translate_colibri.mp3')
      .audio('translate_cucaracha', 'sonidos/translate_cucaracha.mp3')
      .audio('translate_elefante', 'sonidos/translate_elefante.mp3')
      .audio('translate_escorpion', 'sonidos/translate_escorpion.mp3')
      .audio('translate_jirafa', 'sonidos/translate_jirafa.mp3')
      .audio('translate_mariposa', 'sonidos/translate_mariposa.mp3')
      .audio('translate_mariquita', 'sonidos/translate_mariquita.mp3')
      .audio('translate_puercoespin', 'sonidos/translate_puercoespin.mp3')
      .audio('translate_saltamontes','sonidos/translate_saltamontes.mp3')
      .audio('translate_serpiente', 'sonidos/translate_serpiente.mp3')
      .audio('translate_urraca', 'sonidos/translate_urraca.mp3')
      
      // Translate solo nombre del animal
      .audio('translate_only_buho', 'sonidos/owl.mp3')
      .audio('translate_only_cerdo', 'sonidos/pig.mp3')
      .audio('translate_only_gato', 'sonidos/cat.mp3')
      .audio('translate_only_hormiga', 'sonidos/ant.mp3')
      .audio('translate_only_murcielago', 'sonidos/bat.mp3')
      .audio('translate_only_rata', 'sonidos/rat.mp3')
      .audio('translate_only_perro','sonidos/dog.mp3')
      .audio('translate_only_zorro', 'sonidos/fox.mp3')      

      .audio('translate_only_aguila', 'sonidos/eagle.mp3')
      .audio('translate_only_caballo', 'sonidos/horse.mp3')
      .audio('translate_only_hipopotamo', 'sonidos/hippo.mp3')
      .audio('translate_only_iguana', 'sonidos/iguanaENG.mp3')
      .audio('translate_only_leon', 'sonidos/lion.mp3')
      .audio('translate_only_mono', 'sonidos/monkey.mp3')
      .audio('translate_only_rana', 'sonidos/frog.mp3')
      .audio('translate_only_oso', 'sonidos/bear.mp3')
      .audio('translate_only_tigre', 'sonidos/tiger.mp3')
      .audio('translate_only_zebra', 'sonidos/zebraENG.mp3')

      .audio('translate_only_araña', 'sonidos/spider.mp3')
      .audio('translate_only_ardilla', 'sonidos/squirrel.mp3')
      .audio('translate_only_armadillo', 'sonidos/armadilloENG.mp3')
      .audio('translate_only_caiman', 'sonidos/alligator.mp3')
      .audio('translate_only_canguro', 'sonidos/kangaroo.mp3')
      .audio('translate_only_colibri', 'sonidos/hummingbird.mp3')
      .audio('translate_only_cucaracha', 'sonidos/cockroach.mp3')
      .audio('translate_only_elefante', 'sonidos/elephant.mp3')
      .audio('translate_only_escorpion', 'sonidos/scorpion.mp3')
      .audio('translate_only_jirafa', 'sonidos/giraffe.mp3')
      .audio('translate_only_mariposa', 'sonidos/butterfly.mp3')
      .audio('translate_only_mariquita', 'sonidos/ladybug.mp3')
      .audio('translate_only_puercoespin', 'sonidos/porcupine.mp3')
      .audio('translate_only_saltamontes','sonidos/grasshopper.mp3')
      .audio('translate_only_serpiente', 'sonidos/snake.mp3')
      .audio('translate_only_urraca', 'sonidos/magpie.mp3')    
    ;

    switch (this.targetScene) {
      case 'Intro':
        //recursos para el menu
        this.load
          .image('menu_context', `img/menu/menu.png?${_autoVersionPhaser}`)
          .image('btn_jugar', `img/menu/btn_jugar.png?${_autoVersionPhaser}`)
          .image('btn_coleccion', `img/menu/btn_coleccion.png?${_autoVersionPhaser}`)
          .image('btn_reiniciar', `img/menu/btn_reiniciar.png?${_autoVersionPhaser}`)
          .image('btn_close', `img/menu/btn_close.png?${_autoVersionPhaser}`)
          .image('btn_prev', `img/menu/btn_prev.png?${_autoVersionPhaser}`)
          .image('btn_next', `img/menu/btn_next.png?${_autoVersionPhaser}`)
        ;
        
        //recursos del componente niveles
        this.load
          .image('bgLevels', `img/backgrounds/bg_levels.png?${_autoVersionPhaser}`)          

          //Niveles
          .image('safari_easy', `img/niveles/safari.png?${_autoVersionPhaser}`)
          .image('safari_normal', `img/niveles/safari_normal.png?${_autoVersionPhaser}`)
          .image('safari_hard', `img/niveles/safari_hard.png?${_autoVersionPhaser}`)

          //audios
          .audio('sound_indications', 'sonidos/indications.mp3')          

          //bg par alas indicaciones de cada nivel
          .image('bg_ScenePpal_indications', `img/backgrounds/bg_ScenePpal_indications.png?${_autoVersionPhaser}`)
        ;

        this.load
          .image('backgroundIntro',`img/backgrounds/backgroundIntro.png?${_autoVersionPhaser}`)
          .image('bgOverlay',`img/backgrounds/overlay_black.png?${_autoVersionPhaser}`)
          .image('btn_music',`img/icons/music_on.png?${_autoVersionPhaser}`)
        ;                
        this.load.audio('backgroundMusic', 'sonidos/bg_Intro.mp3');       
      break;

      case 'ScenePpal':
        //definir el nivel seleccionado
        const level = this.config.difficulty;

        // parallax y player
        this.load.image('parallaxLayer1', 'img/backgrounds/parallax_layer_1.png');
        this.load.image('parallaxLayer2', 'img/backgrounds/parallax_layer_2.png');
        this.load.image('parallaxLayer3', 'img/backgrounds/parallax_layer_3.png');
        this.load.image('parallaxLayer4', 'img/backgrounds/parallax_layer_4.png');
        this.load.image('parallaxLayer5', 'img/backgrounds/parallax_layer_5.png');
        this.load.image('parallaxLayer6', 'img/backgrounds/parallax_layer_6.png');
        this.load.image('lupa', 'img/lupa.png');

        // Sonidos
        this.load
          .audio('soundTheme', 'sonidos/soundTheme.mp3')
          .audio('soundMotor', 'sonidos/motor_effect.mp3')

          .audio('encuentra_letra', 'sonidos/encuentraLetra.mp3')
          .audio('bien_hecho', 'sonidos/bienHecho.mp3')
          .audio('letra_a', 'sonidos/letraA.mp3')
          .audio('letra_e', 'sonidos/letraE.mp3')
          .audio('letra_i', 'sonidos/letraE.mp3')
          .audio('letra_o', 'sonidos/letraO.mp3')
          .audio('letra_u', 'sonidos/letraU.mp3')
          .audio('letra_b', 'sonidos/letraB.mp3')
          .audio('letra_c', 'sonidos/letraC.mp3')
          .audio('letra_g', 'sonidos/letraG.mp3')
          .audio('letra_h', 'sonidos/letraH.mp3')
          .audio('letra_j', 'sonidos/letraJ.mp3')
          .audio('letra_m', 'sonidos/letraM.mp3')
          .audio('letra_l', 'sonidos/letraL.mp3')
          .audio('letra_p', 'sonidos/letraP.mp3')
          .audio('letra_r', 'sonidos/letraR.mp3')
          .audio('letra_s', 'sonidos/letraS.mp3')
          .audio('letra_t', 'sonidos/letraT.mp3')
          .audio('letra_z', 'sonidos/letraZ.mp3')
        ;

        switch (level) {
          case 'easy':
            this.load.spritesheet('jeepSprite_easy', `img/player/jeep_spritesheet.png?${_autoVersionPhaser}`, { frameWidth: 256, frameHeight: 256 });

            // audios
            this.load              
              .audio('animal_buho', 'sonidos/buho.mp3')
              .audio('animal_cerdo', 'sonidos/cerdo.mp3')
              .audio('animal_gato', 'sonidos/gato.mp3')
              .audio('animal_hormiga', 'sonidos/hormiga.mp3')
              .audio('animal_murcielago', 'sonidos/murcielago.mp3')
              .audio('animal_rata', 'sonidos/rata.mp3')
              .audio('animal_perro','sonidos/perro.mp3')
              .audio('animal_zorro', 'sonidos/zorro.mp3')
            ;
            break;

          case 'normal':
            this.load.spritesheet('jeepSprite_normal', `img/player/jeep_spritesheet_normal.png?${_autoVersionPhaser}`, { frameWidth: 256, frameHeight: 256 });
            
            // Sonidos
            this.load
              .audio('animal_aguila', 'sonidos/aguila.mp3')
              .audio('animal_caballo', 'sonidos/caballo.mp3')
              .audio('animal_hipopotamo', 'sonidos/hipopotamo.mp3')
              .audio('animal_iguana', 'sonidos/iguana.mp3')
              .audio('animal_leon', 'sonidos/leon.mp3')
              .audio('animal_mono', 'sonidos/mono.mp3')
              .audio('animal_rana', 'sonidos/rana.mp3')
              .audio('animal_oso', 'sonidos/oso.mp3')
              .audio('animal_tigre', 'sonidos/tigre.mp3')
              .audio('animal_zebra', 'sonidos/zebra.mp3')
            ;
            break;

          case 'hard':
            this.load.spritesheet('jeepSprite_hard', `img/player/jeep_spritesheet_hard.png?${_autoVersionPhaser}`, { frameWidth: 256, frameHeight: 256 });
            
            // Sonidos
            this.load
              .audio('animal_araña', 'sonidos/araña.mp3')
              .audio('animal_ardilla', 'sonidos/ardilla.mp3')
              .audio('animal_armadillo', 'sonidos/armadillo.mp3')
              .audio('animal_caiman', 'sonidos/caiman.mp3')
              .audio('animal_canguro', 'sonidos/canguro.mp3')
              .audio('animal_colibri', 'sonidos/colibri.mp3')
              .audio('animal_cucaracha', 'sonidos/cucaracha.mp3')
              .audio('animal_elefante', 'sonidos/elefante.mp3')
              .audio('animal_escorpion', 'sonidos/escorpion.mp3')
              .audio('animal_jirafa', 'sonidos/jirafa.mp3')
              .audio('animal_mariposa', 'sonidos/mariposa.mp3')
              .audio('animal_mariquita', 'sonidos/mariquita.mp3')
              .audio('animal_puercoespin', 'sonidos/puercoespin.mp3')
              .audio('animal_saltamontes','sonidos/saltamontes.mp3')
              .audio('animal_serpiente', 'sonidos/serpiente.mp3')
              .audio('animal_urraca', 'sonidos/urraca.mp3')
            ;
            break;
        
          default:
            break;
        }        
      break;      
      
      default:
          break;
    }
      
  }

  create() {
      // Cuando los recursos estén completamente cargados, inicia la escena objetivo
      this.scene.start(this.targetScene);
  }

  createParticles() {
      // Crea un pequeño círculo como textura de partícula
      const particleGraphics = this.add.graphics();
      particleGraphics.fillStyle(0xffffff, 1);
      particleGraphics.fillCircle(5, 5, 5);
      particleGraphics.generateTexture('particle', 10, 10);
      particleGraphics.destroy();

      // Crear un emisor de partículas
      const particles = this.add.particles('particle');
      particles.createEmitter({
          x: { min: 0, max: this.sys.game.canvas.width },
          y: { min: 0, max: this.sys.game.canvas.height },
          speed: { min: -20, max: 20 },
          angle: { min: 0, max: 360 },
          scale: { start: 0.5, end: 0 },
          alpha: { start: 1, end: 0 },
          lifespan: 3000,
          frequency: 100,
          quantity: 2,
          blendMode: 'ADD'
      });
  }

  controlBackGroundGradient() {
      // Crear el rectángulo del fondo
      this.bgGradient = this.add.graphics();

      // Variables para los colores del degradado
      this.color1 = Phaser.Display.Color.RandomRGB();
      this.color2 = Phaser.Display.Color.RandomRGB();
      this.colorStep = 0.01;  // Paso de transición entre colores (velocidad de cambio)

      // Dibujar el fondo inicial
      this.drawGradientBackground();

      // Evento de tiempo para actualizar el fondo regularmente
      this.time.addEvent({
          delay: 50, // Intervalo de tiempo en milisegundos entre cambios
          callback: this.updateGradientColors,
          callbackScope: this,
          loop: true
      });
  }

  drawGradientBackground() {
      // Limpiar el gráfico anterior
      this.bgGradient.clear();

      // Crear el degradado usando `fillGradientStyle`
      this.bgGradient.fillGradientStyle(
          this.color1.color, this.color2.color, 
          this.color2.color, this.color1.color, 1
      );
      
      // Dibuja un rectángulo que cubra toda la pantalla
      this.bgGradient.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
  }

  updateGradientColors() {
      // Interpolar entre colores para suavizar la transición
      this.color1 = Phaser.Display.Color.Interpolate.ColorWithColor(
          this.color1, Phaser.Display.Color.RandomRGB(), 100, 1
      );
      this.color2 = Phaser.Display.Color.Interpolate.ColorWithColor(
          this.color2, Phaser.Display.Color.RandomRGB(), 100, 1
      );

      // Convertir de objeto interpolado a color Phaser.Color
      this.color1 = new Phaser.Display.Color(
          this.color1.r, this.color1.g, this.color1.b
      );
      this.color2 = new Phaser.Display.Color(
          this.color2.r, this.color2.g, this.color2.b
      );

      // Volver a dibujar el fondo con los colores actualizados
      this.drawGradientBackground();
  }

  createGears() {
      const centerX = this.cameras.main.centerX;
      const centerY = this.cameras.main.centerY;

      // Crear engranajes
      this.gear1 = this.add.graphics({ x: centerX - 50, y: centerY -100 });
      this.gear2 = this.add.graphics({ x: centerX + 50, y: centerY -100});

      this.drawGear(this.gear1, 50, 10, 8, 0xffffff);
      this.drawGear(this.gear2, 40, 8, 12, 0xaaaaaa);

      // Animar engranajes
      this.tweens.add({
          targets: this.gear1,
          angle: 360,
          duration: 2000,
          repeat: -1
      });

      this.tweens.add({
          targets: this.gear2,
          angle: -360,
          duration: 1000,
          repeat: -1
      });
  }

  drawGear(graphics, radius, toothHeight, toothCount, color) {
      const stepAngle = Phaser.Math.PI2 / toothCount;
      const innerRadius = radius - toothHeight;

      graphics.fillStyle(color, 1);
      graphics.beginPath();

      for (let i = 0; i < toothCount; i++) {
          const angle1 = i * stepAngle;
          const angle2 = angle1 + stepAngle / 2;
          const angle3 = (i + 1) * stepAngle;

          const x1 = Math.cos(angle1) * innerRadius;
          const y1 = Math.sin(angle1) * innerRadius;
          const x2 = Math.cos(angle2) * radius;
          const y2 = Math.sin(angle2) * radius;
          const x3 = Math.cos(angle3) * innerRadius;
          const y3 = Math.sin(angle3) * innerRadius;

          if (i === 0) {
              graphics.moveTo(x1, y1);
          }

          graphics.lineTo(x2, y2);
          graphics.lineTo(x3, y3);
      }

      graphics.closePath();
      graphics.fillPath();

      // Agregar un círculo central
      graphics.fillStyle(0x000000, 1);
      graphics.fillCircle(0, 0, radius / 4);
  }
}

export default Loading;