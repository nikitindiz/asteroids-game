var environment = {
    "init" : function(){
        var my = this;

        my.canvas = document.querySelector('canvas');
        my.ctx = my.canvas.getContext('2d');
        my.width = 0;
        my.height = 0;

        return this;
    }
    , "resizeCanvas" : function resizeCanvas(){
        var my = this;

        my.canvas.width = my.width = window.innerWidth;
        my.canvas.height = my.height = window.innerHeight;

        return this;
    }
};

module.exports = environment;