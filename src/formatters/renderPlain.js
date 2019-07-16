const convert = (item, type) => {
  if (typeof item === 'string') {
    return `'${item}'`;
  }
  if (item instanceof Object && type !== 'compare') {
    return '[complex value]';
  }

  return item;
};

const buildPath = (dir, base) => [dir, base].filter(i => i !== '').join('.');

const inter = (diff, path) => {
  const func = ([type, key, value1, value2 = null]) => {
    const value = convert(value1, type);
    const replacedValue = convert(value2, type);

    switch (type) {
      case 'compare':
        return inter(value, buildPath(path, key));
      case 'equals':
        return '';
      case 'delete':
        return `Property '${buildPath(path, key)}' was removed`;
      case 'add':
        return `Property '${buildPath(path, key)}' was added with value: ${value}`;
      case 'replace':
        return `Property '${buildPath(path, key)}' was updated. From ${value} to ${replacedValue}`;
      default:
        return false;
    }
  };

  return diff.map(func).filter(item => item !== '').join('\n');
};

export default diff => inter(diff, '');
