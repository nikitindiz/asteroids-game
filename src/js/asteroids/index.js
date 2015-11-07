var Shape = require('../shape')

    , asteroidSpeed = 100

    ;

var asteroids = {
    "materialize" : function(startX, startY, angle, shootTime){

        var my = this
            , w = 110
            , h = 110
            , asteroid = new Shape(startX, startY, w, h)
            ;

        asteroid.shape = function(canvas){

            var ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.fillStyle = 'rgba(1,1,1,1)';
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;

            ctx.moveTo(0,30);
            ctx.lineTo(10,20);
            ctx.lineTo(20,30);
            ctx.lineTo(20,30);
            ctx.lineTo(30,30);
            ctx.lineTo(40,20);
            ctx.lineTo(40,10);
            ctx.lineTo(50,0);
            ctx.lineTo(50,-10);
            ctx.lineTo(40,-20);
            ctx.lineTo(30,-30);
            ctx.lineTo(20,-30);
            ctx.lineTo(10,-40);
            ctx.lineTo(0,-40);
            ctx.lineTo(-10,-50);
            ctx.lineTo(-20,-50);
            ctx.lineTo(-30,-40);
            ctx.lineTo(-30,-30);
            ctx.lineTo(-40,-20);
            ctx.lineTo(-40,-10);
            ctx.lineTo(-50,0);
            ctx.lineTo(-50,10);
            ctx.lineTo(-40,20);
            ctx.lineTo(-40,30);
            ctx.lineTo(-30,40);
            ctx.lineTo(-20,40);
            ctx.lineTo(-10,30);
            ctx.lineTo(0,30);

            ctx.stroke();
            ctx.fill();
            //ctx.fillRect(-canvas.width/4,-canvas.height/4,canvas.width/2,canvas.height/2);
            ctx.closePath();

            return canvas;
        };

        //asteroid.boundingBoxColor = 'rgba(0,0,255,0.5)';
        asteroid.angle = angle;
        asteroid.shootTime = shootTime;
        asteroid.distance = 0;

        my.asteroids = my.asteroids || [];

        my.asteroids.push(asteroid);

    }
    , "draw" : function(canvas){
        if(this.asteroids && this.asteroids.length) {

            var bulletsCounter = this.asteroids.length;

            while(bulletsCounter--) {

                var asteroid = this.asteroids[bulletsCounter];

                if(asteroid) {
                    var currentTime = (function(){return new Date();})().getTime()
                        , timeDelta = (currentTime - asteroid.shootTime) / 1000
                        ;

                    asteroid.shootTime = currentTime;
                    asteroid.posX = asteroid.posX + asteroid.direction(asteroidSpeed * timeDelta).x;
                    asteroid.posY = asteroid.posY - asteroid.direction(asteroidSpeed * timeDelta).y;
                    asteroid.draw(canvas);
                    asteroid.distance++;

                }

                this.asteroids = this.asteroids.filter(Boolean);

            }

        }
    }
};

module.exports = asteroids;