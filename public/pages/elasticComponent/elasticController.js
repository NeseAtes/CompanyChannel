app.controller('elasticController',function($scope, $http, SERVICE_URL,$window,$location,$routeParams){
    console.log("girdi");
	var data = {
        value : $routeParams.searchid
    };
    //console.log($scope.search);
    $http.post("http://localhost:3000/api/elastic", JSON.stringify(data))
    .then(function(resp){

        console.log("ES sonuc: ", resp.data);
    //$scope.logs=[];
    $scope.users=[];
        if ($routeParams.searchid == undefined) {
            console.log("yazmadın??????????????????");
        }
        else{
        $scope.users=[];
            for (var i = 0; i < resp.data.hits.length; i++) {
           var a = resp.data.hits[i]._source;
           console.log(resp.data.hits[i]._source);
           //$scope.logs.push(a);
           $scope.users.push(a);
           console.log("$scope.users",$scope.users);
        }
        } 
    },function(err){
        console.log("ES err: ", err);
    });

})