module.exports = {
	source_root: 'src/',
	build_dir: 'build',
	compile_dir: 'bin',
	
	app_files: {
		js: [
			'src/app/**/*.js'
		],
		html: [
			'**/*.html'
		],
		css: [
			'src/assets/css/**/*.css'
		],
		data:[
			'src/data/*.json'
		]
	},
	
	vendor_files:{
		js: [
			'src/vendor/lodash/lodash.min.js',
			'src/vendor/jquery/dist/jquery.min.js',
			'src/vendor/angular/angular.min.js',
			'src/vendor/bootstrap/dist/js/bootstrap.min.js',
			'src/vendor/angular-bootstrap/ui-bootstrap.min.js',
			'src/vendor/angular-route/angular-route.min.js'
		],
		css: [
			'src/vendor/bootstrap/dist/css/bootstrap.css'
		]
	}
}