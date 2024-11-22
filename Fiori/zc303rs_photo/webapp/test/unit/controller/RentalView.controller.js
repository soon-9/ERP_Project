/*global QUnit*/

sap.ui.define([
	"zc303sdphoto/zc303rs_photo/controller/RentalView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("RentalView Controller");

	QUnit.test("I should test the RentalView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
