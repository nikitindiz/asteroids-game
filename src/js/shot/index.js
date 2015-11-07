var cleanCanvas = require('../canvas-helpers').cleanCanvas
    , radDegRatio = Math.PI/180
    , Shape = require('../shape')

    , bulletSpeed = 1000
    , maxDistance = Math.sqrt(window.innerWidth*window.innerWidth + window.innerHeight*window.innerHeight) / 20

    ;

window.addEventListener('resize', function(){
    maxDistance = Math.sqrt(window.innerWidth*window.innerWidth + window.innerHeight*window.innerHeight) / 20;
});

var shot = {
    "fire" : function(startX, startY, angle, shootTime){

        console.log('pew pew');
        console.log(arguments);

        var my = this
            , w = 10
            , h = 15
            , bullet = new Shape(startX, startY, w, h)
        ;

        bullet.shape = function(canvas){

            var ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.fillRect(-canvas.width/4,-canvas.height/4,canvas.width/2,canvas.height/2);
            ctx.closePath();

            return canvas;
        };

        // bullet.boundingBoxColor = 'rgba(0,0,255,0.5)';
        bullet.angle = angle;
        bullet.shootTime = shootTime;
        bullet.distance = 0;

        my.bullets = my.bullets || [];

        my.bullets.push(bullet);

    }
    , "drawBullets" : function(canvas){
        if(this.bullets && this.bullets.length) {

            var bulletsCounter = this.bullets.length;

            while(bulletsCounter--) {

                var bullet = this.bullets[bulletsCounter];

                if(bullet) {
                    var currentTime = (function(){return new Date();})().getTime()
                        , timeDelta = (currentTime - bullet.shootTime) / 1000
                        ;

                    bullet.shootTime = currentTime;
                    bullet.posX = bullet.posX + bullet.direction(bulletSpeed * timeDelta).x;
                    bullet.posY = bullet.posY - bullet.direction(bulletSpeed * timeDelta).y;
                    bullet.draw(canvas);
                    bullet.distance++;

                    if(bullet.distance > maxDistance) {
                        this.bullets[bulletsCounter] = false;
                    }
                }

                this.bullets = this.bullets.filter(Boolean);

            }

        }
    }
};

module.exports = shot;