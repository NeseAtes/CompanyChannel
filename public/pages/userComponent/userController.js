app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/subject/:subjectid', {
      templateUrl: './pages/subjectComponent/subject.html',
      controller: 'subjectController'
    });
});

app.controller('userController',function($scope,$http,$routeParams,$timeout,$window) {
	$scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab == tabNum;
    };


	$scope.personnel_id=$routeParams.userid;
	console.log("$scope.personnel_id",$scope.personnel_id)
	$http.get("http://localhost:3000/api/personnels?personnel_ID="+$scope.personnel_id)
    .then(function(response) {
      console.log("response3",response.data.data);
      $scope.users=response.data.data[0];
    });

    console.log($scope.personnel_id)
    $http.get("http://localhost:3000/api/subject/personnel?personnel_ID="+$scope.personnel_id)
    .then(function(response) {
      console.log("response4",response);
      $scope.perSub=response.data.data
    });

    $http.get("http://localhost:3000/api/comment/personnel?personnel_ID="+$scope.personnel_id)
    .then(function(response) {
      console.log("response5",response);
      $scope.comSub=response.data.data
    });


    $scope.imagePer=function(imgId){
      $scope.is_id=localStorage.getItem('is_id');
      console.log("kontrol3",$scope.is_id );
      console.log("kontrol4",imgId );
      if ($scope.is_id==imgId) {
          return $scope.is_id
      }
    }


  $scope.uploadFile = function(){
      console.log("girdi")
        var file = $scope.myFile;
        var personnel_ID= $scope.personnel_id;
        console.log("path",file);
        console.log("aa",$scope.personnel_id)
        var uploadUrl = "http://localhost:3000/api/personnels/picture";
        var fd = new FormData();
        fd.append('file',file);
        fd.append('personnel_ID',personnel_ID);

        $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function(response){
          console.log("responseİmage",response);
          setTimeout(function(){
              $window.location.reload();
          });
        })
    };

});


app.directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
};
}]);