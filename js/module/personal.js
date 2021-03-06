angular.module('personal', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("personal", {
                    url: '/personal/:id',
                    templateUrl: 'view/personal.html',
                    resolve: {
						user_detail: function (httpService,$rootScope,loginService) {
	                        return httpService.get($rootScope.baseURL+'user/phoneUserId.do?userId='+loginService.getCookie("userId"))
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data;
	                            });
	                    },
	                	order_list: function (httpService,$rootScope,loginService) {
	                        return httpService.get($rootScope.baseURL+'order/phoneGetOrdersByUserId.do?userId='+loginService.getCookie("userId"))
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data;
	                            });
	                    },
	                },
	                controller: function($scope,httpService,user_detail,order_list,loginService,$rootScope,$stateParams){
                        $scope.user_id=loginService.getCookie("userId")
                        $scope.headImgurl=user_detail.headImgurl
                        $scope.nickname=user_detail.nickname
                        
                        var count_dict = {'unPay':0,'unDeliver':0,'unTake':0} //初始化count字典
                         for(var i=0;i<order_list.length;i++){
                             switch(order_list[i].ordState)
                             {
                                 case "1":
                                    count_dict['unPay'] += 1
                                    break;
                                 case "2":
                                    count_dict['unDeliver'] += 1
                                    break;
                                 case "5":
                                 	break;
                                 default:
                                    count_dict['unTake'] += 1
                                    break;
                             }
                         }
                         $scope.order_count =count_dict //双向绑定赋值前端
                         
                         $(".personal").click()
	                    /*
                    	$scope.orders=order_list
                    	for item in order_list
                    		item[item.ordState] = item[ordState]+lenth(order_list)
                    		$scope.order_unpay = order_list.mapOrderProductList[ordState:1]
                    	*/
                    },

                })
        }
    ])