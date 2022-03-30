const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const {override, addLessLoader} = require('customize-cra');

const overrideProcessEnv = () => (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.modules = [path.join(__dirname, '')].concat(config.resolve.modules);
    return config;
};

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
    }),
    overrideProcessEnv({
        VERSION: JSON.stringify(require('./package.json').version),
    })
);
