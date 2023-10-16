var expect = function(val) {
    toBe = function (val) {
        if (val === val){
            return true;
        }else{
            throw new Error('Not Equal')
        }
    }
    notToBe = function(val){
        if (val !== val){
            return true;
        }else{
            throw new Error('Equal')
        }
    }
};