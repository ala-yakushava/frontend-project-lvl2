import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const resultPath = path.resolve(__dirname, '__fixtures__/diff.txt');
const result = fs.readFileSync(resultPath, 'utf8');
const beforePathJson = path.resolve(__dirname, '__fixtures__/before.json');
const afterPathJson = path.resolve(__dirname, '__fixtures__/after.json');
const beforePathYml = path.resolve(__dirname, '__fixtures__/before.yml');
const afterPathYml = path.resolve(__dirname, '__fixtures__/after.yml');
const beforePathIni = path.resolve(__dirname, '__fixtures__/before.ini');
const afterPathIni = path.resolve(__dirname, '__fixtures__/after.ini');

const filepaths = [
  [beforePathJson, afterPathJson],
  [beforePathYml, afterPathYml],
  [beforePathIni, afterPathIni],
];

test.each(filepaths)(
  'gendiff',
  (beforePath, afterPath) => {
    expect(genDiff(beforePath, afterPath)).toBe(result);
  },
);
