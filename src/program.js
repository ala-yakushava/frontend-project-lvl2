import commander from 'commander';
import genDiff from '.';

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

export default program;
