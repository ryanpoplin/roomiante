'use strict';	

/**
* Config...
*/

var spa = (function ($) {

	var configMap = {
		extendedHeight: 434,
		extendedTitle: 'Click here...',
		retractedHeight: 16,
		retractedTitle: 'Click here...',
		templateHtml: '<div class="spa-slider"><\/div>'
	},
	// Remaining vars...
	$chatSlider, toggleSlider, onClickSlider, initModule;
	// DOM Time...
	toggleSlider = function () {
		var sliderHeight = $chatSlider.height();
		if (sliderHeight === configMap.retractedHeight) {
			$chatSlider.animate({
				height: configMap.extendedHeight
			}).attr('title', configMap.extendedTitle);
			return true;
		} else if (sliderHeight === configMap.extendedHeight) {
			$chatSlider.animate({
				height: configMap.retractedHeight
			}).attr('title', configMap.retractedTitle);
			return true;
		}
		return false;
	};
	onClickSlider = function (event) {
		toggleSlider();
		return false;
	};
	initModule = function ($container) {
		$container.html(configMap.templateHtml);
		$chatSlider = $container.find('.spa-slider');
		$chatSlider.attr('title', configMap.retractedTitle).click(onClickSlider);
		return true;
	};

	return {initModule: initModule};

}(jQuery));

$(function () {

(function ($) {

/* jslint settings

	browser: true,
	continue: true,
	devel: true,
	indent: 2,
	maxerr: 50,
	newcap: true,
	nomen: true,
	plusplus: true,
	regexp: true,
	sloppy: true,
	vars: true,
	white: true

 */

	// Namespace...
	var Roominate = {
		Models: {},
		Collections: {},
		Views: {},
		Router: null
	};

	// Testing Application Views...

	Roominate.Views.SPA = Backbone.View.extend({
		tagName: 'div',
		template: _.template($('#spa-template').html()),
		initialize: function () {
			console.log('SPA View is ready...');
			this.el = $('#roominate');
		},
		render: function () {
			this.el.html(this.template());
			return this;
		}
	});

	// Core Application Views...

	// Index View...
	Roominate.Views.Index = Backbone.View.extend({
		tagName: 'div',
		template: _.template($('#index-template').html()),
		/*events: {

		}*/
		initialize: function () {
			console.log('"Index" view was init...');
			this.el = $('#roominate');
		},
		render: function () {
			this.el.html(this.template());
			return this;	
		}
	});

	// Sign Up View...
	Roominate.Views.SignUp = Backbone.View.extend({
		tagName: 'div',
		template: _.template($('#sign-up-template').html()),
		/*events: {

		}*/
		initialize: function () {
			console.log('"Sign Up Template" view was init...');
			this.$el = $('#roominate');
		},
		render: function () {
			this.$el.html(this.template());
			return this;
		}
	});

	/**
	* Company Setup...
	*/

	/**
	* Company Utility...
	*/	

	// CompanyFeaturesUtility Model...
	Roominate.Models.CompanyFeaturesUtility = Backbone.Model.extend({
		defaults: {
			hours: '',
			rooms: 0,
			users: 0
			// Config time slots...
			// Config login info...
		},
		initialize: function () {
			console.log('"CompanyFeaturesUtility" was init...');
		}
	});

	/**
	* Company Model...
	*/

	/**
	* Users will be one-to-one with the Company Model...
	*/

	// Company Model...
	Roominate.Models.Company = Backbone.Model.extend({
		defaults: {
			name: 'A company with no name...'
			// fullAdminNames
		},
		mutators: {
			companyName: {
				get: function () {
					return 'Company: ' + this.get('name');	
				}
			},
			adminName: {
				set: function (key, value, options, set) {
					var adminNames = value.split(' ');
					this.set('adminFirstName', adminNames[0], options);
					this.set('adminLastName', adminNames[1], options);
				}
			}
		},
		// Config proper model validation...
		// attrs === values that were changed...
		/*validate: function (attrs) {
			if (!attrs.name || !attrs.idAttribute) {
				console.log('Companies require names...');
			}
		},*/
		initialize: function () {
			console.log('The "Company" model has been init...');
    		this.set('info', new Roominate.Models.CompanyFeaturesUtility());
			// In general...
			this.on('change', function () {
        		console.log('Values for this model have changed...');
    		});
    		if (!this.has('date')) {
    			var date = new Date();
    			this.set('date', date.toISOString());
    		}
    		if (!this.has('id')) {
    			var id = Math.random().toString(36).substr(2);
    			this.set('idAttribute', id);
    		}
		}
	});

	var theIronYardModel = new Roominate.Models.Company({
		name: 'The Iron Yard'
	});

	theIronYardModel.get('info').set({
		hours: '8:00 A.M. - 5:00 P.M.',
		rooms: 2
	});


	// Always .escape('') user entered text...

	// Company Testing...

	// Log Testing for theIronYardModel...
	console.log(theIronYardModel);
	var name = theIronYardModel.get('name');
	console.log(name);
	var info = theIronYardModel.get('info');
	var rooms = info.get('rooms');
	console.log(rooms);
	var companyId = theIronYardModel.get('idAttribute');
	console.log(companyId);
	var companyName = theIronYardModel.get('companyName');
	console.log(companyName);
	// Just a testing clone for theIronYardModel...
	var theIronYardModelClone = theIronYardModel.clone();
	console.log(theIronYardModelClone);
	theIronYardModelClone.get('info').set({
		hours: 'Times...',
		rooms: 234234234
	});

	// User Testing...



	// Company View...
	Roominate.Views.Company = Backbone.View.extend({
		model: theIronYardModel,
		tagName: 'div',
		template: _.template($('#company-template').html()),
		/*events: {

		}*/
		initialize: function () {
			console.log('"Company" view was init...');
			this.$el = $('#roominate');
		},
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	// RoomFeaturesUtility Model...
	Roominate.Models.RoomFeaturesUtility = Backbone.Model.extend({
		defaults: {
			seats: 0,
			tv: false,
			projector: false,
			coffeeMaker: false,
			gamingConsole: false
			// Add more if needed...
		},
		initialize: function () {
			console.log('"RoomFeaturesUtility" model was init...');
		}
	});

	// Room Model...
	Roominate.Models.Room = Backbone.Model.extend({
		defaults: {
			name: 'A room with no name...',
		},
		validate: function (attrs) {
			if (!attrs.name) {
				console.log('Rooms require names...');
			}
		},
		initialize: function () {
			console.log('"Room" model was init...');
			this.set('features', new Roominate.Models.RoomFeaturesUtility());
		}
	});

	// Ouya Room...
	var ouyaRoom = new Roominate.Models.Room({
		name: 'Ouya Room'
	});

	ouyaRoom.get('features').set({
		seats: 8,
		tv: true,
		gamingConsole: true
	});

	// Small Room...
	var smallRoom = new Roominate.Models.Room({
		name: 'Small Room'
	});

	smallRoom.get('features').set({
		seats: 3
	});

	// Router...
	Roominate.Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'signUp': 'signUp',
			'testing': 'testing'
		},
		index: function () {
			var indexView = new Roominate.Views.Index();
			indexView.render();
		},
		signUp: function () {
			var signUp = new Roominate.Views.SignUp();
			signUp.render();
		},
		testing: function () {
			spa.initModule($('#roominate'));
			// var testingView = new Roominate.Views.SPA();
			// testingView.render();
		}
	});

	new Roominate.Router();
	Backbone.history.start();

}(jQuery));
});