/* gulp dependencies */

var gulp = require('gulp');

var del = require('del');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var minimist = require('minimist');

var knownCmdOptions = {
	string : ['env', 'target'],
	default : {
	  env : process.env.NODE_ENV || 'development'
	}
};

var options = minimist(process.argv.slice(2), knownCmdOptions);

var PRODUCTION_ACTIVE = options.env === 'production';
var TARGET_ENVIRIOMENT = options.target || 'dev';
var DIST_FOLDER = './dist-' + (options.target || 'dev');

var CSS_SOURCES = [
	'./node_modules/flexboxgrid/dist/flexboxgrid.css',
	'./node_modules/mdi/css/materialdesignicons.css',
	'./node_modules/roboto-fontface/css/roboto-fontface.css',
	'./src/public/styles/app.styl'
]

var FONT_SOURCES = [
	'./node_modules/roboto-fontface/fonts/*',
	'./node_modules/mdi/fonts/*'
]

/* gulp tasks */

// clean
gulp.task('clean', function(){

	return del([DIST_FOLDER + '/*.*', DIST_FOLDER + '/*', DIST_FOLDER], {force: true}, null);

});


// scripts

var handleErrors = function(){
	var args = Array.prototype.slice.call(arguments);

	notify.onError({
		title: 'Compile error',
		message: '<%= error.message %>'
	}).apply(this, args);

	this.emit('end');
}

gulp.task('scripts', ['config'], function(){

	return browserify('./src/app.js', { debug: true })
	.transform('babelify', {
		presets : ['es2015', 'react'],
		plugins : ['transform-object-rest-spread']
	})
	.bundle()
	.on('error', handleErrors)
	.pipe(source('app.js'))
	.pipe(buffer())
	.pipe(gulpif(PRODUCTION_ACTIVE, uglify())) // only minify in production
	.pipe(gulpif(PRODUCTION_ACTIVE, sourcemaps.init())) // only minify in production
	.pipe(gulpif(PRODUCTION_ACTIVE, sourcemaps.write('.'))) // only minify in production
	.pipe(gulp.dest(DIST_FOLDER))
	.pipe(browserSync.reload({stream: true}));

});

// styles
gulp.task('styles', ['clean'], function(){

	return gulp.src(CSS_SOURCES)
	.pipe(gulpif(/[.]styl$/, stylus({
		'include css': true
	})))
	.on('error', handleErrors)
	.pipe(autoprefixer())
	.pipe(gulpif(PRODUCTION_ACTIVE, sourcemaps.init())) // only minify in production
	.pipe(concat('app.min.css'))
	.pipe(gulpif(PRODUCTION_ACTIVE, minify())) // only minify in production
	.pipe(gulpif(PRODUCTION_ACTIVE, sourcemaps.write('.'))) // only minify in production
	.pipe(gulp.dest(DIST_FOLDER + '/css'))
	.pipe(browserSync.reload({stream: true}));

});


// config
gulp.task('config', function(){

	return gulp.src(['./src/config-' + TARGET_ENVIRIOMENT + '.json'])
	.pipe(concat('config.json'))
	.pipe(gulp.dest('./src'));

});


// html
gulp.task('html', ['clean'], function(){

	return gulp.src('./src/*.html')
	.pipe(gulp.dest(DIST_FOLDER));

});


// fonts
gulp.task('fonts', ['clean'], function(){

	return gulp.src(FONT_SOURCES)
	.pipe(gulp.dest(DIST_FOLDER + '/fonts'));

});


// build
gulp.task('build-only', [
	'scripts',
	'styles',
	'fonts',
	'html'
]);

// build and clean
gulp.task('build', ['build-only'], function(){

	// remove config.json file
	return del(['./src/config.json'], {force: true}, null);

});


// watch
gulp.task('watch', ['build'], function(){

	browserSync.init({
		server: DIST_FOLDER
	});

	gulp.watch(['./src/**/*.js', './src/**/*.jsx'], ['scripts']);
	gulp.watch(['./src/**/*.styl'], ['styles']);

});

// default
gulp.task('default', ['watch']);
