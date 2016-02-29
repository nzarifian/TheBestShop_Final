app.controller('ProductCtrl', ProductCtrl);

function ProductCtrl(productSrv,$state,$stateParams,api,products){
	var ctrl = this;
	ctrl.productSrv = productSrv;
	ctrl.cartItems=[];
	ctrl.$state = $state;
	ctrl.$stateParams = $stateParams;
	ctrl.products = [];

	ctrl.categories = [
		{label:'Shirts',value:'shirts'},
		{label:'Pants',value:'pants'},
		{label:'Shoes',value:'shoes'},
		{label:'Dress',value:'dress'},
		{label:'Outerwear',value:'outerwear'},
	];

	ctrl.product = {};
	ctrl.product_update_btn = 'Update Product';
	ctrl.product_delete_btn = 'Remove Product';
	
	if($stateParams.productId != undefined){
		productSrv.getProduct($stateParams.productId)
		.then(function(res){
			console.log(res);
			ctrl.product = res;
			
			for (var index in ctrl.categories){
				if(ctrl.product.category == ctrl.categories[index].value){
					ctrl.category = ctrl.categories[index];
				}
			}
		});
	};
}

ProductCtrl.prototype.addProduct = function (){
	var ctrl = this;
	var product = {
		name: ctrl.name,
		image: ctrl.image,
		description: ctrl.description,
		category: ctrl.category,
		quantity: ctrl.quantity,
		price: ctrl.price,
		status:'active'
	};

	ctrl.productSrv.addProduct(product);

}


ProductCtrl.prototype.deleteProduct = function(productId){
	var ctrl = this; 
	ctrl.productSrv.deleteProduct(ctrl.product.id);
}

ProductCtrl.prototype.updateProduct = function(){
	var ctrl = this; 
	ctrl.product.category = ctrl.category.value;
	ctrl.productSrv.updateProduct(ctrl.product, ctrl.product.id);
}
