function runSimulation($scope) {

}

function initializerController($scope) {
	initModel($scope);
	$scope.runSimulation = runSimulation;
}

angular.module("physicsSimulator", [])
       .controller("InitializerController", ["$scope", initializerController]);
