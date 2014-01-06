/**
* JS Testing...
*/

'use strict';

var globalDev = 'Ryan P.';

function localScope () {
	var localDev = 'Ryan P.';
	console.log(localDev);
}
localScope();
console.log(globalDev);


(function () {

	var spaTesting = (function () {
	
		var roominate, secure, complete;
		secure = true;
		complete = false;
	
		roominate = {
			appName: 'Roominate',
			developers: ['Ryan P.', 'Joe V.'],
			contributors: ['Mason S.', 'Eric D.'],
			getAppName: function () {
				var value = roominate.appName;
				console.log(value);
			}
		};
	
		roominate.getAppName();
	
	}());

}());