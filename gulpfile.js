const gulp = require('gulp');
const jasmineBrowser = require('gulp-jasmine-browser');
const webpack = require('webpack-stream');

gulp.task('default', () => {
    return gulp.src(['app/**/*.jsx', 'spec/**/*_helper.jsx', 'spec/**/*_spec.jsx'])
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
            output: {
                filename: 'bundle.js'
            }
        }))
    .pipe(gulp.dest('dist/'))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});