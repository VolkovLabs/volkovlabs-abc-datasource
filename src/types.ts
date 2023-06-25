import { DataSourceJsonData } from '@grafana/data';
import { DataQuery } from '@grafana/schema';

/**
 * Query
 */
export interface Query extends DataQuery {
  /**
   * Query Text
   *
   * @type {string}
   */
  queryText?: string;
}

/**
 * Datasource Options
 */
export interface DataSourceOptions extends DataSourceJsonData {
  /**
   * Path
   *
   * @type {string}
   */
  path?: string;
}

/**
 * Secure JSON Data
 */
export interface SecureJsonData {
  /**
   * API Key
   *
   * @type {string}
   */
  apiKey?: string;
}
