import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('gendiff', () => {
  const filepath1 = path.resolve(__dirname, '__fixtures__/before.json');
  const filepath2 = path.resolve(__dirname, '__fixtures__/after.json');
  const filepath3 = path.resolve(__dirname, '__fixtures__/before.yml');
  const filepath4 = path.resolve(__dirname, '__fixtures__/after.yml');
  const filepath = path.resolve(__dirname, '__fixtures__/diff.txt');
  const result = fs.readFileSync(filepath, 'utf8');

  expect(genDiff(filepath1, filepath2)).toBe(result);
  expect(genDiff(filepath3, filepath4)).toBe(result);
  expect(genDiff(filepath1, filepath4)).toBe(result);
});
