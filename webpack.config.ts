import * as webpack from 'webpack';
import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');

// TODO: find pros and cons for using @angular-builders/custom-webpack
export default (
	config: webpack.Configuration,
	options: CustomWebpackBrowserSchema,
	targetOptions: TargetOptions
) =>
{
	config.plugins?.push(new PurgeCSSPlugin({
		paths: glob.sync([
			'./src/**/*.html',
			'./src/app/**/*.ts',
			'./node_modules/bootstrap/js/src/dropdown.js'
		])
	}));

	return config;
}
