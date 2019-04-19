app.Controller('userController',function() {
	$http.get("http://localhost:3000/api/personnels")
    .then(function(response) {
      console.log("response",response);
    });


})