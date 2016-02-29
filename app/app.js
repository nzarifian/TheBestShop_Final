'use strict';

var app = angular.module('shopApp',[
  'ui.router',
  ]);

app.config(function($stateProvider, $httpProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('main');

  $stateProvider
    .state ('shop',{
      url:'/',
      templateUrl: 'site/partials/shop-nav.html',
      controller: 'ShopCtrl as ctrl',
      resolve:{
        products: function(productSrv){
          return productSrv.getProducts();
        }
      }
    })
    .state ('shop.main', {
      url:'main',
      templateUrl: 'site/partials/shop-main.html',
    })

    .state ('shop.product', {
      url:'product/:category',
      templateUrl: 'site/partials/shop-product.html',
      controller: 'ShopCtrl as ctrl',
      resolve:{
        products: function(productSrv){
          return productSrv.getProducts();
        }
      }
    })
    .state ('shop.item',{
      url:'item/:productId',
      templateUrl: 'site/partials/shop-item.html',
      controller: 'DetailsCtrl as ctrl',
      resolve:{
        product: function(productSrv, $stateParams){
          return productSrv.getProduct($stateParams.productId);
        }
      }
    })
    .state ('shop.cart', {
      url:'cart',
      templateUrl: 'site/partials/shop-cart.html',
      controller: 'OrderCtrl as ctrl',
      resolve:{
        orders: function(orderSrv){
          console.log('hi');
          return orderSrv.getOrders();
        }
      }
    })

    .state ('auth', {
      url:'/auth',
      templateUrl: 'site/partials/admin-login.html',
      controller: 'AuthCtrl as ctrl',
      resolve:{
        products: function(productSrv){
          return productSrv.getProducts();
        }
      }
    })

    .state ('admin', {
      url:'/admin',
      templateUrl: 'site/partials/admin-main.html',
      controller: 'AdminCtrl as ctrl',
      resolve:{
        products: function(productSrv){
          return productSrv.getProducts();
        }
      }
    })

    .state ('admin.inventory', {
      url:'addedit',
      templateUrl: 'site/partials/admin-addedit.html',
      //controller: 'AdminCtrl as ctrl',
      resolve:{
        products: function(productSrv){
          return productSrv.getProducts();
        }
      }
    })

    .state ('admin.inventory-add', {
      url:'add',
      templateUrl: 'site/partials/admin-add.html',
      controller: 'ProductCtrl as ctrl',
      resolve:{
        products: function(productSrv){
          return productSrv.getProducts();
        }
      }
    })

    .state ('admin.inventory-edit', {
      url:'edit_product/:productId',
      templateUrl: 'site/partials/admin-edit.html',
      controller: 'ProductCtrl as ctrl',
      resolve:{
        products: function(productSrv){
          return productSrv.getProducts();
        }
      }
    })
    .state ('admin.orders', {
      url:'/orders',
      templateUrl: 'site/partials/admin-orders.html',
      controller: 'OrderCtrl as ctrl',
      resolve:{
        orders: function(orderSrv){
          console.log('hi');
          return orderSrv.getOrders();
        }
      }
    })
    .state ('orders.updateOrder', {
      url:'/updateOrder',
      templateUrl: 'site/partials/admin-ordersUpdate.html',
      controller: 'OrderCtrl as ctrl',
      resolve:{
        orders: function(orderSrv){
          console.log('hi');
          return orderSrv.getOrders();
        }
      }
    })
    .state ('product.search', {
      url:'/search',
      templateUrl: 'site/partials/shop-search.html',
      controller: 'ProductCtrl as ctrl'
    })
    .state('checkout', {
      url:'/checkout',
      templateUrl: 'site/partials/shop-checkout.html',
      controller: 'OrderCtrl as ctrl',
      resolve:{
        orders: function(orderSrv){
          console.log('hi');
          return orderSrv.getOrders();
        }
      }
    })
    .state('submitOrder', {
      url:'/submitOrder',
      templateUrl:'site/partials/shop-submit.html',
      controller: 'OrderCtrl as ctrl',
      resolve:{
        orders: function(orderSrv){
          console.log('hi');
          return orderSrv.getOrders();
        }
      }
    })


  $httpProvider.interceptors.push(function() {
    return {
      'request': function(config) {
        config.headers = config.headers || {};
        if (localStorage.authToken) {
          config.headers.Authorization = localStorage.authToken;
        }
        return config;
      }
    };
  });
});

