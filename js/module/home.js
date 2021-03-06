/**
 * home page
 */
//angular.module('home', ['ui.router'])
var homeModule = angular.module('home', ['ui.router','ksSwiper']);
homeModule.config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state("home", {
                url: '/home/:userId/:openId',
                templateUrl: 'view/home.html',
                resolve: { //预加载的功能，在页面渲染出现之前，提前加载这些数据，并在controller中引用
                	share_page:function($location,$stateParams,loginService){
                		if($stateParams.userId!=0||$stateParams.userId!="0"){
//				 			loginService.putCookieForever('userId',$stateParams.userId)
//				 			loginService.putCookieForever('openId',$stateParams.openId)
				 			loginService.putCookieForever('userId',$stateParams.userId) 
		 					loginService.putCookieForever('openId',$stateParams.openId) 
			 			}
                	},
                	image_list: function (httpService,$rootScope) { //定义预加载的函数
                        return httpService.get($rootScope.baseURL+'home/phoneHomePage.do') //通过Service获取接口对应的json数据
                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data; //对返回的数据进行处理
                            });;
                    },
                	classifyResolve: function (httpService,$rootScope) { //定义预加载的函数
                        return httpService.get($rootScope.baseURL+'classify/phoneclsall.do') //通过Service获取接口对应的json数据
                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data.classifies; //对返回的数据进行处理
                            });;
                    },
                    products: function (httpService, $rootScope) {
                        return httpService.get($rootScope.baseURL+'product/phoneall.do')
                            .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data;
                            });
                    },
                
                },
                 controller: function ($scope,$stateParams,$location,$rootScope,$filter,classifyResolve,products,image_list,loginService) {
                 	
             		var share_url = loginService.getCookie("share_url")
					if(share_url!=null &&share_url.indexOf("home")==-1){
						loginService.putCookieForever("share_url",null)
//							$location.path(share_url)
						window.location.href="index.html#"+share_url
					}
//               	console.log(screen.width ,screen.height)
                    $scope.sliderShow=true
                    $scope.classifies=classifyResolve //双向绑定 数据和前段的标签，此处为 商品分类的循环
                    $scope.$watch("searchInput", function() {//监控数据变化
                        $scope.products=$filter("filter")(products,$scope.searchInput);
                    }, true);
                    //以下是幻灯片展示部分，可以不看
                    $scope.images =image_list;
			        //以下是搜索部分，可不看
			        $scope.focusing = ''; //获得焦点时增加样式weui_search_focusing
                    $scope.isSearchShow = false; //是否显示搜索框的下拉列表
                    $scope.searchInput = ''; //搜索内容清空
                    $scope.searchText = true; //是否显示默认状态下的搜索条样式
                    $scope.searchClickEvent = function() {
                        $scope.searchText = false;
                        document.getElementById('searchInput').focus();
                        $scope.sliderShow=false
                    }

                    $scope.searchFocusEvent = function() {
                        $scope.focusing = 'weui-search-bar_focusing';
                    }

                    $scope.searchBlurEvent = function() {
                        $scope.searchText = true;
                    }
                    $scope.searchCancel = function(){
                        $scope.searchText = true;
                        $scope.focusing = '';
                        $scope.isSearchShow = false;
                        $scope.sliderShow=true
                    }
                    $scope.searchKeyupEvent = function() {
                        if ($scope.searchInput) {
                            $scope.isSearchShow = true;
                        } else {
                            $scope.isSearchShow = false;
                        }
                    }
                    $scope.getProducts=function(id,claName){
                    	loginService.putCookieForever('claName',claName)
                    	$location.path('/product/'+id)
                    }
                    //放在最后，判断是否重定向
                 }

            })
            .state("error404",{
                url:'/error404',
                templateUrl: 'view/404.html',
                controller:function($scope,$stateParams){
                }
            })
    }
])