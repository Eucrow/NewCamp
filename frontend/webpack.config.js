const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const getFilesFromDir = require("./src/config/files");
const PAGE_DIR = path.join("src", "pages", path.sep);const jsFiles = getFilesFromDir(PAGE_DIR, [".js"]);

// const entry = jsFiles.reduce( (obj, filePath) => {
//    const entryChunkName = filePath.replace(path.extname(filePath), "").replace(PAGE_DIR, "");
//    obj[entryChunkName] = `./${filePath}`;
//    return obj;
// }, {});


module.exports = {
    // entry: {entry},
    entry: {
      'index' : './src/pages/index.js',
      'surveys' : './src/pages/surveys.js',
      'species' : './src/pages/species.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
  plugins:[
    new HtmlWebPackPlugin({
      chunks: ["index"],
      template: "src/pages/index.html",
      filename: "index.html"
    }),
    new HtmlWebPackPlugin({
      chunks: ["surveys"],
      template: "src/pages/surveys.html",
      filename: "surveys.html"
  }),
    new HtmlWebPackPlugin({
      chunks: ["species"],
      template: "src/pages/species.html",
      filename: "species.html"
  })
  ]};
