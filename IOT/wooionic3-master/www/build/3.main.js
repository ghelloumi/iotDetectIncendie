webpackJsonp([3],{

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details__ = __webpack_require__(673);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailsModule", function() { return ProductDetailsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProductDetailsModule = (function () {
    function ProductDetailsModule() {
    }
    return ProductDetailsModule;
}());
ProductDetailsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__product_details__["a" /* ProductDetails */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__product_details__["a" /* ProductDetails */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__product_details__["a" /* ProductDetails */]
        ]
    })
], ProductDetailsModule);

//# sourceMappingURL=product-details.module.js.map

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__ = __webpack_require__(385);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetails; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductDetails = (function () {
    function ProductDetails(navCtrl, navParams, storage, toastCtrl, modalCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.WP = WP;
        this.reviews = [];
        this.product = this.navParams.get("product");
        console.log(this.product);
        this.WooCommerce = WP.init();
        this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then(function (data) {
            _this.reviews = JSON.parse(data.body).product_reviews;
            console.log(_this.reviews);
        }, function (err) {
            console.log(err);
        });
    }
    ProductDetails.prototype.addToCart = function (product) {
        var _this = this;
        this.storage.get("cart").then(function (data) {
            if (data == null || data.length == 0) {
                data = [];
                data.push({
                    "product": product,
                    "qty": 1,
                    "amount": parseFloat(product.price)
                });
            }
            else {
                var added = 0;
                for (var i = 0; i < data.length; i++) {
                    if (product.id == data[i].product.id) {
                        var qty = data[i].qty;
                        console.log("Product is already in the cart");
                        data[i].qty = qty + 1;
                        data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
                        added = 1;
                    }
                }
                if (added == 0) {
                    data.push({
                        "product": product,
                        "qty": 1,
                        "amount": parseFloat(product.price)
                    });
                }
            }
            _this.storage.set("cart", data).then(function () {
                console.log("Cart Updated");
                console.log(data);
                _this.toastCtrl.create({
                    message: "Cart Updated",
                    duration: 3000
                }).present();
            });
        });
    };
    ProductDetails.prototype.openCart = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* Cart */]).present();
    };
    return ProductDetails;
}());
ProductDetails = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({}),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Component */])({
        selector: 'page-product-details',template:/*ion-inline-start:"/root/Desktop/IOT/wooionic3-master/src/pages/product-details/product-details.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title> {{ product.title }} </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-fab right top edge (click)="openCart()">\n    <button ion-fab color="danger"><ion-icon name="cart"></ion-icon></button>\n  </ion-fab>\n\n  <ion-card>\n    <ion-slides autoplay="3000" loop="true">\n      <ion-slide *ngFor="let image of product.images">\n        <img [src]="image.src" />\n      </ion-slide>\n    </ion-slides>\n\n    <ion-card-content>\n      <ion-card-title>\n        {{ product.title }} &nbsp;\n        <ion-chip *ngFor="let cat of product.categories" style="margin-left: 5px;">\n          <ion-label color="danger"> {{ cat }} </ion-label>\n        </ion-chip>\n      </ion-card-title>\n\n      <p [innerHTML]="product.description"></p>\n\n      <button ion-button icon-left block outline color="danger" (click)="addToCart(product)">\n      <ion-icon name="basket"></ion-icon> Add to Cart for $ {{product.price}}\n    </button>\n\n    </ion-card-content>\n\n\n  </ion-card>\n\n  <ion-card *ngIf="product.attributes.length > 0">\n    <ion-card-content>\n      <ion-card-title>\n        Specifications\n      </ion-card-title>\n\n      <ion-grid>\n        <ion-row *ngFor="let att of product.attributes">\n          <ion-col col-4>\n            {{ att.name}}\n          </ion-col>\n          <ion-col col-8>\n            <span *ngFor="let option of att.options"> {{ option }}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card *ngIf="reviews.length > 0">\n    <ion-card-content>\n      <ion-card-title>\n        Reviews\n      </ion-card-title>\n\n      <ion-grid>\n        <ion-row *ngFor="let review of reviews">\n          <ion-col col-4>\n            <b>{{ review.reviewer_name }}</b><br/>\n            <span *ngIf="review.rating >= 1">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n            <span *ngIf="review.rating >= 2">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n            <span *ngIf="review.rating >= 3">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n            <span *ngIf="review.rating >= 4">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n            <span *ngIf="review.rating >= 5">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n\n          </ion-col>\n          <ion-col col-8>\n            {{ review.review }}\n          </ion-col>\n\n        </ion-row>\n      </ion-grid>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/root/Desktop/IOT/wooionic3-master/src/pages/product-details/product-details.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]])
], ProductDetails);

//# sourceMappingURL=product-details.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map