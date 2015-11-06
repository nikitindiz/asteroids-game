var env = require('./environment')
    , cleanCanvas = require('./canvas-helpers').cleanCanvas
    , ship = require('./ship')
    , kc = require('./key-controls')
    , degree = 0
    , timer = 0

    , radDegRatio = Math.PI/180

    , xSpeed = 0
    , ySpeed = 0
    , speedDelta = 0.05
    , speedLimit = 10

    , angleDelta = 5

    ;

// Canvas wrapper
// Can be used for adding special effects
env.init();
// Let's resize canvas each time we resize window
env.resizeCanvas();
window.addEventListener('resize',env.resizeCanvas.bind(env));

// Ship buffer
ship.init();

// Key controls
kc.init();

// Game loop
render();

function render(time) {
    requestAnimationFrame(render);
    cleanCanvas(env.canvas);

    if(kc.map[37] || kc.map[65]) ship.angle = ship.angle - angleDelta;
    if(kc.map[39] || kc.map[68]) ship.angle = ship.angle + angleDelta;

    ship.angle = ship.angle > 360
        ? 0
        : ship.angle;

    ship.angle = ship.angle < 0
        ? 360 - angleDelta
        : ship.angle;

    if(kc.map[87] || kc.map[38]) {
        var xSign = 1
            , ySign = 1
            , xDelta = speedDelta * Math.sin(radDegRatio*ship.angle)
            , yDelta = speedDelta * Math.cos(radDegRatio*ship.angle)
            ;

        xSpeed = Math.abs(xSpeed + xDelta * xSign) < speedLimit
            ? xSpeed + xDelta * xSign
            : xSpeed;
        ySpeed = Math.abs(ySpeed - yDelta * ySign) < speedLimit
            ? ySpeed - yDelta * ySign
            : ySpeed;

        console.log(xSpeed, ySpeed);
    }

    ship.posX = ship.posX+xSpeed;
    ship.posY = ship.posY+ySpeed;


    ship.draw(env.canvas);

}