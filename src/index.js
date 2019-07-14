import commander from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers';

const getData = (config) => {
  const filepath = path.resolve(config);
  const format = path.extname(config);
  const data = fs.readFileSync(filepath, 'utf8');

  return parsers(data, format);
};

const genDiff = (firstConfig, secondConfig) => {
  const obj1 = getData(firstConfig);
  const obj2 = getData(secondConfig);
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const func = (item) => {
    if (obj1[item] === obj2[item]) {
      return `    ${item}: ${obj1[item]}`;
    }
    if (_.has(obj1, item) && !_.has(obj2, item)) {
      return `  - ${item}: ${obj1[item]}`;
    }
    if (!_.has(obj1, item) && _.has(obj2, item)) {
      return `  + ${item}: ${obj2[item]}`;
    }
    return `  + ${item}: ${obj2[item]}\n  - ${item}: ${obj1[item]}`;
  };

  const str = _.map(keys, func).join('\n');
  return `\n{\n${str}\n}\n`;
};

const program = () => {
  commander
    .version('1.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)));

  commander.parse(process.argv);
};

export default genDiff;
export { program };
