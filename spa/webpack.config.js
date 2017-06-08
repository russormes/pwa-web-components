const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

	entry:{
		app:'./src/app.ts'
	},

	output:{
		path: path.resolve(__dirname, 'build'),
		filename: 'js/[name].js'
	},

	resolve:{
		extensions:['.ts','.css','.html', '.js'],
		modules: ['node_modules', 'src']
	},

	devServer:{
		contentBase: path.resolve(__dirname, 'public'),
		host:'0.0.0.0',
		port:9000,
		inline:false
	},
	module:{
		loaders:[
			 {
				test: /\.ts?$/,
				loader: 'ts-loader'
			},
			{
				test: /(\.css|\.html)$/,
				use: 'raw-loader'
			}
		]
	},
	externals: {},
	plugins:[
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/app.html'),
			hash: false,
			filename: 'app.html',
			inject: 'body',
			chunks:['app']
		}),
		new CopyWebpackPlugin([
			{from: 'public/assets', to: 'assets' },
			{from: 'public/css', to: 'css' },
			{from: 'public/fonts', to: 'fonts' },
			{from: 'public/js', to: 'js' },
			{from: 'public/images', to: 'images' },
			{from: 'public/manifest.json', to: '.' },
			{from: 'public/dw-sw.js', to: '.' }
		])
	],
	devtool: "source-map"
};
