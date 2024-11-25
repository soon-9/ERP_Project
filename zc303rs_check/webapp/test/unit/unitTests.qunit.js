/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc303rscheck/zc303rs_check/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
