// checkout in frontend
// submit order in frontend
//edit orders in backend
app.controller('OrderCtrl', OrderCtrl);


function OrderCtrl(api, productSrv, cartSrv, orderSrv, $state, $scope, orders){

	var ctrl = this;
	ctrl.api = api;
	ctrl.$state = $state;
    ctrl.$scope = $scope;
	ctrl.productSrv = productSrv;
    ctrl.cartSrv = cartSrv;
    ctrl.orderSrv = orderSrv;
    ctrl.cart = cartSrv.cart;
    ctrl.orders = orders;
    ctrl.order = ctrl.orderSrv.currentOrder;

    ctrl.finalCustomer = ctrl.orderSrv.currentCustomer;
    ctrl.customer = {};
    $scope.$watch(function() {
        return ctrl.orderSrv.orders;
    }, function(newVal) {
        ctrl.orders = newVal;
    })
}

//function deletes selected item in cart//
OrderCtrl.prototype.deleteCartItem = function(cartProduct){
    var ctrl = this; 
    ctrl.cartProduct = cartProduct; 
    var thisIndex;
    for (var i = 0; i<ctrl.cartSrv.cart.length; i++){
        ctrl.cartSrv.cart.splice(cartProduct[i], 1);
    }
}

OrderCtrl.prototype.total=function(){
    var total = 0
    var ctrl = this;
    angular.forEach(ctrl.cartSrv.cart, function(cartProduct){
        total+= cartProduct.quantity * cartProduct.price;
    })
    return total;
}

OrderCtrl.prototype.checkout = function(){
    var ctrl = this; 
    ctrl.$state.go('checkout');
}

OrderCtrl.prototype.goToCart = function(){
    var ctrl = this; 
    ctrl.$state.go('shop.cart');
}

OrderCtrl.prototype.reviewOrder = function(){
    var ctrl = this; 
    var customer = {
        firstName: ctrl.firstName,
        lastName: ctrl.lastName,
        email: ctrl.email,
        address1: ctrl.address1,
        apt: ctrl.apt,
        city: ctrl.city,
        province: ctrl.province,
        postal: ctrl.postal
    }

    console.log(customer);
    ctrl.orderSrv.currentCustomer = customer;
    ctrl.$state.go('submitOrder');
}

OrderCtrl.prototype.submitOrder = function(){
    var ctrl = this;
    ctrl.order = {
        // customer: ctrl.customer,
        cart: JSON.stringify(ctrl.cartSrv.cart),
        total:25,
        tax: 16,
        final_total: 16,

    };
    ctrl.orderSrv.addOrder(ctrl.order);
    console.log
    alert("Congratulations, your order is on it's way!");
    //ctrl.$state.go('shop.main');
    // where do we want the page to go once order confirmed and submitted?
 // ctrl.orderSrv.currentOrder = order;
}

OrderCtrl.prototype.getOrders = function (){
    var ctrl = this;
    var order = {
        firstName: ctrl.firstName,
        lastName: ctrl.lastName,
        status:'active'
    };

    ctrl.orderSrv.getOrders(order);

}

// OrderCtrl.prototype.deleteOrder = function(productId){
//     var ctrl = this; 
//     ctrl.productSrv.deleteProduct(ctrl.product.id);
// }

// OrderCtrl.prototype.updateOrder = function(){
//     var ctrl = this; 
//     ctrl.product.category = ctrl.category.value;
//     ctrl.productSrv.updateProduct(ctrl.product, ctrl.product.id);
// }
