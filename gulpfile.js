// 实时监测less文件改变完成编译

var gulp = require("gulp");
var less = require("gulp-less");
var auto = require("gulp-autoprefixer");//css浏览器兼容前缀


gulp.task('compileLess', done => {
  //找到项目中less文件夹中所有文件夹下的所有less文件
  gulp.src("./less/**/*.less")
    //进行预编译处理,保持与引入的模块一致
    .pipe(less())
    .pipe(auto({
      grid: true,
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ]
    }))
    //编译后将less编译成的css文件保存到项目目录下的css文件夹中
    .pipe(gulp.dest('./css'))
  done();
});

// 通过watch方法实时监测所有less文件，如果发生更改，执行compileLess方法
gulp.task('watch', function () {
  gulp.watch('./less/**/*.less', gulp.series('compileLess'));
})
// 使用方法
// 1. npm i 或 cnpm i 或yarn install安装依赖
// 2. 控制台输入 gulp watch 命令实现编译并且监听