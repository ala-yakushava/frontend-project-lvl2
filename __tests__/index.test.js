import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFilepaths = () => {
  const beforePathJson = path.resolve(__dirname, '__fixtures__/before.json');
  const afterPathJson = path.resolve(__dirname, '__fixtures__/after.json');
  const beforePathYml = path.resolve(__dirname, '__fixtures__/before.yml');
  const afterPathYml = path.resolve(__dirname, '__fixtures__/after.yml');
  const beforePathIni = path.resolve(__dirname, '__fixtures__/before.ini');
  const afterPathIni = path.resolve(__dirname, '__fixtures__/after.ini');

  return [
    [beforePathJson, afterPathJson],
    [beforePathYml, afterPathYml],
    [beforePathIni, afterPathIni],
  ];
};

test.each(getFilepaths())(
  'gendiff tree',
  (beforePath, afterPath) => {
    const resultPath = path.resolve(__dirname, '__fixtures__/diff-tree.txt');
    const result = fs.readFileSync(resultPath, 'utf8');
    expect(genDiff(beforePath, afterPath, 'tree')).toBe(result);
  },
);

test.each(getFilepaths())(
  'gendiff plain',
  (beforePath, afterPath) => {
    const resultPath = path.resolve(__dirname, '__fixtures__/diff-plain.txt');
    const result = fs.readFileSync(resultPath, 'utf8');
    expect(genDiff(beforePath, afterPath, 'plain')).toBe(result);
  },
);
