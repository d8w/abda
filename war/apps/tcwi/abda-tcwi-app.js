'use strict';

abdaTcwiApp

.config(function($stateProvider, $urlRouterProvider){
	$stateProvider.state('tcwi.root', {
		url: '/root',
		views: {
			'dataset' : {
				templateUrl: 'apps/tcwi/abda-template-dataset.html'
			},
			'query' : {
				templateUrl: 'apps/tcwi/abda-template-query.html'
			},
			'screening' : {
				templateUrl: 'apps/tcwi/abda-template-screening.html'
			},
			'result' : {
				templateUrl: 'apps/tcwi/abda-template-result.html'
			},
			'map' : {
				templateUrl: 'apps/tcwi/abda-template-map.html'
			},
			'analysis' : {
				templateUrl: 'apps/tcwi/abda-template-analysis.html'
			},
			'pivot' : {
				templateUrl: 'apps/tcwi/abda-template-pivot.html'
			},
			'dual' : {
				templateUrl: 'apps/tcwi/abda-template-dual.html'
			},
			'cross' : {
				templateUrl: 'apps/tcwi/abda-template-cross.html'
			}
		}
	});

	$urlRouterProvider.when('/tcwi','/tcwi/root');
})

.controller('abdaTcwiAppCtrl', [ '$scope', '$modal', '$log',
                                 function($scope, $modal, $log) {

	$scope.Panels = [{
                        uiView: 'dataset',
                        open: true,
                        display:'Datasets'
                    },{
                        uiView: 'query',
                        open: false,
                        display:'Submit query'
                    },{
                        uiView: 'screening',
                        open: false,
                        display:'Run new screening'
                    },{
                        uiView: 'result',
                        open: false,
                        display:'Screening results'
                    },{
                        uiView: 'map',
                        open: false,
                        display:'Maps'
                    },{
                        uiView: 'analysis',
                        open: false,
                        display:'Analysis'
                    },{
                        uiView: 'pivot',
                        open: false,
                        display:'Pivot table'
                    },{
                        uiView: 'dual',
                        open: false,
                        display:'Dual pattern detection'
                    },{
                        uiView: 'cross',
                        open: false,
                        display:'Cross-stream analysis'
                    }];

	/**
	 * Reference
	 */
	$scope.activeDatasets = [];

	/**
	 * datasets lists
	 */
	$scope.datasets = [{
		provider: 'cdc',
		members: [{name: 'CDC-1.tcube'}, {name: 'CDC-2.tcube'}, {name: 'CDC-3.tcube'}]
	}, {
		provider: 'usda',
		members: [{name: 'USDA-1.tcube'}, {name: 'USDA-2.tcube'}, {name: 'USDA-3.tcube'}]
	}];
	$scope.datasets.push({
		provider: 'joint',
		members: $scope.datasets[0].members.concat($scope.datasets[1].members)
	});

	/**
	 * providers
	 */
	var PROVIDERS = [];
	angular.forEach($scope.datasets, function(dataset){
		PROVIDERS.push({
			name: dataset.provider
		})
	});
	
    /**
     * @private Function that fires up when the app loads. It remains there till
     * the current query is set.
     */
    $scope.modal = function() {
    	var modalInstance = $modal.open({
    		controller: 'abdaSettingAppCtrl',
    		templateUrl: 'apps/setting/abda-template-setting.html',
    		size: 'lg',
    		windowClass: 'hvcenter', // defined in cmds-dataset-carousel-app.css
    		backdrop: 'static',
    		resolve: {
    			PROVIDERS: function(){
    				return PROVIDERS;
    			}
    		}
    	});
    	
    	modalInstance.result.then(function(selectedProvider){
    		angular.forEach($scope.datasets, function(dataset, idx){
    			if(angular.equals(selectedProvider, PROVIDERS[idx])) {
    				$scope.activeDatasets = dataset.members;
    			}
    		});
    	}, function(reason){
    		$log.info(reason);
    	});
    };

    /**
     * Business logic
     * 
     */
    $scope.modal();
}]);