var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    del = require('del'),
    wrap = require('gulp-wrap-amd'),
    exec = require('child_process').exec;;


gulp.task('clean', function(cb){
    del([
        'www/collections',
        'www/components',
        'www/controllers',
        'www/javascripts',
        'www/models',
        'www/stylesheets',
        'www/ui',
        'www/index.html',
        'www/images',
        'www/icons',
        'www/audio'
    ], cb);
});

gulp.task('styles', function() {
    gulp.src('app/stylesheets/app.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest('www/stylesheets'));
});

gulp.task('images', function(){
    return gulp.src(['app/images/*.png', 'app/images/*.jpg'])
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('www/images'));
});

gulp.task('jade', function(){
    return gulp.src('app/javascripts/templates/*.jade')
        .pipe(jade({
            client: true
        }))
        .pipe(wrap({
            deps: ['jade'],
            params: ['jade']
        }))
        .pipe(gulp.dest('www/javascripts/templates'));
});

gulp.task('scripts', function(){
    return gulp.src([
            'app/**/*.js',
            '!app/stylesheets/',
            '!app/javascripts/progressCircle.js',
            '!app/javascripts/zoe.js',
            '!app/javascripts/onerror.js',
            '!app/javascripts/offline.js',
            '!app/javascripts/infobox.js',
            '!app/javascripts/console.log.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
        
});

gulp.task('copy', function(){
    gulp.src('app/images/*.gif').pipe(gulp.dest('www/images/'));
    gulp.src('app/index.html').pipe(gulp.dest('www/'));
    gulp.src('app/icons/*.*').pipe(gulp.dest('www/icons'));
    gulp.src('app/**/*.js').pipe(gulp.dest('www/'));
    gulp.src('app/audio/*.*').pipe(gulp.dest('www/audio'));
    gulp.src('node_modules/gulp-jade/node_modules/jade/runtime.js').pipe(rename('jade.js')).pipe(gulp.dest('www/javascripts/templates/'));
    gulp.src('**/*.css', {cwd: 'app/stylesheets/**'}).pipe(gulp.dest('www/stylesheets'));
    gulp.src('app/stylesheets/fonts/*').pipe(gulp.dest('www/stylesheets/fonts'));
    gulp.src('app/stylesheets/ionic/fonts/*').pipe(gulp.dest('www/stylesheets/ionic/fonts'));

    return gulp.src([
            'aspect.js/src/aspect.js',
            'aspect.js/src/functional.js',
            'backbone/backbone.js',
            'cryptojslib/rollups/sha3.js',
            'jquery/dist/jquery.min.js',
            'jquery/dist/jquery.min.map',
            'lodash/dist/lodash.min.js',
            'parse-1.2.19.min/index.js',
            'requirejs/require.js',
            'hammerjs/hammer.min.js',
            'hammerjs/hammer.min.map',
            'jquery-hammerjs/jquery.hammer.js',
            'animate.css/animate.min.css',
            'requirejs-plugins/src/async.js',
            'moment/min/moment.min.js',
            'moment/locale/es.js',
            'chartist/dist/chartist.min.js',
            'chartist/dist/chartist.min.js.map',
        ], {cwd: 'components/**/**'})
        .pipe(gulp.dest('www/components'));
});

gulp.task('build', ['clean'], function(){
    gulp.start('styles', 'images', 'jade', 'scripts', 'copy');
});

gulp.task('build:ios', ['build'], function(cb){
    exec('bash deploy.sh', function(err){
        if(err){
            cb(err);
        }else{
            cb();
        }
    });
});