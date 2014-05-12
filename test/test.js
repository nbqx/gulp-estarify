var fs = require('fs'),
    test = require('tape'),
    gutil = require('gulp-util');

var estarify = require('../');

test('gulp-estarify test',function(t){
  var jsx = new gutil.File({
    cwd: __dirname,
    base: [__dirname,'fixtures'].join('/'),
    path: [__dirname,'fixtures','test.jsx'].join('/'),
    contents: fs.readFileSync([__dirname,'fixtures','test.jsx'].join('/'))
  });

  var est = estarify({encoding:'utf8'});
  est.on('data',function(out){
    var res = fs.readFileSync([__dirname,'out.jsx'].join('/'))+'';
    t.equal(out.path,[__dirname,'fixtures','test.jsx'].join('/'));
    t.equal(out.contents+'',res);
    t.end();
  });
  
  est.write(jsx);
});
