import commander from 'commander';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters';
import buildAst from './buildAst';

const getData = (config) => {
  const filepath = path.resolve(config);
  const ext = path.extname(config);
  const data = fs.readFileSync(filepath, 'utf8');

  return parse(data, ext);
};

const genDiff = (firstConfig, secondConfig, format) => {
  const data1 = getData(firstConfig);
  const data2 = getData(secondConfig);
  const diff = buildAst(data1, data2);

  return render(diff, format);
};

const program = () => {
  commander
    .version('1.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format [pretty]', 'pretty')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const result = genDiff(firstConfig, secondConfig, commander.format);
      console.log(`\n${result}\n`);
    });

  commander.parse(process.argv);
};

export default genDiff;
export { program };
