const Config = require('./build/index')
const Utils = require('./build/utils')
const _ENV = process.env.VUE_APP_ENV
console.log(process.env.VUE_APP_ENV, 'process.env.VUE_APP_ENV')

module.exports = {
	baseUrl: Config[_ENV]['baseUrl'],
	outputDir: Config[_ENV]['outputDir'],
	pages: {
		app: {
			// page 的入口
			entry: Utils.resolve('../src/main.js'),
			// 模板来源
			template: Utils.resolve('../src/index.html'),
			// 在 dist/index.html 的输出
			filename: 'index.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: '',
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ['chunk-vendors', 'chunk-common', 'app']
		}
	},
  lintOnSave: Config[_ENV]['isEsLint'], // 是否开启Eslint
  // lintOnSave: false,
	productionSourceMap: Config[_ENV]['isSorceMap'], // 是否开启sourceMap
	devServer: {
		host: '0.0.0.0',
		allowedHosts: ['localhost.17dianjia.net'],
		port: Config['development'].port,
		// open: 'Google Chrome',
		compress: true,
		historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
		overlay: {
			warnings: true,
			errors: true // 为true的时候 将不能报错
    },
    // dev环境跨域代理
    proxy: {
      '/api': {
        target: 'http://192.168.1.101:8080',
        // target: 'http://5g.meixuanlife.com/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // proxyTable: {
    //   '/api': {
    //     // target: 'http://5g.meixuanlife.com',
    //     target:'http://5g.meixuanlife.com',
    //     // target:'http://192.168.1.89:8888',
    //     changeOrigin: true,  //是否跨域
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
	},
	css: {
		loaderOptions: {
			// 给 sass-loader 传递选项
			sass: {
				// @/ 是 src/ 的别名
				// 所以这里假设你有 `src/variables.scss` 这个文件
				data: `@import "@css/variables.scss";`
			}
		}
	},
	// webpack-merge 合并到最终的配置中
	configureWebpack: {
		resolve: {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				vue$: 'vue/dist/vue.esm.js',
				'@': Utils.resolve('src'),
				'@css': Utils.resolve('../src/css'),
				'@api': Utils.resolve('../src/api'),
				'@assets': Utils.resolve('../src/assets'),
				'@components': Utils.resolve('../src/components'),
				'@store': Utils.resolve('../src/store'),
				'@router': Utils.resolve('../src/router'),
				'@utils': Utils.resolve('../src/utils'),
				'@contants': Utils.resolve('../src/contants')
			}
		},
		plugins: []
  },
  // 更改网站favicon.ico
  pwa: {
    iconPaths: {
      favicon32     : 'favicon.ico',
      favicon16     : 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon      : 'favicon.ico',
      msTileImage   : 'favicon.ico'
    }
  }
}
