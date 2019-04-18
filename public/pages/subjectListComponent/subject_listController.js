app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/subject/:subjectid', {
      templateUrl: './pages/subjectComponent/subject.html',
      controller: 'subjectController'
    }).when('/subjectAdd', {
      templateUrl: './pages/subjectAddComponent/subjectAdd.html',
      controller: 'subjectAddController'
    });
});



app.controller('subject_listController', function($scope, $http, $localStorage) {
    $scope.users=function(){
      $scope.is_user= $localStorage.is_user;
      return $scope.is_user;
    }

    $http.get("http://localhost:3000/api/subject")
    .then(function(response) {
        $scope.subjects=response.data.data;
    });
}).filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});