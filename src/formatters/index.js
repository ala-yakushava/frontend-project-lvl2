import renderPretty from './renderPretty';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const formatters = {
  pretty: renderPretty,
  plain: renderPlain,
  json: renderJson,
};

export default (diff, format) => formatters[format](diff);
