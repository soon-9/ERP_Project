/*global QUnit*/

sap.ui.define([
	"sdfdsfds/project1/controller/bsview.controller"
], function (Controller) {
	"use strict";

	QUnit.module("bsview Controller");

	QUnit.test("I should test the bsview controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
