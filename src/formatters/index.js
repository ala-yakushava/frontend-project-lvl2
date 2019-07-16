import renderDefault from './renderDefault';
import renderPlain from './renderPlain';

const formatters = {
  tree: renderDefault,
  plain: renderPlain,
};

export default (diff, format) => formatters[format](diff);
