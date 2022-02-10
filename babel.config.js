// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   env: {
//     devlopment: {
//       plugins: ['transform-remove-console'], //removing consoles.log from app during release (production) versions
//     },
//   },
// };

module.exports = function (api) {
  // api.cache(true);

  const babelEnv = api.env();
  const plugins = [];

  if (babelEnv === 'production') {
    plugins.push(['transform-remove-console', {exclude: ['error']}]);
  }
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};
