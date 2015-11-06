var Shape = require('../shape')

    , scale = 20
    , strokeSize = 2
    , bufferCanvasSize = Math.sqrt( (scale + strokeSize) * (scale + strokeSize) * 8 )

    , spaceCraft = new Shape(window.innerWidth/2, window.innerHeight/2, bufferCanvasSize, bufferCanvasSize)

;

spaceCraft.shape = function(canvas){

    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = strokeSize;
    ctx.moveTo(0, -scale);
    ctx.lineTo(+scale, +scale);
    ctx.lineTo(0, +scale/2);
    ctx.lineTo(-scale, +scale);
    ctx.lineTo(0, -scale);
    ctx.stroke();
    ctx.closePath();

    return canvas;
};

// spaceCraft.boundingBoxColor = 'rgba(0,0,255,0.5)';

module.exports = spaceCraft;