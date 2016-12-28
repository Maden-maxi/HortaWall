const gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	wiredep = require('wiredep').stream,
	del = require('del'),
	sequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('pug', () => {
	return gulp.src('src/pug/*.pug')
		.pipe($.pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest('src'));
});

gulp.task('pug-watch', ['pug'], reload);

gulp.task('watch:pug', () => {
	gulp.watch('src/**/*.pug', ['pug']);
});


gulp.task('pug:parts', () => {
	return gulp.src('src/templates/parts/*.pug')
		.pipe($.pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest('src/assets/parts'));
});

gulp.task('assets', () => {
	return gulp.src('src/assets/**/*')
		.pipe(gulp.dest('dist/assets'));
});

gulp.task('php', () => {
	return gulp.src('src/*.php')
		.pipe(gulp.dest('dist'));
});

gulp.task('styl',  () => {
	return gulp.src('src/styl/style.styl')
		.pipe($.sourcemaps.init())
		.pipe($.stylus({compress:false}))
		.pipe($.autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('src/css/'));
});

gulp.task('watch:styl', () => {
	gulp.watch('src/styl/**/*', ['styl']);
});



gulp.task('js',  () => {
	return gulp.src('src/js/app.js')
		.pipe($.babel({
			presets: ['es2015']
		}))
		.pipe($.uglify())
		.pipe( gulp.dest('dist/js'));
});
 
gulp.task('bower',  () => {
  gulp.src('src/*.html')
    .pipe(wiredep({
    	directory: "src/bower_components"
    }))
    .pipe(gulp.dest('src'));
});


gulp.task('html',  () => {
	return gulp.src('src/index.html')
		.pipe($.useref())
		.pipe($.if('*.js', $.babel()))
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.cleanCss()))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean',  () => {
	del(['dist']).then(paths => {
	    console.log('Deleted files and folders:\n', paths.join('\n'));
	});
});

gulp.task('dev', () => {
	gulp.watch('src/styl/**/*.styl', ['styl']);
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('bower.json', ['bower']);
	gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('dist', cb => {
	sequence( 'clean', 'pug', 'styl', 'js' , 'bower', 'assets', 'php','html', cb);
});

gulp.task('default', ['styl', 'pug'],() => {
    browserSync({server:'./src'});

    gulp.watch('src/styl/**/*.styl', ['styl']);
    gulp.watch('src/**/*.pug', ['pug-watch']);
});