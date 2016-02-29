app.service('cartSrv',CartService);
function CartService($state,api){
	//dependencies
	this.api = api;
	this.state = $state;
	this.cart = [];
}