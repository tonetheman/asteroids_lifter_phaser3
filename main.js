
let Body = Phaser.Physics.Matter.Matter.Body;
let Vector = Phaser.Physics.Matter.Matter.Vector;
const DIR = 64;
const W = 800;
const H = 600;

class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
        this.ship = null;
    }

    create() {
        this.matter.world.setBounds(0, 0, W, H, 32, true, true, false, true);
        this.tone_keyboard = this.input.keyboard.createCursorKeys();
        //console.log(Phaser.Physics.Matter.Matter);
        let vertices = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: -20 }];
        //let ship = Phaser.Physics.Matter.Matter.Bodies.fromVertices(0,0,
        //    vertices,
        //    {
        //        resitution : 0.5
        //    });
        this.ship = this.matter.add.fromVertices(100,100,vertices,
            {
                resitution : 0.4
            });
        
        //this.input.on("pointerdown", this.ship_thrust, this);
        //console.log(this.ship);
    }

    //https://github.com/fmilitao/2.worlds.1.asteroid.field/blob/master/main.ts


    ship_left() {
        Body.rotate(this.ship, -Math.PI / DIR);
        Body.setAngularVelocity(this.ship,0);
    }
    ship_right() {
        Body.rotate(this.ship, Math.PI/DIR);
        Body.setAngularVelocity(this.ship,0);
    }

    ship_thrust() {
        const forceMagnitude = 0.002 * this.ship.mass;
        let v = Vector.rotate({ x: 0, y: -forceMagnitude }, 
            this.ship.angle);
        Body.applyForce(this.ship,this.ship.position,v);
    }

    update() {
        if (this.tone_keyboard.up.isDown) {
            this.ship_thrust();
        }
        if (this.tone_keyboard.left.isDown) {
            this.ship_left();
        }
        if (this.tone_keyboard.right.isDown) {
            this.ship_right();
        }
    }

}

function main() {
    let gameConfig = {
        width : W,
        height : H,
        pixelArt : true,
        type : Phaser.AUTO,
        physics : {
            default : "matter",
            scale : {
                mode: Phaser.Scale.FIT
            },
            matter : {
                debug : true,
                debugBodyColor: 0xff0000
            }
        },
        scene: [
            GameScene
        ]
    };
    let game = new Phaser.Game(gameConfig);
}

window.onload = main;