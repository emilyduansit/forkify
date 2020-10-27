const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports ={
    entry: ['babel-polyfill','./src/js/index.js'],
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'       
    },    
    devServer:{
        contentBase: './dist'
    },
    devtool: 'eval-source-map',//fix browser issue webpack://forker/node_modules/sockjs-client/dist/sockjs.js.map   
    plugins:[
        new HtmlWebPackPlugin({
            filename:'index.html',
            template: './src/index.html'
        })
    ],
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    }

}