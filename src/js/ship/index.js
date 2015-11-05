var cleanCanvas = require('../canvas-helpers').cleanCanvas;

var ship = {

    "bufferCanvas" : document.createElement('canvas')
    , "angle" : 0
    , "posX" : 0
    , "posY" : 0

    , "init" : function(){
        var my = this;

        my.bctx = my.bufferCanvas.getContext('2d');
        my.scale = my.scale || 20;
        my.strokeSize = my.strokeSize || 4;
        my.bufferCanvasSize = Math.sqrt( (my.scale+my.strokeSize) * (my.scale+my.strokeSize) * 8 );
        my.bufferCanvas.width = my.bufferCanvas.height = my.bufferCanvasSize;

        return this;
    }

    , "draw" : function (ctx){

        if(!ctx) throw new Error('No context given to draw the ship.');

        var my = this

            // Couple shortcuts to properties:
            , cs = my.bufferCanvasSize
            , scale = my.scale

            // Buffer context:
            , bctx = my.bufferCanvas.getContext('2d')

            ;

        cleanCanvas(my.bufferCanvas);

        bctx.save();
        bctx.translate(cs/2,cs/2);
        bctx.rotate((Math.PI/180)*my.angle);
        bctx.beginPath();
        bctx.strokeStyle = 'white';
        bctx.lineWidth = my.strokeSize;
        bctx.moveTo(0, -scale);
        bctx.lineTo(+scale, +scale);
        bctx.lineTo(0, +scale/2);
        bctx.lineTo(-scale, +scale);
        bctx.lineTo(0, -scale);
        bctx.closePath();
        bctx.stroke();
        bctx.restore();

        //bctx.beginPath();
        //bctx.strokeStyle = 'white';
        //bctx.fillStyle = 'rgba(255,255,255,0.1)';
        //bctx.fillRect(0,0,my.bufferCanvasSize,my.bufferCanvasSize);
        //bctx.closePath();

        ctx.drawImage(my.bufferCanvas,my.posX,my.posY);

        return this;
    }
};

module.exports = ship;