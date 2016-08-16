'use strict';

var types = [
  'object',
  'number',
  'string',
  'symbol',
  'boolean',
  'function', // Weird to expose this
  'undefined',
];

function normalize(type, value) {
  var args = Array.prototype.slice.call(arguments, 2);

  var isType = conforms(type, value);
  var isFunction = typeof value === 'function';

  if (!isType && !isFunction) {
    return null;
  }

  if (isType) {
    return value;
  }

  var result = value.apply(null, args);

  if (conforms(type, result)) {
    return result;
  }

  return null;
}

function conforms(type, value) {
  if (typeof type === 'string') {
    return typeof value === type;
  }
  if (typeof type === 'function') {
    return !!type(value);
  }
  return type.some(function(type) {
    return conforms(type, value);
  });
}

// Add methods for each type
types.forEach(function(type) {
  normalize[type] = normalize.bind(null, type);
});

function dateOrTimestamp(value) {
  if (value instanceof Date || value instanceof Number) {
    value = value.valueOf();
  }
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value);
}

normalize.date = normalize.bind(null, dateOrTimestamp);

module.exports = normalize;
