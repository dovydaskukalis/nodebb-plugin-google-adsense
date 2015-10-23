
var fs = require('fs'),
path = require('path'),
async = require('async'),
meta = module.parent.require('./meta');
var settings = {};
Adsense = {
	init: function() {
		var	_self = this,
		fields = [
		'client_id', 'header_id', 'footer_id', 'first_post_id', 'after_first_post_id', 'first_post_position'
		],
		defaults = {
			'client_id': '',
			'header_id': '',
			'footer_id': '',
			'first_post_id': '',
			'after_first_post_id': '',
			'first_post_position': 'bottom'

		};
		meta.settings.get('google-adsense', function(err, options) {
			for(var field in options) {
				if (options.hasOwnProperty(field)) {
					settings[field] = options[field];
				}
			}
			fs.writeFile("public/google-adsense.config.json", JSON.stringify(settings), function (err){
			})
		});
	},

	parse: function(data, callback){
		console.log(data);
	},
	admin:{
		menu: function(custom_header, callback) {
			custom_header.plugins.push({
				"route": '/plugins/google-adsense',
				"icon": 'fa-usd',
				"name": 'Google Adsense'
			});

			callback(null, custom_header);
		},
		onLoad: function(params, callback) {
			function render(req, res, next) {
				res.render('admin/plugins/google-adsense', {});
			}

			params.router.get('/admin/plugins/google-adsense', params.middleware.admin.buildHeader, render);
			params.router.get('/api/admin/plugins/google-adsense', render);

			callback();
		},
		activate: function(id) {
			if (id === 'nodebb-plugin-google-adsense') {
				var defaults = [
				{ field: 'client_id', value: '' },
				{ field: 'header_id', value: '' },
				{ field: 'footer_id', value: '' },
				{field: 'after_first_post_id', value: ''},
				{ field: 'first_post_position', value: 'bottom' },
				{ field: 'first_post_id', value: '' }
				];

				async.each(defaults, function(optObj, next) {
					meta.settings.setOnEmpty('google-adsense', optObj.field, optObj.value, next);
				});
			}
		},
		deactivate: function(id) {
			if (id === 'nodebb-plugin-google-adsense') {
				fs.unlink("public/google-adsense.config.json", function (){

				})
			}
		}
	}
};

Adsense.init();
module.exports = Adsense;
