const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ];
    }

    return config;
};
const cssLoader = (pattern) => {
    return [MiniCssExtractPlugin.loader, 'css-loader', pattern];
}
const plugins = () => {
    const htmlPlugins = (pageNames) => {
        return pageNames.map(name => new HTMLWebpackPlugin({
            filename: `${name}.html`,
            template: `./${name}.html`,
            chunks: [name]
        }));
    }
    return [
        ...htmlPlugins(entryNames),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ];
}
console.log("ISDEV ", isDev);
const entryNames = ['index'];
const entryObject = (entryNames) => {
    return entryNames.reduce((acc, name) => {
        acc[name] = `./${name}.ts`; // или .js, если вы используете JavaScript
        return acc;
    }, {});
}
module.exports = {
    target: 'web',
    mode: isDev ? 'development' : 'production',
    context: path.resolve(__dirname, 'src'),
    entry: entryObject(entryNames),
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: [
            { directory: path.join(__dirname, 'static_images'), publicPath: '/upload_images' },
        ],
        watchFiles: ['src/**/*', 'static_images'],
        hot: isDev,
        port: 4200
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: isDev ? 'source-map' : false,
    optimization: optimization(),
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader(null)
            },
            {
                test: /\.(ttf|woff|woff2|eot|png|jpg|svg|gif)$/,
                type: "asset/resource"
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader', // Используем ts-loader вместо babel-loader для .ts файлов
                        options: {
                            // Укажите путь к вашему tsconfig.json, если он находится не в корне проекта
                            configFile: path.resolve(__dirname, './tsconfig.json')
                        }
                    }
                ]
            }
        ]
    }

};
