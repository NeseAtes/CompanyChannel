app.controller('sifreController',function($scope,$http,$routeParams,$timeout,$window) {

	$scope.personnel_id=$routeParams.sifreid;
	console.log("$scope.personnel_id3",$scope.personnel_id)

  $scope.kaydet=function(){
    var data={
      personnel_ID:$scope.personnel_id,
      newPassword:$scope.yenisifre
    }
    console.log("ID",$scope.personnel_id);
    console.log("newPassword",$scope.yenisifre);
    $http.post("http://localhost:3000/api/personnels/password",JSON.stringify(data))
    .then(function(response) {
      console.log("response3",response.data.data);
    });
    $scope.eskisifre="";
    $scope.yenisifre="";
  }
});