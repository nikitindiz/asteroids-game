var env = require('./environment')
    , cleanCanvas = require('./canvas-helpers').cleanCanvas
    , ship = require('./ship')
    , weapon = require('./shot')
    , spaceRocks = require('./asteroids')
    , kc = require('./key-controls')

    , xSpeed = 0
    , ySpeed = 0
    , speedDelta = 0.05
    , speedLimit = 10

    , angleDelta = 5

    , didntShootYet = true

    ;

// Canvas wrapper. Will be used for adding special effects
env.init();

// Let's resize canvas each time we resize window
env.resizeCanvas();
window.addEventListener('resize',env.resizeCanvas.bind(env));

// Key controls
kc.init();
kc.up(32, function(){
    didntShootYet = true;
});

spaceRocks.materialize(200,200,45,(function(){return new Date();})().getTime());

// Game logic
render();

function render(time) {

    requestAnimationFrame(render);

    cleanCanvas(env.canvas);

    if(kc.map[37] || kc.map[65]) ship.angle = ship.angle - angleDelta;
    if(kc.map[39] || kc.map[68]) ship.angle = ship.angle + angleDelta;

    if(kc.map[87] || kc.map[38]) {
        // Speed Up
        var xSign = 1
            , ySign = 1
            , xDelta = ship.direction(speedDelta).x //speedDelta * Math.sin(radDegRatio*ship.angle)
            , yDelta = ship.direction(speedDelta).y //speedDelta * Math.cos(radDegRatio*ship.angle)
            ;

        xSpeed = Math.abs(xSpeed + xDelta * xSign) < speedLimit
            ? xSpeed + xDelta * xSign
            : xSpeed;
        ySpeed = Math.abs(ySpeed - yDelta * ySign) < speedLimit
            ? ySpeed - yDelta * ySign
            : ySpeed;

        ship.posX = ship.posX+xSpeed;
        ship.posY = ship.posY+ySpeed;


        env.ctx.beginPath();
        env.ctx.strokeStyle = 'white';
        env.ctx.lineWidth = 6;
        env.ctx.lineCap = 'round';

        env.ctx.moveTo(
            ship.posX - ship.direction(20).x
            , ship.posY + ship.direction(20).y
        );

        var dist = 25 + Math.random() * 30 * (Math.abs(xSpeed) + Math.abs(ySpeed))/2;

        env.ctx.lineTo(
            ship.posX - ship.direction(dist).x
            , ship.posY + ship.direction(dist).y
        );

        env.ctx.stroke();
        env.ctx.closePath();

        env.ctx.beginPath();
        env.ctx.strokeStyle = 'black';
        env.ctx.lineWidth = 5;

        env.ctx.moveTo(
            ship.posX - ship.direction(20).x
            , ship.posY + ship.direction(20).y
        );

        dist = 25 + Math.random() * 10 * (Math.abs(xSpeed) + Math.abs(ySpeed))/2;

        env.ctx.lineTo(
            ship.posX - ship.direction(dist).x
            , ship.posY + ship.direction(dist).y
        );

        env.ctx.stroke();
        env.ctx.closePath();

    } else {
        ship.posX = ship.posX+xSpeed;
        ship.posY = ship.posY+ySpeed;
    }

    if(kc.map[32]) {
        if(didntShootYet) {
            console.log('fire!');
            weapon.fire(ship.posX, ship.posY, ship.angle, (function(){return new Date();})().getTime());
            didntShootYet = false;
        }
    }

    weapon.drawBullets(env.canvas);

    spaceRocks.asteroids[0].angle = spaceRocks.asteroids[0].angle + 0.05;

    spaceRocks.draw(env.canvas);

    ship.draw(env.canvas);
}

