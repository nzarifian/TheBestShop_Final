app.controller('AdminCtrl', AdminCtrl);

function AdminCtrl(productSrv, products, $scope, $state, api){
	var ctrl = this;
	ctrl.api = api;
	ctrl.$state= $state;
	ctrl.$scope = $scope;
	ctrl.products = products;
	ctrl.productSrv = productSrv;

	if(localStorage.authToken == undefined || localStorage.authToken == null){
		$state.go('admin');
	}
	
	if(ctrl.products.length > 0 ){
		ctrl.is_products = true;
	}

	$scope.$watch(function(){
    	return productSrv.products;
	}, function (newValue) {
		if(productSrv.products.length > 0){
		    ctrl.products = productSrv.products;
		    ctrl.is_products = true;
		}
	});
}

AdminCtrl.prototype.logout = function(){
	var ctrl =this;

	localStorage.removeItem('authToken');
	ctrl.$state.go('auth');

}

AdminCtrl.prototype.invent_add_btn=function(){
	var ctrl = this; 
	ctrl.$state.go('admin.inventory-add');

}

AdminCtrl.prototype.editProduct = function(product){
	var ctrl = this;
	ctrl.$state.go('admin.inventory-edit',{productId:product.id});
}

AdminCtrl.prototype.editOrder = function(product){
	var ctrl = this;
	ctrl.$state.go('orders.updateOrder',{productId:product.id});
}