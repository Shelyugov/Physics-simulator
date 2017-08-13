function initializerController($scope) {
	initModel($scope);
}

angular.module("physicsSimulator", [])
       .controller("InitializerController", ["$scope", initializerController]);
