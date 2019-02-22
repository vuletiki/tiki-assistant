const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		content: "./src/content.js"
	},
	mode: "development",
	output: {
		path: path.resolve(__dirname, "statics"),
		filename: "[name].js"
	},
	plugins: [
	    new MiniCssExtractPlugin({
	      filename: "[name].css"
	    })
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env","@babel/preset-react"]
					}
				}
			},
			{
		        test: /\.scss$/,
		        use: [
		          MiniCssExtractPlugin.loader,
		          'css-loader',
		          'sass-loader',
		        ]
	      	}
		]
	}
};
