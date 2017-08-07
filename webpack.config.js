'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * ENV
 * Get npm lifecycle event to identify the environment
 * Flag for running only certain parts of code according to what npm script is executed
 * Reference: https://docs.npmjs.com/misc/scripts#current-lifecycle-event
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
	/**
	 * CONFIG
	 * Object where all configurations will be set
	 */
	var config = {};

	/**
	 * ENTRY
	 * The entry point for the bundle
	 * Should be an empty object if it's generating a test build
	 * Karma will set this when it's a test build
	 * Reference: http://webpack.github.io/docs/configuration.html#entry
	 */
	config.entry = isTest ? void 0 : {
		app: './src/app.js'
	};

	/**
	 * OUTPUT
	 * Tell Webpack how to write the compiled files to disk
	 * Should be an empty object if it's generating a test build
	 * Karma will handle setting it up when it's a test build
	 * Reference: http://webpack.github.io/docs/configuration.html#output
	 */
	config.output = isTest ? {} : {
		// Absolute output directory
		path: __dirname + '/dist',

		// Output path from the view of the page
		// Uses webpack-dev-server in development
		publicPath: '/',

		// Filename for entry points
		filename: isProd ? '[name].js' : '[name].bundle.js',

		// Filename for non-entry points
		// Only adds hash in build mode
		chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
	};

	/**
	 * Devtool
	 * Type of sourcemap to use per build type
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 */
	if (isTest) {
		// SourceMap is added as DataUrl to the JavaScript file
		config.devtool = 'inline-source-map';
	} else if (isProd) {
		// SourceMap is emitted
		config.devtool = 'source-map';
	} else {
		// SourceMap is added as DataUrl to the eval
		config.devtool = 'eval-source-map';
	}

	/**
	 * Automatically applied loaders
	 * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
	 */
	config.module = {
		rules: [{
				/**
				 * JS LOADER
				 * Transpile .js files using babel-loader
				 * Compiles ES6 and ES7 into ES5 code
				 * Reference: https://github.com/babel/babel-loader
				 */
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				/**
				 * SASS/CSS LOADER
				 * Allow loading SASS/CSS through JS
				 * Postprocess CSS with PostCSS plugin
				 * Reference: https://github.com/webpack/css-loader
				 * Reference: https://github.com/postcss/postcss-loader
				 * Reference: https://www.npmjs.com/package/sass-loader
				 */
				test: /\.(css|scss)$/,
				loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: [
						{ loader: 'css-loader' },
						{ loader: 'postcss-loader' },
						{ loader: 'sass-loader' }
					],
				})
			},
			{
				/**
				 * HTML LOADER
				 * Copy listed files to output
				 * Rename files using the asset hash
				 * Reference: https://github.com/webpack-contrib/file-loader
				 */
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
				loader: 'file-loader'
			},
			{
				/**
				 * HTML LOADER
				 * Allow loading html through js
				 * Reference: https://github.com/webpack-contrib/raw-loader
				 */
				test: /\.html$/,
				loader: 'raw-loader'
			}
		]
	};

	/**
	 * Plugins
	 * Reference: http://webpack.github.io/docs/configuration.html#plugins
	 */
	config.plugins = [
		new webpack.LoaderOptionsPlugin({
			test: /\.scss$/i,
			options: {
				postcss: {
					plugins: [autoprefixer]
				}
			}
		}),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: "jquery",
			jquery: "jquery",
			Tether: 'tether',
			tether: 'tether'
		}),
	];

	// Skip rendering index.html in test mode
	if (!isTest) {
		/**
		 * Render index.html
		 * Reference: https://github.com/ampedandwired/html-webpack-plugin
		 */
		config.plugins.push(
			new HtmlWebpackPlugin({
				template: './src/index.html',
				inject: 'body'
			}),

			/**
			 * Extract css files
			 * Disabled when in test mode or not in build mode
			 * Reference: https://github.com/webpack-contrib/extract-text-webpack-plugin
			 */
			new ExtractTextPlugin({ filename: 'css/[name].css', disable: !isProd, allChunks: true })
		)
	}

	/**
	 * Build specific plugins
	 */
	if (isProd) {
		config.plugins.push(
			// Only emit files when there are no errors
			// Reference: http://webpack.github.io/docs/list-of-plugins.html#noemitonerrorsplugin
			new webpack.NoEmitOnErrorsPlugin(),

			// Minify all JavaScript, switch loaders into minimizing mode
			// Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
			// TODO: UglifyJsPlugin raises the error "Unknown provider: $compileProvider", fix
			// new webpack.optimize.UglifyJsPlugin({sourceMap: false}),

			// Copy assets from the public folder
			// Reference: https://github.com/kevlened/copy-webpack-plugin
			new CopyWebpackPlugin([{
					from: __dirname + '/src/img',
					to: __dirname + '/dist/img'
				},
				{
					from: __dirname + '/src/scripts',
					to: __dirname + '/dist/scripts'
				},
				{
					from: __dirname + '/README.md',
					to: __dirname + '/dist/README.md'
				}
			])
		)
	}
	if (!isProd) {
		config.plugins.push(
			new CopyWebpackPlugin([{
				from: __dirname + '/README.md',
				to: __dirname + '/src/README.md'
			}], {
				debug: false
			})
		)
	}

	/**
	 * Dev server configuration
	 * Reference: http://webpack.github.io/docs/configuration.html#devserver
	 */
	config.devServer = {
		contentBase: './src',
		stats: 'minimal',
		inline: true,
		port: process.env.PORT || 3000
	};

	return config;
}();