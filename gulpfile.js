'use strict';

require('es6-promise').polyfill();
var gulp = require('gulp')
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');
var rev = require('gulp-rev');
var del = require('del');
var inject = require('gulp-inject');
var ngConstant = require('gulp-ng-constant');
var argv = require('yargs').argv;
var rename = require("gulp-rename");

var paths = {
  scripts: ['app/*.js', 'app/**/*.js', '!app/**/*_test.js', '!app/bower_components/*.js', '!app/bower_components/**/*.js',
            'app/assets/translations/*.json', 'app/assets/css/*.css', '!app/build/*','!app/build/**/*'],
  images: 'app/assets/images/*',
  build: 'app/build/',
  index : 'app/index.html',
};

gulp.task('index', ['clean', 'copy-config'], function () {
 var target = gulp.src(paths.index);
 // It's not necessary to read the files (will speed up things), we're only after their paths:
 var sources = gulp.src(paths.scripts, {read: false});

 return target.pipe(inject(sources, {relative : true}))
   .pipe(gulp.dest('app/'));
});

gulp.task('clean', function() {
  return del([paths.build]);
});

gulp.task('copy', ['clean'], function () {
	return gulp.src(['app/**/*.+(jpg|jpeg|gif|png|html|htm|ico|ttf|woff|woff2|otf|eot|eof|svg|json)', '!./dist/{lib,lib/**}',
                    'app.yaml', '!app/index.html'])
		.pipe(gulp.dest('app/build'));
});


gulp.task('copy-fonts', ['clean'], function () {
	return gulp.src(['app/bower_components/font-awesome/fonts/*.+(eot|svg|ttf|woff|woff2|otf)'])
		.pipe(gulp.dest('app/build/assets/fonts'));
});


gulp.task('copy-config', function () {
    var environment = argv.env || 'development';
	return gulp.src('config/'+environment+'/config.json')
        .pipe(ngConstant({name: 'myApp.config'}))
		.pipe(gulp.dest('app'));
});


gulp.task('usemin', ['index', 'clean', 'copy', 'copy-config'], function() {
  return gulp.src(paths.index)
    .pipe(usemin({
      css: [  replace("url('../images/","url('assets/images/"), replace("url('../fonts/","url('assets/fonts/"), minifyCss({keepSpecialComments: 0}), rev() ],
      html: [ minifyHtml({ collapseWhitespace: true,removeAttributeQuotes: false}) ],
      js: [ uglify({mangle:false}) ]
    }))
    .pipe(rev())
    .pipe(gulp.dest(paths.build));
});


gulp.task('rename-index', ['usemin'], function() {
  return gulp.src('app/build/index-*.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest(paths.build));
});


gulp.task('build', ['rename-index', 'clean', 'index', 'copy', 'usemin', 'copy-fonts', 'copy-config']);

gulp.task('dev', ['index']);

gulp.task('default', ['build']);
