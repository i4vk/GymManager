const gulp = require('gulp');
const pm2 = require('pm2');
var exec = require('child_process').exec;
var jest = require('gulp-jest').default;
var apidoc = require('gulp-apidoc');

// Tarea para iniciar el servidor creando una instancia de pm2
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
  })
  pm2.disconnect();
});

// Inicia el servidor sin hacer uso de pm2
gulp.task('start-simple', function(cb) {
  exec('node ./src/bin/www', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Detiene la instancia de pm2 del servidor en ejecución
gulp.task('stop', function(cb) {
  exec('pm2 stop ./src/bin/www', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Reinicia el servidor
gulp.task('restart', function(cb) {
  exec('pm2 restart ./src/bin/www', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

// Ejecuta los test
gulp.task('test', () => (
    gulp.src('test', {read: false}).pipe(jest({reporter:'default'}))
));

// Comprueba la cobertura de los test sobre el código
gulp.task('coveralls', function(cb) {
  exec('npm run coveralls', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

// Compila toda la documentación del proyecto y la almacena en el directorio docs/
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
});

// Tarea default que instala los requisitos y ejecuta los test posteriormente
gulp.task('default', gulp.series('test'));
