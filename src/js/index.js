var env = require('./environment')
    , cleanCanvas = require('./canvas-helpers').cleanCanvas
    , ship = require('./ship')
    , degree = 0
    ;

env.init();
ship.init();

// ship.posX = 1250;

env.resizeCanvas();
window.addEventListener('resize',env.resizeCanvas.bind(env));

render();

function render(time) {

    requestAnimationFrame(render);

    cleanCanvas(env.canvas);
    ship.angle = ship.angle + 0.5;
    ship.posX = ship.posX+1;
    ship.posY = ship.posY+2; //ship.posY + 10;
    ship.draw(env.canvas);

}

