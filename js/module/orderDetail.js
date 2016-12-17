
angular.module('orderDetail', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("orderDetail", {
                    url: '/orderDetail/:id',
                    templateUrl: 'view/orderDetail.html',
                    resolve: {
                    	order_detail: function (httpService,$rootScope,$stateParams,util) {
                            return util.get($stateParams.id)
                       		},
               		 },
                    controller: function($scope,order_detail){
                    	console.log(order_detail)
                    },
                })
        }
    ])