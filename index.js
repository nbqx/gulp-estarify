var estar = require('es-tar'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    _defaults = require('lodash.defaults'),
    through2 = require('through2');

module.exports = function(opts){
  opts = _defaults(opts || {}, {encoding:'utf8'});

  function doing(p,next){
    estar(p.path,opts).on('data',next);
  };

  function _transform(file,e,next){
    var self = this;
    var path = file.path;
    var stream;

    if(file.isNull()){
      self.push(file);
      return next();
    }

    if(file.isStream()){
      self.emit('error',new PluginError('gulp-estarify','stream not supported'));
      return next();
    }

    var scrt = estar.sync(file.path,opts);
    file.contents = new Buffer(scrt);
    self.push(file);
    next();
  };

  return through2.obj(_transform);
};
