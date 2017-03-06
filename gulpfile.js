//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
	sass = require("gulp-sass-china"),
	dgbl = require("del-gulpsass-blank-lines"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
    minifyCss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    revReplace = require('gulp-rev-replace'),
    useref = require('gulp-useref'),
    revReplace = require('gulp-rev-replace'),
    runSequence = require('run-sequence'),
	config = require('./config.js');
var dirname = 'src/static';
var divname = 'src/min';
var sa="sa";
//scss转css
gulp.task('sass', function (){
    gulp.src(config.sass.src)
        .pipe(sass({
            outputStyle: 'compact'
        })
        .on('error', sass.logError))
        .pipe(dgbl())
        .pipe(gulp.dest(config.sass.dest));
});
//css压缩
gulp.task('css', function (){
     return gulp.src(config.css.src)
    .pipe(rev())
    .pipe(gulp.dest(config.css.dest))
    .pipe(rev.manifest())            
    .pipe(gulp.dest("src/min/rev/css")); 
});
//css压缩
gulp.task('cssLib', function (){
     return gulp.src(config.css.src)
    .pipe(minifyCss())
    .pipe(gulp.dest(config.css.dest))
});
gulp.task('js', function() {
    return gulp.src(config.js.src)
        .pipe(rev())
        .pipe(gulp.dest(config.js.dest))
        .pipe(rev.manifest())            
        .pipe(gulp.dest("src/min/rev/js")); 
})
gulp.task('minifyjs', function() {
    return gulp.src(config.js.src)
        .pipe(uglify())    //压缩
        .pipe(gulp.dest(config.js.dest))
});
gulp.task('rev', function() {
    gulp.src(['src/min/rev/**/*.json', 'src/**/*.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('src/'));                     //- 替换后的文件输出的目录
});
//合并html页面内引用的静态资源文件
gulp.task('html', function () {
    return gulp.src('src/**/*.html')
    .pipe(useref())
    .pipe(revReplace())
    .pipe(gulp.dest('src/'));
})
//图片压缩
gulp.task('imagemin', function(){
    gulp.src(config.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(config.images.dest))
})
//temp图片
gulp.task('image', function(){
    gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.dest))
})

// //合并，压缩
// gulp.task("mergecompression",function(){
//     // 把1.js和2.js合并压缩为main.js，输出到dest/js目录下
//     gulp.src([dirname + '/js/jquery.min.js',dirname + '/js/test.js'])
//     	.pipe(concat('main.js'))
//     	.pipe(uglify())
//     	.pipe(gulp.dest(divname + '/js'));
// })

//清空文件夹，避免资源冗余
gulp.task('cleanTemp',function(){
    return gulp.src('src/temp',{read:false}).pipe(clean());
});
//清空文件夹，避免资源冗余
gulp.task('cleanMin',function(){
    return gulp.src('src/min',{read:false}).pipe(clean());
});
//合并
// gulp.task("hebin",function(){
//     // 把1.js和2.js合并为main.js，输出到dest/js目录下
//     gulp.src([dirname + '/js/jquery.min.js',dirname + '/js/test.js'])
//      .pipe(concat('main.js'))
//      .pipe(gulp.dest(divname + '/js'));
// });
gulp.task('default', function(sa) {
    config =config.temp;
    runSequence('cleanTemp', ['sass','css','js','html','image'],'rev');
});
gulp.task('build', function(sa) {
    config =config.min;
    runSequence('cleanMin', ['cssLib','minifyjs','imagemin']);
});

