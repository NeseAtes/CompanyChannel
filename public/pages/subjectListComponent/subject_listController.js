app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/subject/:subjectid', {
      templateUrl: './pages/subjectComponent/subject.html',
      controller: 'subjectController'
    }).when('/subjectAdd', {
      templateUrl: './pages/subjectAddComponent/subjectAdd.html',
      controller: 'subjectAddController'
    }).when('/tag/:tag', {
      templateUrl: './pages/tagComponent/tag.html',
      controller: 'tagController'
    });;
});



app.controller('subject_listController', function($scope, $http, $localStorage) {
    $scope.users=function(){
      $scope.is_user= $localStorage.is_user;
      return $scope.is_user;
    }

    $http.get("http://localhost:3000/api/subject")
    .then(function(response) {
      console.log("response",response);
        $scope.subjects=response.data.data;
    });
});