import renderTree from './renderTree';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const formatters = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default (diff, format) => formatters[format](diff);
