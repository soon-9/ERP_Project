/*global QUnit*/

sap.ui.define([
	"zc303rsphoto/zc303rs_photo/controller/PhotoView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("PhotoView Controller");

	QUnit.test("I should test the PhotoView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
