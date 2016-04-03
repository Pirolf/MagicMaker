const gulp = require('gulp');
const jasmineBrowser = require('gulp-jasmine-browser');
const webpack = require('webpack-stream');

gulp.task('default', () => {
    return gulp.src(['app/**/*.jsx', 'app/assets/javascripts/components.js', 'spec/**/*_helper.jsx', 'spec/**/*_spec.jsx'])
        .pipe(webpack({
            watch: true, 
            module: {
                loaders: [{ 
                    test: /\.jsx$|\.js/, 
                    exclude: /node_modules/, 
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'react', 'stage-0', 'stage-1'],
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