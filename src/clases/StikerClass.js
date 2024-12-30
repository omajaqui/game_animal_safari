export default class StikerClass extends Phaser.Physics.Arcade.Group {
  constructor(physicsWorld, scene) {
    super(physicsWorld, scene);
    this.relateScene = scene;

    this.availableStickers = [];
    this.selectedStickers = [];
  }

  resetStickers() {
    // Resetea la lista cuando todos los stickers han sido seleccionados
    this.availableStickers = this.selectedStickers.slice();
    this.selectedStickers = [];
  }

  getRandomSticker() {
    if (this.availableStickers.length === 0) {
        this.resetStickers();
    }
    const sticker = Phaser.Math.RND.pick(this.availableStickers);
    this.availableStickers = this.availableStickers.filter(s => s !== sticker);
    this.selectedStickers.push(sticker);
    return sticker;
  }

  newItem(tipo) {
    //console.log('nuevo stiker');
    this.defineStikers(tipo);
    const heightPosibles = [400];
    let heightAleatorio = Phaser.Math.RND.pick(heightPosibles);
    const stikerAleatorio = this.getRandomSticker();

    // Determinar dirección aleatoria (true = izquierda, false = derecha)
    let desdeIzquierda = Phaser.Math.RND.pick([true, false]);
    let scale = 0.5;
    let deep = 6;
    desdeIzquierda = false;
    // Posición X y velocidad dependiendo de la dirección
    const posicionX = desdeIzquierda ? -200 : 960 + 200;
    let velocidadX = desdeIzquierda ? 60 : -25;

    switch (stikerAleatorio) {
      case 'stiker_aguila':
      case 'stiker_urraca':
      case 'stiker_mariposa':
      case 'stiker_colibri':
      case 'stiker_buho':
      case 'stiker_murcielago':
        deep = 4;          
        heightAleatorio = Phaser.Math.RND.pick([100,200]);
        velocidadX = -80;
        break;

      case 'stiker_elefante':
      case 'stiker_jirafa':
        deep = 4;
        scale = 1;
        velocidadX = -60;
        break;

      case 'stiker_tigre':
      case 'stiker_leon':
        deep = 4;
        velocidadX = -60;
        break;    
      default:
        break;
    }     

    const sticker = this.create(posicionX, heightAleatorio, stikerAleatorio)
      .setActive(true)
      .setVisible(true)
      .setCollideWorldBounds(false)
      .setDepth(deep)
      .setScale(scale)
      .setBounce(1, 1)
      .setVelocityX(velocidadX)
      .setInteractive()
      .on('pointerdown', () => this.relateScene.handleClick(sticker))
    ;
      
    // Inicia la animación de latido
    //this.applyHeartbeatAnimation(sticker);
    return sticker;
  }    

  applyHeartbeatAnimation(sticker) {
    // Crea una animación estilo "latido de corazón"
    this.scene.tweens.add({
      targets: sticker,
      scaleX: 0.6,
      scaleY: 0.6,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      duration: 500,
    });
  }

  defineStikers(tipo) {
    let stikers = [];
    switch (tipo) {
      case 'easy':
        stikers = [
          'stiker_buho',
          'stiker_cerdo',
          'stiker_gato',
          'stiker_hormiga',
          'stiker_murcielago',
          'stiker_rata',
          'stiker_perro',
          'stiker_zorro',
        ];
      break;

      case 'normal':
        stikers = [
          'stiker_aguila',
          'stiker_caballo',
          'stiker_hipopotamo',
          'stiker_iguana',
          'stiker_leon',
          'stiker_mono',
          'stiker_rana',
          'stiker_oso',
          'stiker_tigre',
          'stiker_zebra',
        ];
      break;

      case 'hard':
        stikers = [
          'stiker_araña',
          'stiker_ardilla',
          'stiker_armadillo',
          'stiker_caiman',
          'stiker_canguro',
          'stiker_colibri',
          'stiker_cucaracha',
          'stiker_elefante',
          'stiker_escorpion',
          'stiker_jirafa',
          'stiker_mariposa',
          'stiker_mariquita',
          'stiker_puercoespin',
          'stiker_saltamontes',
          'stiker_serpiente',
          'stiker_urraca',
        ];
      break; 
    
      default:
        break;
    }

    this.availableStickers = [];
    if(this.selectedStickers.length > 0) {
      // Establecer los estikers que no esten en this.selectedStickers
      for (let i in stikers) {
        if (!this.selectedStickers.includes(stikers[i])) {
          this.availableStickers.push(stikers[i]);
        }
      }
    } else {
      this.availableStickers = stikers;
    }
  }

  setVisibility(isVisible) {
    this.children.each((child) => {
      child.setVisible(isVisible);
      child.setActive(isVisible);
    });
  }
}