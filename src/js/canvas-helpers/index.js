exports.cleanCanvas = function(canvas){
    var ctx = canvas.getContext('2d')
        , width = canvas.width
        , height = canvas.height
        ;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.beginPath();
    ctx.fillRect(0,0,width,width);
    ctx.closePath();
    ctx.globalCompositeOperation = 'source-over';

};

exports.degToRad = function(deg) {

};