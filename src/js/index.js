var env = require('./environment')
    , degree = 0
    ;

env.init();
env.resizeCanvas();

window.addEventListener('resize',env.resizeCanvas.bind(env));

render();

function drawShip(){
    var ctx = env.ctx

        , u = 20 // ship scale, 15 is default
        , s = 4 // stroke width
        , x = 0
        , y = 0
        , wh = Math.sqrt( (((u+s)*2) * ((u+s)*2))*2 ) // width and height are the same, since we draw in a square

        , bufferCanvas = document.createElement('canvas')
        , bctx = bufferCanvas.getContext('2d')

        ;

    degree = degree + 1;

    bufferCanvas.width = bufferCanvas.height = wh;

    bctx.save();
    bctx.translate(wh/2,wh/2);
    bctx.rotate((Math.PI/180)*degree);
    bctx.beginPath();
    bctx.strokeStyle = 'white';
    bctx.lineWidth = s;
    bctx.moveTo(x, y-u);
    bctx.lineTo(x+u, y+u);
    bctx.lineTo(x, y+u/2);
    bctx.lineTo(x-u, y+u);
    bctx.lineTo(x, y-u);
    bctx.closePath();
    bctx.stroke();
    bctx.restore();

    bctx.beginPath();
    bctx.strokeStyle = 'white';
    bctx.fillStyle = 'rgba(255,255,255,0.1)';
    bctx.fillRect(0,0,1000,1000);
    bctx.closePath();

    ctx.drawImage(bufferCanvas,500,500);

}

function clearCanvas(){
    var ctx = env.ctx;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,1)';

    ctx.beginPath();
    ctx.fillRect(0,0,env.width,env.height);
    ctx.closePath();
    ctx.globalCompositeOperation = 'source-over';
}

function render(time) {

    requestAnimationFrame(render);

    clearCanvas();
    drawShip();
    env.ctx.beginPath();
    env.ctx.strokeStyle = 'white';
    env.ctx.lineWidth = 2;
    env.ctx.moveTo(200,200);
    env.ctx.lineTo(100,100);
    env.ctx.stroke();
    env.ctx.closePath();

}
