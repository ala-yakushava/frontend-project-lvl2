import fs from 'fs';
import path from 'path';
import has from 'lodash/has';
import union from 'lodash/union';
import parse from './parsers';
import render from './formatters';

const getData = (config) => {
  const filepath = path.resolve(config);
  const type = path.extname(config).slice(1);
  const data = fs.readFileSync(filepath, 'utf8');

  return parse(data, type);
};

const buildAst = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2));

  const func = (key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 instanceof Object && value2 instanceof Object) {
      return { type: 'compared', key, currentValue: buildAst(value1, value2) };
    }
    if (has(data1, key) && !has(data2, key)) {
      return { type: 'removed', key, removedValue: value1 };
    }
    if (!has(data1, key) && has(data2, key)) {
      return { type: 'added', key, currentValue: value2 };
    }
    if (value1 === value2) {
      return {
        type: 'equal', key, currentValue: value1,
      };
    }
    return {
      type: 'replaced', key, removedValue: value1, currentValue: value2,
    };
  };

  return keys.map(func);
};

const genDiff = (firstConfig, secondConfig, format) => {
  const data1 = getData(firstConfig);
  const data2 = getData(secondConfig);
  const diff = buildAst(data1, data2);

  return render(diff, format);
};

export default genDiff;
