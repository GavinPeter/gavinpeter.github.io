//MainCtrl 
app.controller('MainCtrl', function($rootScope, $scope, $state) {	

		$scope.go = function(route){
			$state.go(route);
		};

		$scope.active = function(route){
			return $state.is(route);
		};

		$scope.tabs = [
			{ heading: "HOT APPS", route:"main.hotapps", active:false },
			//{ heading: "OWN APPS", route:"main.ownapps", active:false },									
			{ heading: "ABOUT", route:"main.about", active:false },
		];

		$scope.$on("$stateChangeSuccess", function() {
			$scope.tabs.forEach(function(tab) {
				tab.active = $scope.active(tab.route);
			});
		});
});

//hotapps.html ownAppsService,
app.controller('HotAppsCtrl', function($scope, $rootScope,  $http,  $modal, $filter) {


	$http.get("https://api.github.com/users/lagendre/repos?client_id=17232a47edba88b9ec88&client_Secret=08882a097e439f3211d0b700d33f6dbf8ce92af1")
	  .success(function (data) {

	  var apps=[];
	  
		for (var i=0; i<data.length; i++){
			var details ={};
				if (data[i].name.indexOf(".nw")!=-1){
					var g_Description = JSON.parse(data[i].description);
					details["title"]= g_Description.title;
					details["name"] = data[i].name;
					details["cat"] =  g_Description.cat;
					details["default_branch"] = data[i].default_branch;
						apps.push( details );
				}
		}
	  
		$scope.apps = apps;
	 

	});





	$scope.cat = function ( type ) {
		console.log( type );
		$scope.search = { cat: type };
		return false;
	}


});



app.controller('AboutCtrl', function($scope, $rootScope, $filter ) {




});


