const inter = (diff) => {
  const func = ({
    type, key, value1 = null, value2 = null,
  }) => {
    const lines = {
      compare: { type, key, value: Array.isArray(value1) ? inter(value1) : value1 },
      equal: { type, key, value: value2 },
      delete: { type, key, value: value1 },
      add: { type, key, value: value2 },
      replace: {
        type, key, removedValue: value1, currentValue: value2,
      },
    };

    return lines[type];
  };

  return diff.map(func);
};

export default diff => JSON.stringify(inter(diff), '', 2);
