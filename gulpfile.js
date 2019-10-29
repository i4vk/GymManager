const gulp = require('gulp');
const pm2 = require('pm2');
var exec = require('child_process').exec;
var jest = require('gulp-jest').default;
var apidoc = require('gulp-apidoc');
var jsdoc = require('gulp-jsdoc3');


gulp.task('install', function (cb) {
  exec('npm install', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('start', function(cb) {
  pm2.connect(false, function(err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }

    pm2.start({
      name: 'GymManager',
      script: './src/bin/www',
      execMode: 'cluster',
      instances: 1
    }, function (err) {
      if (err) {
        throw err;
      }
      console.log("Iniciando servidor GymManager");
    });
  });
});

gulp.task('stop', function(cb) {
  exec('pm2 stop ./src/bin/www', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('restart', function(cb) {
  pm2.restart('./src/bin/www', function(err) {
    if (err) {
      throw err;
    }
  })
})

gulp.task('test', () => (
    gulp.src('test', {read: false}).pipe(jest({reporter:'default'}))
));

gulp.task('doc', function(done){
  exec('jsdoc ./src/gymManager.js -d ./docs/gymManager', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
  apidoc({
    src: "./src/routes",
    dest: "./docs/rest",
    config: "./"
  }, done);
})
