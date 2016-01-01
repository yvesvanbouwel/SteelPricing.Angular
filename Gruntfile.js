(function(){
	module.exports = function(grunt){
		var userConfig = require('./build.config.js');
		
		var taskConfig = {
			pkg: grunt.file.readJSON('package.json'),
			clean: {
				options: {
        			'no-write': true
    			},
				build: [
					userConfig.build_dir + '/**', 
					userConfig.build_dir,
					userConfig.compile_dir + '/**',
					userConfig.compile_dir ]
			},
			copy:{
				build: {
					files: [
						{
							expand: true,
							src: userConfig.source_root,
							dest: userConfig.compile_dir,
							cwd: 'src/'
						},
					]		
				}
			},
			index: {
				build: {
					dir: userConfig.compile_dir,
					src: [
						userConfig.vendor_files.js,
						userConfig.vendor_files.css,
						userConfig.compile_dir + 'app/*.js',
						userConfig.compile_dir + 'app/**/*.js',
						userConfig.compile_dir + '/assets/**/*.css'
					]
				}
			}
		};
		
		grunt.registerMultiTask( 'index', 'Process index.html template', function () {
			var dirRE = new RegExp( '^(' + userConfig.build_dir + '|' + userConfig.compile_dir + ')\/', 'g' );
			var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
				return file.replace( dirRE, '' );
			});
			var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
				return file.replace( dirRE, '' );
			});
			
			grunt.file.copy('src/index.html', this.data.dir + '/index.html', { 
				process: function ( contents, path ) {
					return grunt.template.process( contents, {
						data: {
							scripts: jsFiles,
							styles: cssFiles,
							version: grunt.config( 'pkg.version' )
						}
					});
				}
			});
		});
			
		/**
		* A utility function to get all app JavaScript sources.
		*/
		function filterForJS ( files ) {
			return files.filter( function ( file ) {
				return file.match( /\.js$/ );
			});
		}
	
		/**
		* A utility function to get all app CSS sources.
		*/
		function filterForCSS ( files ) {
			return files.filter( function ( file ) {
				return file.match( /\.css$/ );
			});
		}
		
		grunt.initConfig(taskConfig);
		
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-copy');
		
		grunt.registerTask('default', ['clean:build', 'copy:build', 'index']);
}})();


/*
	/ => app sources
	/vendor => vendor sources
	/assets/css => css files
*/