import jsonStrategy from '../strategies/jsonStrategy';
import apiStrategy from '../strategies/apiStrategy';

export const connectors = {
  json: jsonStrategy,
  api: apiStrategy
};