ttt.directive('disabler', function($compile) {
  return {
    link: function(scope, elm, attrs) {
      var btnContents = $compile(elm.contents())(scope);
      scope.$watch(attrs.ngModel, function(value) {
        if (value) {
          scope.initial_value = elm.attr('value');
          elm.attr('value', scope.$eval(attrs.disabler));
          setTimeout(function() {
            elm.attr('disabled', true);
          }, 0);
        } else {
          elm.attr('value', scope.initial_value);
          elm.attr('disabled', false);
        }
      });
    }
  };
});
//password matching
ttt.directive('passwordMatch', function() {
  return {
    require: 'ngModel',
    scope: {
      otherModelValue: '=passwordMatch'
    },
    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue === scope.otherModelValue;
      };
      scope.$watch('otherModelValue', function() {
        ngModel.$validate();
      });
    }
  };
});

ttt.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});