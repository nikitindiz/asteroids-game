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

    , "draw" : function (canvas){

        if(!canvas) throw new Error('No context given to draw the ship.');

        var my = this

            , ctx = canvas.getContext('2d')

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

        // console.log(canvas.width, canvas.height, my.posX, my.posY);
        console.log(canvas.width, my.posX+cs, my.posY);

        //if(my.posY - my.bufferCanvasSize < 0) {
        //    ctx.drawImage(my.bufferCanvas,my.posX,canvas.height - my.posY - my.bufferCanvasSize);
        //}
        //
        //if(my.posX - my.bufferCanvasSize < 0) {
        //    ctx.drawImage(my.bufferCanvas,my.posX,canvas.width - my.posX - my.bufferCanvasSize);
        //}

        if(my.posX+cs > canvas.width) {
            ctx.drawImage(my.bufferCanvas,-(cs-((my.posX+cs)-canvas.width)),my.posY);
            console.log('bump');
        }

        if(my.posY+cs > canvas.height) {
            ctx.drawImage(my.bufferCanvas,my.posX,-(cs-((my.posY+cs)-canvas.height)));
        }

        my.posX = my.posX > canvas.width
            ? my.posX - canvas.width
            : my.posX
        ;

        my.posY = my.posY > canvas.height
            ? my.posY - canvas.height
            : my.posY
        ;

        ctx.drawImage(my.bufferCanvas,my.posX,my.posY);

        return this;
    }

};

module.exports = ship;