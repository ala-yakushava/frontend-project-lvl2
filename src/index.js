import commander from 'commander';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters';
import buildAst from './buildAst';

const getData = (configPath) => {
  const filepath = path.resolve(configPath);
  const ext = path.extname(configPath);
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
    .option('-f, --format <type>', 'output format [tree]', 'tree')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const result = `\n${genDiff(firstConfig, secondConfig, commander.format)}\n`;
      console.log(result);
    });

  commander.parse(process.argv);
};

export default genDiff;
export { program };
