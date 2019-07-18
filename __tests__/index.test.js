import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const inputFormats = ['json', 'yml', 'ini'];

const getFilepaths = formats => formats.map(item => [
  path.resolve(__dirname, `__fixtures__/before.${item}`),
  path.resolve(__dirname, `__fixtures__/after.${item}`),
]);

const getResult = (otputFormat) => {
  const resultPath = path.resolve(__dirname, `__fixtures__/diff-${otputFormat}.txt`);
  return fs.readFileSync(resultPath, 'utf8');
};

test.each(getFilepaths(inputFormats))(
  'gendiff',
  (beforePath, afterPath) => {
    expect(genDiff(beforePath, afterPath, 'tree')).toBe(getResult('tree'));
    expect(genDiff(beforePath, afterPath, 'plain')).toBe(getResult('plain'));
    expect(genDiff(beforePath, afterPath, 'json')).toBe(getResult('json'));
  },
);
