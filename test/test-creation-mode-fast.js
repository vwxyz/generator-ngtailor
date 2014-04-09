/*global describe, beforeEach, it, require */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');

describe('ngtailor generator - Fast Mode', function () {
	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
			if (err) {
				return done(err);
			}

			this.app = helpers.createGenerator('ngtailor:app', [
				'../../app'
			]);
			done();
		}.bind(this));
	});

	it('creates expected files', function (done) {
		var expected = [
			'.jshintrc',
			'.editorconfig',
			'.gitignore',
			'package.json',
			'bower.json',
			'.bowerrc',
			'README.md',
			'Gruntfile.js',
			'app/index.html',
			'app/css/app.css',
			'app/js/controllers/mainController.js',
			'app/js/app.js'
		];

		helpers.mockPrompt(this.app, {
			'mode': 'fast'
		});
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.file(expected);
			done();
		});
	});

	it("don't create unexpected files", function (done) {
		var expected = [
			'.csslintrc',
			'app/less/app.less',
			'app/less/style.less',
			'app/scss/app.scss',
			'app/scss/style.scss'
		];

		helpers.mockPrompt(this.app, {
			'mode': 'fast'
		});
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.noFile(expected);
			done();
		});
	});

	it("package.json content", function (done) {

		helpers.mockPrompt(this.app, {
			'mode': 'fast'
		});
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.fileContent('package.json', /grunt-usemin/);
			assert.fileContent('package.json', /grunt-ngmin/);
			assert.fileContent('package.json', /grunt-contrib-clean/);
			assert.fileContent('package.json', /grunt-contrib-concat/);
			assert.fileContent('package.json', /grunt-contrib-uglify/);
			assert.fileContent('package.json', /grunt-contrib-cssmin/);
			assert.fileContent('package.json', /grunt-contrib-watch/);
			assert.fileContent('package.json', /grunt-bower-task/);
			assert.fileContent('package.json', /grunt-contrib-copy/);
			assert.fileContent('package.json', /grunt-contrib-jshint/);

			assert.noFileContent('package.json', /grunt-karma/);
			assert.noFileContent('package.json', /karma-ng-html2js-preprocessor/);
			assert.noFileContent('package.json', /karma-chrome-launcher/);
			assert.noFileContent('package.json', /karma-firefox-launcher/);
			assert.noFileContent('package.json', /karma-jasmine/);
			assert.noFileContent('package.json', /karma-phantomjs-launcher/);
			assert.noFileContent('package.json', /karma/);
			assert.noFileContent('package.json', /karma-coverage/);
			assert.noFileContent('package.json', /karma-ng-scenario/);
			assert.noFileContent('package.json', /grunt-rev/);
			assert.noFileContent('package.json', /grunt-contrib-sass/);
			assert.noFileContent('package.json', /grunt-contrib-csslint/);
			assert.noFileContent('package.json', /grunt-contrib-imagemin/);
			assert.noFileContent('package.json', /grunt-plato/);

			done();
		});
	});

	it("bower.json content", function (done) {

		helpers.mockPrompt(this.app, {
			'mode': 'fast'
		});
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.fileContent('bower.json', /angular/);
			assert.noFileContent('bower.json', /angular-mocks/);
			assert.noFileContent('bower.json', /angular-\w/);

			done();
		});
	});

	it("gruntfile.js content", function (done) {

		helpers.mockPrompt(this.app, {
			'mode': 'fast'
		});
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.fileContent('Gruntfile.js', /availabletasks/);
			assert.fileContent('Gruntfile.js', /bower-install/);
			assert.fileContent('Gruntfile.js', /clean/);
			assert.fileContent('Gruntfile.js', /copy/);
			assert.fileContent('Gruntfile.js', /ngmin/);
			assert.fileContent('Gruntfile.js', /useminPrepare/);
			assert.fileContent('Gruntfile.js', /usemin/);
			assert.fileContent('Gruntfile.js', /browser_sync/);
			assert.fileContent('Gruntfile.js', /jshint/);
			assert.fileContent('Gruntfile.js', /watch/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('dev', \['browser_sync', 'watch'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('package', \['jshint', 'clean', 'useminPrepare', 'copy', 'concat', 'ngmin', 'uglify', 'cssmin', 'usemin'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('ci', \['package'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('ls', \['availabletasks'\]\)/);

			done();
		});
	});


});
