app.service('orderSrv',OrderService);

function OrderService($state,api){
	//dependencies
	this.api = api;
	this.state = $state;
	this.orders = [];
	this.currentCustomer;
	this.currentOrder;
}

OrderService.prototype.getOrders = function(){
	var _this = this;
	return this.api.request('/orders',{},'GET')
	.then(function(res){
		//success promise
		console.log(res);
		_this.orders = res.data.orders;
		for(var i = 0;i<_this.orders.length;i++){
			_this.orders[i].cart = JSON.parse(_this.orders[i].cart);
		}
		return _this.orders;
	},function(res){
		//error promise
		console.log(res);
		return;
	})
}

OrderService.prototype.addOrder = function(order){
	var _this = this;
	console.log(order);
	this.api.request('/orders',order,'POST')
	.then(function(res){
		console.log(res);
		if(res.status === 200){
			//order was added successfully
			_this.orders.push(res.data.order);
			_this.state.go('admin.orders');
			// change this state one login works on checkout page


		}
	})
	.catch(function(err) {
		console.log(err);
	})
}

// OrderService.prototype.deleteOrder = function(orders){
// 	var _this = this;
// 	this.api.request('/admin-ordersUpdate/'+orderId,{},'DEL')
// 	.then(function(res){
// 		console.log(res);
// 		if(res.status === 200){
// 			//product was deleted successfully
// 			_this.removeOrder(orderId);
// 			_this.state.go('admin.orders');			
// 		}
// 	})
// }

// OrderService.prototype.getOrder = function(orderId){
// 	var _this = this;
// 	return this.api.request('/orders/'+orderId,{},'GET');
// }



// ProductService.prototype.updateProduct = function(product,productId){
// 	var _this = this;
// 	this.api.request('/products/'+productId,product,'PUT')
// 	.then(function(res){
// 		console.log(res);
// 		if(res.status === 200){
// 			//product was updated successfully
// 			_this.updateProductList(product,productId);
// 			_this.state.go('admin.inventory');
			
// 		}
// 	})
// }



