/*global QUnit*/

sap.ui.define([
	"zc303rscheck/zc303rs_check/controller/CheckView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CheckView Controller");

	QUnit.test("I should test the CheckView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
