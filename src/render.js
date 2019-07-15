const convert = (item, operator, gap) => {
  if (item instanceof Object && operator !== 'compare') {
    const entries = Object.entries(item);
    const func = ([key, value]) => `{\n${gap}      ${key}: ${value}\n${gap}  }`;
    return entries.map(func);
  }

  return item;
};

const inter = (diff, gapCount) => {
  const func = ([operator, key, value1, value2 = null]) => {
    const gap = '  '.repeat(gapCount);
    const value = convert(value1, operator, gap);
    const replacedValue = convert(value2, operator, gap);

    switch (operator) {
      case 'compare':
        return `${gap}  ${key}: {\n${inter(value, gapCount + 2)}\n${gap}  }`;
      case 'equals':
        return `${gap}  ${key}: ${value}`;
      case 'delete':
        return `${gap}- ${key}: ${value}`;
      case 'add':
        return `${gap}+ ${key}: ${value}`;
      case 'replace':
        return `${gap}+ ${key}: ${replacedValue}\n${gap}- ${key}: ${value}`;
      default:
        return false;
    }
  };

  return diff.map(func).join('\n');
};

export default diff => `{\n${inter(diff, 1)}\n}`;
