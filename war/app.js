'use strict';

/** Setting app */
var abdaSettingApp = angular.module('abdaSettingApp', []);
/** TCWI app */
var abdaTcwiApp = angular.module('abdaTcwiApp', ['ui.bootstrap', 'ui.router', 'abdaSettingApp']);

/**
 * The master module
 */
var abdaApp = angular.module('abdaApp', [ 'ui.router', 'abdaTcwiApp']);

/**
 * Module configuration
 */
abdaApp.
config([ '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('tcwi', { /* TCWI */
		url: '/tcwi',
		templateUrl: 'apps/tcwi/abda-tcwi-app.html',
		controller: 'abdaTcwiAppCtrl'
	});

    $urlRouterProvider.otherwise('/tcwi'); /** default */
} ]);
