import has from 'lodash/has';
import union from 'lodash/union';

const buildAst = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2));

  const func = (key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 instanceof Object && value2 instanceof Object) {
      return ['compare', key, buildAst(value1, value2)];
    }
    if (has(data1, key) && !has(data2, key)) {
      return ['delete', key, value1];
    }
    if (!has(data1, key) && has(data2, key)) {
      return ['add', key, value2];
    }
    if (value1 === value2) {
      return ['equal', key, value1];
    }
    return ['replace', key, value1, value2];
  };

  return keys.map(func);
};

export default buildAst;
