var keyControls = {
    "init" : function(){

        var my = this;

        this.map = [];

        window.addEventListener('keydown', captureKeys);
        window.addEventListener('keyup', captureKeys);

        function captureKeys(e){
            e.preventDefault();
            my.map[e.keyCode] = e.type == 'keydown';
        }
        return this;
    }
    , "on" : function(keyCode ,callback){
        if(keyCode) {
            if(keyCode instanceof Array) {
                console.log('array of keys');
            } else if (typeof keyCode == 'number' ){
                console.log('one key');
            } else {
                throw new Error('Keycode should be a number or array');
            }
        } else {
            throw new Error('No keycode given');
        }
    }
};

module.exports = keyControls;