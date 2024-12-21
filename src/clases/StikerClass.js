export default class StikerClass extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
      super(physicsWorld, scene);
      this.scene = scene;

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
      console.log('nuevo stiker');
      this.defineStikers(tipo);
      const heightPosibles = [400];
      let heightAleatorio = Phaser.Math.RND.pick(heightPosibles);
      const stikerAleatorio = this.getRandomSticker();

      // Determinar dirección aleatoria (true = izquierda, false = derecha)
      let desdeIzquierda = Phaser.Math.RND.pick([true, false]);
      console.log('desde la izquierda;: ',desdeIzquierda);

      switch (stikerAleatorio) {
        case 'stiker_aguila':
        case 'stiker_urraca':
          desdeIzquierda = false;
          heightAleatorio = Phaser.Math.RND.pick([100,200]);        
          break;
      
        default:
          break;
      }

      // Posición X y velocidad dependiendo de la dirección
      const posicionX = desdeIzquierda ? -200 : 960 + 200;
      const velocidadX = desdeIzquierda ? 60 : -60;

      const sticker = this.create(posicionX, heightAleatorio, stikerAleatorio)
        .setActive(true)
        .setVisible(true)
        .setCollideWorldBounds(false)
        .setDepth(6)
        .setScale(0.5)
        .setBounce(1, 1)
        .setVelocityX(velocidadX)
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
        case 'safari':
          stikers = [
            'stiker_aguila',
            'stiker_elefante',
            'stiker_hipopotamo',
            'stiker_iguana',
            'stiker_jirafa',
            'stiker_leon',
            'stiker_oso',
            'stiker_tigre',
            'stiker_urraca',
            'stiker_zebra',
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
}