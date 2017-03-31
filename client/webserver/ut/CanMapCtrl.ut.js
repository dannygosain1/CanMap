
// CanMapUtils.js
describe('CanMapUtils.js', function(){
    
    // isInvalid()
    describe('isInvalid',function(){
        
        var item;
        
        it('1) is undefined invalid', function(){
            item = undefined;
            expect(isInvalid(item)).toBe(true);
        });
        
        it('2) is 0 invalid', function(){
            item = 0;
            expect(isInvalid(item)).toBe(false);
        });
        
        it('3) is "0" invalid', function(){
            item = "0";
            expect(isInvalid("0")).toBe(false);
        });
        
        it('4) is \'c\' invalid', function(){
            item = 'c';
            expect(isInvalid('c')).toBe(false);
        });
        
        it('5) is {} invalid', function(){
            item = {};
            expect(isInvalid({})).toBe(false);
        });
        
        it('6) is [] invalid', function(){
            item = [];
            expect(isInvalid([])).toBe(false);
        });
        
        it('7) is obj.d invalid when obj = {}', function(){
            var obj = {}
            expect(isInvalid(obj.d)).toBe(true);
        });
        
        it('8) is obj.d invalid when obj = {d:"1"}', function(){
            var obj = {d:"1"}
            expect(isInvalid(obj.d)).toBe(false);
        });
        
        it('9) is arr[0] invalid when arr = []', function(){
            var arr = [];
            expect(isInvalid(arr[0])).toBe(true);
        });
        
        it('10) is arr[0] invalid when arr = [1,2]', function(){
            var arr = [1,2];
            expect(isInvalid(arr[0])).toBe(false);
        });
        
    });
        
    // string.prototype.replaceAll()
    describe('string.prototype.replaceAll', function() {
        
        var str = "";
        var o = " ";
        var n = "";
        
        afterEach(function(){
            o = " ";
            n = "";
        })
        
        
        it('1) remove 1 space', function(){
            str = "a b";
            expect(str.replaceAll(o,n)).toBe("ab");
        });
        
        it('2) remove 2 space', function(){
            str = "a b c";
            expect(str.replaceAll(o,n)).toBe("abc");
        });
        
        it('3) remove ,s', function(){
            str = "a,b,,,c,d,e,f";
            o = ",";
            n = "_";
            expect(str.replaceAll(o,n)).toBe("a_b___c_d_e_f");
        });
        
    });
    
    // string.prototype.capitalize()
    describe('string.prototype.capitalize', function(){
        
        var str = "";
        
        it('1) blank no change', function(){
            str = "";
            expect(str.capitalize()).toBe("");
        });
        
        it('2) space no change', function(){
            str = " ";
            expect(str.capitalize()).toBe(" ");
        });
        
        it('3) a to A', function(){
            str = "a";
            expect(str.capitalize()).toBe("A");
        });
        
        it('4) ab to Ab', function(){
            str = "ab";
            expect(str.capitalize()).toBe("Ab");
        });
        
        it('5) " ab" to " Ab"', function(){
            str = " ab";
            expect(str.capitalize()).toBe(" Ab");
        });
        
        it('6) " ab " to " Ab "', function(){
            str = " ab ";
            expect(str.capitalize()).toBe(" Ab ");
        });
        
        it('7) " ab a " to " Ab A "', function(){
            str = " ab a ";
            expect(str.capitalize()).toBe(" Ab A ");
        });
        
        it('8) sentence correctly', function(){
            str = "hello world";
            expect(str.capitalize()).toBe("Hello World");
        });
        
        it('9) ignore numbers', function(){
            str = "12345";
            expect(str.capitalize()).toBe("12345");
        });
        
        it('10) ignore symbols', function(){
            str = "%^&#@#!";
            expect(str.capitalize()).toBe("%^&#@#!");
        });
        
        it('11) caps reduced', function(){
            str = "HELLO WORLD";
            expect(str.capitalize()).toBe("Hello World");
        });
        
        it('12) ignore letters after symbol', function(){
            str = " %abc";
            expect(str.capitalize()).toBe(" %abc");
        });
        
        it('13) lower letters after symbol', function(){
            str = " %ABC";
            expect(str.capitalize()).toBe(" %abc");
        });
    });
    
    
});
//*/

// CanMapCtrl.js 
/*
describe('CanMapCtrl.js',function(){
    
    // set angular app
    beforeEach(angular.mock.module('canMap'));

    // set angular controller
    var $controller;
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    
    describe('$scope.getApiURL', function(){
        
        beforeEach(function() {
            $scope = {};
            controller = $controller('canMapCtrl', { $scope: $scope });
        });
        

        
        it('gets the api url from the webserver config directory', function(){
            $scope.getApiURL();
            expect(typeof($scope.apiURL)).toBe("string");
        });
    });
});
//*/

