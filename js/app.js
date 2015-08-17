
var app =angular.module('marketApp', ['ui.router','ui.bootstrap'])
app.config(function($stateProvider, $urlRouterProvider){
 
    $urlRouterProvider.otherwise("main/hotapps");
 
    $stateProvider
        .state("main", { abstract: true, url:"/main", templateUrl:"templates/main.html" })
		.state("main.hotapps", { url: "/hotapps", templateUrl: "templates/hotapps.html" })
	 	.state("main.about", { url: "/about", templateUrl: "templates/about.html" });
});

