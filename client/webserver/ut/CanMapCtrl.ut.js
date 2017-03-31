
// CanMapUtils.js
describe('CanMapUtils.js', function(){
    
    // isInvalid()
    describe('isInvalid',function(){
        
        it('1) is undefined invalid', function(){
            expect(isInvalid(undefined)).toBe(true);
        });
        
        it('2) is 0 invalid', function(){
            expect(isInvalid(0)).toBe(false);
        });
        
        it('3) is "0" invalid', function(){
            expect(isInvalid("0")).toBe(false);
        });
        
        it('4) is \'c\' invalid', function(){
            expect(isInvalid('c')).toBe(false);
        });
        
        it('5) is {} invalid', function(){
            expect(isInvalid({})).toBe(false);
        });
        
        it('6) is [] invalid', function(){
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

