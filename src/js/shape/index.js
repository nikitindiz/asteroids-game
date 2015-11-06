var cleanCanvas = require('../canvas-helpers').cleanCanvas
    , radDegRatio = Math.PI/180
    ;

var Shape = function(x,y,w,h,shapeFunction) {

    var my = this;

    my.strokeSize = my.strokeSize || 4;

    my.angle = 0;
    my.posX = x || 0;
    my.posY = y || 0;

    my.width = w || 100;
    my.height = h || 100;

    my.boundingBoxColor = '';

    my.bufferCanvas = document.createElement('canvas');
    my.bctx = my.bufferCanvas.getContext('2d');

    my.bufferCanvasSize = Math.sqrt( (my.scale+my.strokeSize) * (my.scale+my.strokeSize) * 8 );

    if(shapeFunction) {
        my.shape = shapeFunction;
    } else {
        my.shape = function(canvas){
            var
                w = canvas.width
                , h = canvas.height
                , ctx = canvas.getContext('2d')
                , scale = my.scale
                ;

            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillRect(-w/2,-h/2,w,h);
            ctx.closePath();

            return canvas;
        }
    }

    return this;
};

Shape.prototype.draw = function(canvas){

    if(!canvas) throw new Error('No context given to draw the ship.');

    var my = this

        // Draw context:
        , ctx = canvas.getContext('2d')

         // Buffer context:
        , bctx = my.bufferCanvas.getContext('2d')

    ;

    my.bufferCanvas.width = my.width;
    my.bufferCanvas.height = my.height;

    cleanCanvas(my.bufferCanvas);

    bctx.save();
    bctx.translate(my.width/2,my.height/2);
    bctx.rotate(radDegRatio*my.angle);

    my.shape(my.bufferCanvas);

    bctx.restore();

    if(my.boundingBoxColor) {
        bctx.beginPath();
        bctx.fillStyle = my.boundingBoxColor;
        bctx.fillRect(0,0,my.width,my.height);
        bctx.closePath();
    }

    // Teleport our shape if we are outside of canvas.
    my.posX = my.posX - my.width > canvas.width
        ? my.posX - canvas.width
        : my.posX
    ;

    my.posY = my.posY - my.height/2 > canvas.height
        ? my.posY - canvas.height
        : my.posY
    ;

    my.posX = my.posX - my.width < 0
        ? my.posX + canvas.width
        : my.posX
    ;

    my.posY = my.posY - my.height < 0
        ? my.posY + canvas.height
        : my.posY
    ;

    // Space should be infinite, so ...
    // ... will draw clones if we are on the edge

    console.log(my.posX, canvas.width);

    if(my.posX+my.width/2 > canvas.width) {
        ctx.drawImage(my.bufferCanvas
            , -(my.width-((my.posX+my.width)-canvas.width) + my.width/2)
            , my.posY - my.height/2
        );
    }

    if(my.posY+my.height/2 > canvas.height) {
        ctx.drawImage(my.bufferCanvas
            , my.posX - my.width/2
            , -(my.height-((my.posY+my.height)-canvas.height) + my.height/2)
        );
    }



    // Ok, it's time to draw the buffer!
    ctx.drawImage(my.bufferCanvas,my.posX-my.width/2,my.posY-my.height/2);

    return this;
};

module.exports = Shape;