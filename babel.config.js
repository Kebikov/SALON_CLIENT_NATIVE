module.exports = function (api) {
    api.cache(true);

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'babel-plugin-root-import',
                {
                    rootPathSuffix: 'src/',
                    rootPathPrefix: '@/'
                }
            ],
            [
                'module:react-native-dotenv', 
                {
                    moduleName: '@env',
                    verbose: false,
                    allowUndefined: false
                }
            ],
            'react-native-reanimated/plugin'
        ]
    };
};
