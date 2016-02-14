const gulp = require('gulp');
const babel = require('gulp-babel');
const jasmineBrowser = require('gulp-jasmine-browser');
const browserify = require('gulp-browserify');
const webpack = require('webpack-stream');

gulp.task('default', function() {
    return gulp.src(['app/**/*.jsx', 'spec/**/*_spec.jsx'])   
        .pipe(webpack({
            watch: true, 
            module: {
                loaders: [{ 
                    test: /\.jsx$/, 
                    exclude: /node_modules/, 
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'react'],
                        plugins: ["transform-react-require"]
                    }
                }]
            },
            output: {filename: 'spec.js'}
        }))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});