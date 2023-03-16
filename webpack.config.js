const path = require("path");
//引入HtmlWebpackPlugin包
const HtmlWebpackPlugin = require("html-webpack-plugin");
//引入MiniCssExtractPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const config = {
  //mode是打包模式：development|production|none
  mode: "development",

  //单入口
  // entry: './src/a.js',
  //多入口
  entry: {
    manageLogin: "./src/manage/js/login.js",
    manageMenu: "./src/manage/js/menu.js",
    manageMain: "./src/manage/js/main.js",
    manageMine: "./src/manage/js/mine.js",
    manageAddNews: "./src/manage/js/addnews.js",
    manageNews: "./src/manage/js/manageNews.js",

    usersLogin: "./src/users/js/login.js",
    usersReg: "./src/users/js/reg.js",
    usersIndex: "./src/users/js/index.js",
  },

  //输出
  output: {
    //可以设置生成的文件夹（不建议修改）
    //因为路径的配置需要物理路径
    //__dirname当前文件所在的物理路径，__filename代表当前文件的物理url
    path: path.resolve(__dirname, "dist"),
    //如果是多入口，文件名中一定要包含变量，[id]、[name]、[hash]、[chunkhash]
    filename: "js/[id]_bundle[name].js",
    clean: true, //表示每次编译前，先清空输入文件夹
  },

  //插件
  plugins: [
    //和css-loader 负责将读取到的scc样式重新组合生成外部样式表，自动在生成的html文件中引入
    new MiniCssExtractPlugin({
      //生成的文件名及路径
      filename: "css/[id]_bundle_[name].css",
    }),

    new HtmlWebpackPlugin({
      //设置生成的html主文件的模板地址。
      //在模板文件中插入对新生成的js文件的引用。
      template: "./src/manage/login.html",
      //生成的文件名，默认是index.html
      filename: "manage/login.html",
      chunks: ["manageLogin"], //表示当前文件要使用的入口名称。
    }),
    // new HtmlWebpackPlugin({
    //   //设置生成的html主文件的模板地址。
    //   //在模板文件中插入对新生成的js文件的引用。
    //   template: "./src/manage/index.html",
    //   //生成的文件名，默认是index.html
    //   filename: "manage/index.html",
    //   chunks: ["manageIndex"], //表示当前文件要使用的入口名称。
    // }),
    new HtmlWebpackPlugin({
      //设置生成的html主文件的模板地址。
      //在模板文件中插入对新生成的js文件的引用。
      template: "./src/manage/index.html",
      //生成的文件名，默认是index.html
      filename: "manage/index.html",
      chunks: [], //表示当前文件要使用的入口名称。
    }),
    new HtmlWebpackPlugin({
      //设置生成的html主文件的模板地址。
      //在模板文件中插入对新生成的js文件的引用。
      template: "./src/manage/menu.html",
      //生成的文件名，默认是index.html
      filename: "manage/menu.html",
      chunks: ["manageMenu"], //表示当前文件要使用的入口名称。
    }),
    new HtmlWebpackPlugin({
      //设置生成的html主文件的模板地址。
      //在模板文件中插入对新生成的js文件的引用。
      template: "./src/manage/main.html",
      //生成的文件名，默认是index.html
      filename: "manage/main.html",
      chunks: ["manageMain"], //表示当前文件要使用的入口名称。
    }),
    new HtmlWebpackPlugin({
      template: "./src/manage/mine.html",
      filename: "manage/mine.html",
      chunks: ["manageMine"], //表示当前文件要使用的入口名称。
    }),
    new HtmlWebpackPlugin({
      template: "./src/users/login.html",
      filename: "users/login.html",
      chunks: ["usersLogin"], //表示当前文件要使用的入口名称。
    }),
    new HtmlWebpackPlugin({
      template: "./src/users/reg.html",
      filename: "users/reg.html",
      chunks: ["usersReg"], //表示当前文件要使用的入口名称。
    }),
    new HtmlWebpackPlugin({
      template: "./src/users/index.html",
      filename: "users/index.html",
      chunks: ["usersIndex"], //表示当前文件要使用的入口名称。
    }),
    new HtmlWebpackPlugin({
      template: "./src/manage/addnews.html",
      filename: "manage/addnews.html",
      chunks: ["manageAddNews"], //表示当前文件要使用的入口名称。
    }),
    new HtmlWebpackPlugin({
      template: "./src/manage/manageNews.html",
      filename: "manage/manageNews.html",
      chunks: ["manageNews"], //表示当前文件要使用的入口名称。
    }),
  ],

  //模块规则
  module: {
    rules: [
      {
        test: /\.(css|sass|less|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2, //从这里加载的来自于import的css文件向前再使用一级loader处理
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env", //使用这个预设，会根据浏览器来选择插件转化ES5
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[contenthash][ext]",
        },
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
    ],
  },

  //优化
  optimization: {
    minimizer: [new CssMinimizerPlugin(), "..."],
  },

  devServer: {
    //端口号
    port: 80,
    //开启热更新
    hot: "only",
    //打开服务器时自动开启浏览器访问
    open: true,
    //监控变化的文件的，被监控的文件只要发生变化，就会重新编译，自动刷新浏览器。
    watchFiles: ["./src/manage/index.html", "./src/manage/login.html", "./src/manage/menu.html", "./src/manage/main.html", "./src/manage/mine.html", "./src/users/login.html", "./src/users/reg.html", "./src/users/index.html", "./src/manage/addnews.html", "./src/manage/manageNews.html"],
    static: {
      //设置express服务器的根目录。
      directory: path.join(__dirname, "dist"),
    },
    proxy: {
      //请求地址中包含/api的就会被拦截，例如：'/api/getXXX'
      "/api": {
        // 真实的请求会被转发到 'http://172.16.5.30/api/getXXX'
        target: "http://127.0.0.1:3000",
        //如果真实服务器地址是''http://172.16.5.30/abc/getXXX'
        pathRewrite: { "^/api": "" },
        //发送请求头中host会设置成target
        changeOrigin: true,
      },
    },
  },
};

module.exports = config;
