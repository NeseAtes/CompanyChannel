app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/tag/:tag', {
      templateUrl: './pages/tagComponent/tag.html',
      controller: 'tagController'
    });
});


app.controller('tag_listController',function($http,$scope) {
	$http.get('http://localhost:3000/api/tags').then(function(response){
		console.log("resp",response);
		$scope.tags=response.data.data
	})
})