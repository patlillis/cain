﻿import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';


var plugins = [
	babel({
		exclude: 'node_modules/**',
		presets: 'es2015-rollup',
		sourceMaps: true
	}),
	nodeResolve({
		// use "jsnext:main" if possible
		// – see https://github.com/rollup/rollup/wiki/jsnext:main
		jsnext: true,  // Default: false

		// use "main" field or index.js, even if it's not an ES6 module
		// (needs to be converted from CommonJS to ES6
		// – see https://github.com/rollup/rollup-plugin-commonjs
		main: true,  // Default: true

		// some package.json files have a `browser` field which
		// specifies alternative files to load for people bundling
		// for the browser. If that's you, use this option, otherwise
		// pkg.browser will be ignored
		browser: true,  // Default: false

		// not all files you want to resolve are .js files
		extensions: [ '.js', '.json' ],  // Default: ['.js']

		// whether to prefer built-in modules (e.g. `fs`, `path`) or
		// local ones with the same names
		preferBuiltins: false  // Default: true

	}),
	commonjs({
		// non-CommonJS modules will be ignored, but you can also
		// specifically include/exclude files
		include: 'node_modules/**',  // Default: undefined

		// if true then uses of `global` won't be dealt with by this plugin
		ignoreGlobal: false,  // Default: false

		// if false then skip sourceMap generation for CommonJS modules
		sourceMap: true,  // Default: true

		// explicitly specify unresolvable named exports
		// (see below for more details)
		//namedExports: { './module.js': ['foo', 'bar' ] }  // Default: undefined 
	}),
	filesize()
]

if (process.env.BUILD === 'production') {
	plugins.push(uglify());
}

export default {
  // tell rollup our main entry point
  entry: 'src/main.js',
  dest: 'lib/main.js',
  plugins: plugins
}