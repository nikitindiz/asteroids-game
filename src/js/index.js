var env = require('./environment')
    , cleanCanvas = require('./canvas-helpers').cleanCanvas
    , ship = require('./ship')
    , degree = 0
    ;

env.init();
ship.init();
env.resizeCanvas();
window.addEventListener('resize',env.resizeCanvas.bind(env));

render();

function render(time) {

    requestAnimationFrame(render);

    cleanCanvas(env.canvas);
    ship.angle = ship.angle + 5;
    ship.posX = ship.posY = ship.posY + 0.02;
    ship.draw(env.ctx);

}

