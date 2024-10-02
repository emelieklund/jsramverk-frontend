module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
    plugins: ['@babel/plugin-transform-react-jsx'],
};

module.exports = {
    presets: [
        '@babel/preset-env',
        ['@babel/preset-react', {runtime: 'automatic'}],
    ],
};
