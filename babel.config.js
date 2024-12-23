module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};



// const path = require('path');
// module.exports = {
//   process(src, filename) {
//     return `module.exports = ${JSON.stringify(path.basename(filename))};`;
//   },
// };