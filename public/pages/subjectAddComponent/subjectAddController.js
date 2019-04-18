app.controller('subjectAddController',function ($scope,$http,$window) {

	$scope.send =function(){
		var data={
			subject:$scope.title,
			description:$scope.desc
		};
		if ($scope.title== undefined || $scope.desc== undefined) {
				$window.alert('Do not leave blank!!');
		}
		else{
			$http.post('http://localhost:3000/api/subject',JSON.stringify(data)).then(function(resp){
				$window.alert('Successful send!!');
			})
			$scope.title="";
			$scope.desc="";
		}
	}
})