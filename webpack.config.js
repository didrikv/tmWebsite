const env = process.env.NODE_ENV
const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')


var config = {
	context: __dirname,
	entry: {
		attraktivitet: './attraktivitet/index.js',
		kultur: './kultur/index.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			links: [
				"https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css",
				"https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css",
				"https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
			],
			template: require('html-webpack-template'),
			filename: 'attraktivitet/index.html',
			chunks: ['attraktivitet', 'commons'],
			appMountId: 'root',
			alwaysWriteToDisk: true,
			inject: false,
		}),
		new HtmlWebpackPlugin({
			links: [
				"https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css",
				"https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css",
				"https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
			],
			template: require('html-webpack-template'),
			filename: 'kultur/index.html',
			chunks: ['kultur', 'commons'],
			appMountId: 'root',
			alwaysWriteToDisk: true,
			inject: false,
		}),
		new HtmlWebpackHarddiskPlugin()
	],
	output: {
		filename: '[name]/[hash].bundle.js',
		path: __dirname + '/public',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015', 'stage-0']
				}
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader:'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]',
						}
					}
				],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader'
			}
		]
	}
}

var production = {
	plugins: [
		new NpmInstallPlugin(),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV' : JSON.stringify('production')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			filename: "[hash].commons.js",
			minChunks: 2
		}),
		new CompressionPlugin(),
		new CleanWebpackPlugin(['public'])
	]
}

var develompent = {
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		overlay: true
	}
}

if(env == 'production') {
	module.exports = merge(config, production)
} else { 
	module.exports = merge(config, develompent)
}


		
