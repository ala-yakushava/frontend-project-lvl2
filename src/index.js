import commander from 'commander';
import fs from 'fs';
import path from 'path';
import parse from './parse';
import buildAst from './buildAst';
import render from './render';

const getData = (config) => {
  const filepath = path.resolve(config);
  const format = path.extname(config);
  const data = fs.readFileSync(filepath, 'utf8');

  return parse(data, format);
};

const genDiff = (firstConfig, secondConfig) => {
  const data1 = getData(firstConfig);
  const data2 = getData(secondConfig);
  const diff = buildAst(data1, data2);

  return render(diff);
};

const program = () => {
  commander
    .version('1.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const result = `\n${genDiff(firstConfig, secondConfig)}\n`;
      console.log(result);
    });

  commander.parse(process.argv);
};

export default genDiff;
export { program };
