const inter = (diff) => {
  const func = ([type, key, value1, value2 = null]) => {
    const lines = {
      default: { type, key, value: Array.isArray(value1) ? inter(value1) : value1 },
      replace: {
        type, key, removedValue: value1, currentValue: value2,
      },
    };

    return lines[type === 'replace' ? type : 'default'];
  };

  return diff.map(func);
};

export default diff => JSON.stringify(inter(diff), '', 2);
