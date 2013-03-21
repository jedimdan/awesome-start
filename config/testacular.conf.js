basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'static/lib/angular/angular.js',
  'static/lib/angular/angular-*.js',
  'static/js/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
