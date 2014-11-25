abdaSettingApp
.controller('abdaSettingAppCtrl', [ '$scope', '$modalInstance', 'PROVIDERS',
                                 function($scope, $modalInstance, PROVIDERS) {

	/**
	 * Publish some constants
	 */
	$scope.providers = PROVIDERS;
	
	/**
	 * @param provider Object
	 */
	$scope.selectProvider = function(provider) {
		$modalInstance.close(provider);
	};
	
}]);