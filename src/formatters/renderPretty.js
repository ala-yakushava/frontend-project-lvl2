import flatten from 'lodash/flatten';

const tab = '  ';
const tabStep = 2;

const convert = (item, gap) => {
  if (!(item instanceof Object)) return item;

  const func = ([key, value]) => `{\n${gap}${tab.repeat(3)}${key}: ${value}\n${gap}${tab}}`;
  return Object.entries(item).map(func);
};

const inter = (diff, tabCount) => {
  const func = ({
    type, key, value1 = null, value2 = null,
  }) => {
    const gap = tab.repeat(tabCount);
    const removedValue = convert(value1, gap);
    const currentValue = convert(value2, gap);

    const lines = {
      compare: () => `${gap}${tab}${key}: {\n${inter(value1, tabCount + tabStep)}\n${gap}${tab}}`,
      equal: () => `${gap}${tab}${key}: ${currentValue}`,
      delete: () => `${gap}- ${key}: ${removedValue}`,
      add: () => `${gap}+ ${key}: ${currentValue}`,
      replace: () => [lines.add(), lines.delete()],
    };

    return lines[type]();
  };

  return flatten(diff.map(func)).join('\n');
};

export default diff => `{\n${inter(diff, 1)}\n}`;
