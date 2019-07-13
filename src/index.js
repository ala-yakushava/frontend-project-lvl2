import commander from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (firstConfig, secondConfig) => {
  const filepath1 = path.resolve(firstConfig);
  const filepath2 = path.resolve(secondConfig);
  const json1 = fs.readFileSync(filepath1, 'utf8');
  const json2 = fs.readFileSync(filepath2, 'utf8');
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const func = (item) => {
    if (obj1[item] === obj2[item]) {
      return `    ${item}: ${obj1[item]}\n`;
    }
    if (_.has(obj1, item) && !_.has(obj2, item)) {
      return `  - ${item}: ${obj1[item]}\n`;
    }
    if (!_.has(obj1, item) && _.has(obj2, item)) {
      return `  + ${item}: ${obj2[item]}\n`;
    }
    return `  + ${item}: ${obj2[item]}\n  - ${item}: ${obj1[item]}\n`;
  };

  const str = _.map(keys, func).join('');
  return `\n{\n${str}}\n`;
};

const program = () => {
  commander
    .version('1.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)));

  commander.parse(process.argv);
};

export default genDiff;
export { program };
