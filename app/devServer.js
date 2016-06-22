import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';

const PORT = process.env.DEV_PORT || process.env.PORT || 7500;
const app = express();

const webpackConfig = webpack({
  devtool: 'source-map',
  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr`,
    path.join(__dirname, 'app.js'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: `http://localhost:${PORT}/static/`,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname,
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
      ],
      exclude: /node_modules/,
    }],
  },
});

app.use(webpackDevMiddleware(webpackConfig, {
  publicPath: '/static/',
  noInfo: true,
  compress: true,
  historyApiFallback: true,
  stats: {
    colors: true,
  },
}));
app.use(webpackHotMiddleware(webpackConfig));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Dashboard Dev Server running on port: ${PORT}`);
  }
});

export default app;
