const convert = (item) => {
  if (typeof item === 'string') return `'${item}'`;
  if (item instanceof Object) return '[complex value]';
  return item;
};

const buildPath = (dir, base) => [dir, base].filter(i => i !== '').join('.');

const inter = (diff, path = '') => {
  const func = ({
    type, key, value1 = null, value2 = null,
  }) => {
    const fullPath = buildPath(path, key);
    const removedValue = convert(value1);
    const currentValue = convert(value2);

    const lines = {
      compare: () => inter(value1, fullPath),
      equal: () => '',
      delete: () => `Property '${fullPath}' was removed`,
      add: () => `Property '${fullPath}' was added with value: ${currentValue}`,
      replace: () => `Property '${fullPath}' was updated. From ${removedValue} to ${currentValue}`,
    };

    return lines[type]();
  };

  return diff.map(func).filter(item => item !== '').join('\n');
};

export default diff => inter(diff);
