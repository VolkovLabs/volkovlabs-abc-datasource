import React from 'react';
import { DataSourceSettings } from '@grafana/data';
import { fireEvent, render, screen } from '@testing-library/react';
import { TestIds } from '../../constants';
import { DataSourceOptions } from '../../types';
import { ConfigEditor } from './ConfigEditor';

/**
 * Override Options
 */
interface OverrideOptions {
  [key: string]: unknown;
  jsonData?: object;
  secureJsonData?: object | null;
}

/**
 * Configuration Options
 */
const getOptions = ({
  jsonData = {},
  secureJsonData = {},
  ...overrideOptions
}: OverrideOptions = {}): DataSourceSettings<DataSourceOptions, any> => ({
  id: 1,
  orgId: 2,
  name: '',
  typeLogoUrl: '',
  type: '',
  uid: '',
  typeName: '',
  access: '',
  url: '',
  user: '',
  database: '',
  basicAuth: false,
  basicAuthUser: '',
  isDefault: false,
  secureJsonFields: {},
  readOnly: false,
  withCredentials: false,
  ...overrideOptions,
  jsonData: {
    path: '',
    ...jsonData,
  },
  secureJsonData: {
    apiKey: '',
    ...secureJsonData,
  },
});

/**
 * Config Editor
 */
describe('ConfigEditor', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockReset();
  });

  /**
   * Path
   */
  describe('Path', () => {
    it('Should apply path value and change options if field was changed', () => {
      const options = getOptions({ jsonData: { path: '/abc' } });

      render(<ConfigEditor options={options} onOptionsChange={onChange} />);

      /**
       * Check component
       */
      expect(screen.getByTestId(TestIds.configEditor.fieldPath)).toHaveValue(options.jsonData.path);

      /**
       * Trigger change
       */
      const newValue = '/123';
      fireEvent.change(screen.getByTestId(TestIds.configEditor.fieldPath), { target: { value: newValue } });

      expect(onChange).toHaveBeenCalledWith({
        ...options,
        jsonData: {
          ...options.jsonData,
          path: newValue,
        },
      });
    });
  });

  /**
   * API Key
   */
  describe('APIKey', () => {
    it('Should apply APIKey value and change options if field was changed', () => {
      const options = getOptions({
        secureJsonFields: { apiKey: false },
        secureJsonData: { apiKey: '123' },
      });

      render(<ConfigEditor options={options} onOptionsChange={onChange} />);

      /**
       * Check component
       */
      expect(screen.getByTestId(TestIds.configEditor.fieldApiKey)).toHaveValue(options.secureJsonData.apiKey);

      /**
       * Trigger change
       */
      const newValue = 'newKey';
      fireEvent.change(screen.getByTestId(TestIds.configEditor.fieldApiKey), { target: { value: newValue } });

      expect(onChange).toHaveBeenCalledWith({
        ...options,
        secureJsonData: {
          ...options.secureJsonData,
          apiKey: newValue,
        },
      });
    });

    it('Should be Ok with not secureJsonData', () => {
      const options = getOptions();
      delete options.secureJsonData;

      render(<ConfigEditor options={options} onOptionsChange={onChange} />);

      /**
       * Check component
       */
      expect(screen.getByTestId(TestIds.configEditor.fieldApiKey)).toHaveValue('');
    });

    it('Should reset APIKey', () => {
      const options = getOptions({
        secureJsonFields: { apiKey: true },
        secureJsonData: {},
      });

      render(<ConfigEditor options={options} onOptionsChange={onChange} />);

      /**
       * Check component
       */
      const resetButton = screen.getByRole('button');

      expect(resetButton).toBeInTheDocument();

      /**
       * Click reset button
       */
      fireEvent.click(resetButton);

      expect(onChange).toHaveBeenCalledWith({
        ...options,
        secureJsonFields: {
          ...options.secureJsonFields,
          apiKey: false,
        },
        secureJsonData: {
          ...options.secureJsonData,
          apiKey: '',
        },
      });
    });
  });
});
