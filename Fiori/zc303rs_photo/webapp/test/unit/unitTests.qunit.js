/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc303sdphoto/zc303rs_photo/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
