import Scene from './Scene';
import Footer from '../components/Footer';
import Rocket1 from '../components/rockets/Rocket1';
import Arrow from '../components/Arrow';
import Stats from '../components/Stats';
import Rocket2 from '../components/rockets/Rocket2';
import Rocket3 from '../components/rockets/Rocket3';
import Rocket4 from '../components/rockets/Rocket4';

export default class Play extends Scene {
  async onCreated() {

    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = (window.innerHeight / 2) - footer.height;
    this.addChild(footer);

    this._rockets = [
      new Rocket1(),
      new Rocket2(),
      new Rocket3(),
      new Rocket4()
    ];
    this._active = null;

    const arrowLeft = new Arrow();
    arrowLeft.name = 'arrow-left';
    arrowLeft.x = -500;
    arrowLeft.on('click', () => this.prev());
    this.addChild(arrowLeft);

    const arrowRight = new Arrow();
    arrowRight.name = 'arrow-right';
    arrowRight.x = 500;
    arrowRight.rotation = 1
    arrowRight.on('click', () => this.next());
    this.addChild(arrowRight);

    this._stats = new Stats({
      data: {
        speed: {
          label: 'Speed',
          value: this._rockets[0].speed
        },
        handling: {
          label: 'Handling',
          value: this._rockets[0].handling
        },
        acceleration: {
          label: 'Acceleration',
          value: this._rockets[0].acceleration
        }
      }
    });
    this._stats.y = 130;
    this.addChild(this._stats);

    this.setRocket(0);
  }

  setRocket(index) {
    this._rockets.forEach((r) => this.removeChild(r));
    const rocket = this._rockets[index];
    
    // this.removeChild(this._stats)
    // this._stats = new Stats({
    //   data: {
    //     speed: {
    //       label: 'Speed',
    //       value: rocket.speed
    //     },
    //     handling: {
    //       label: 'Handling',
    //       value: rocket.handling
    //     },
    //     acceleration: {
    //       label: 'Acceleration',
    //       value: rocket.acceleration
    //     }
    //   }
    // });
    // this._stats.y = 130;
    // this.addChild(this._stats);
    
    rocket.show();
    rocket.y = -150;
    this.addChild(rocket);
    this._stats.set({
      acceleration: rocket.acceleration,
      speed: rocket.speed,
      handling: rocket.handling,
    })

    this._active = index;
  }

  next() {
    const index = this._active < this._rockets.length - 1 ? this._active + 1 : 0;
    this.setRocket(index);
  }

  prev() {
    const index = this._active > 0 ? this._active - 1 : this._rockets.length - 1;
    this.setRocket(index);
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) { // eslint-disable-line no-unused-vars

  }
}
