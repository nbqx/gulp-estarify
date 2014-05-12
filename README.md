## gulp-estarify

[es-tar](https://github.com/nbqx/es-tar) plugin for gulp

## Install

    $ npm install gulp-estarify

## Usage

```js
var fs = require('fs'),
    gulp = require('gulp'),
    estarify = require('gulp-estarify');

gulp.task('estarify',function(){
  var jsxPath = __dirname+'/test/fixtures/*.jsx';
  return gulp.src(jsxPath)
    .pipe(estarify({encoding:'utf8'}))
    .pipe(gulp.dest('./build'));
});
```


