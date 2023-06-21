import React, { ChangeEvent, useCallback } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { FieldSet, InlineField, InlineFieldRow, Input, LegacyForms } from '@grafana/ui';
import { TestIds } from '../../constants';
import { DataSourceOptions, SecureJsonData } from '../../types';

/**
 * Editor Properties
 */
interface Props extends DataSourcePluginOptionsEditorProps<DataSourceOptions> {}

/**
 * Config Editor
 */
export const ConfigEditor: React.FC<Props> = ({ options, onOptionsChange }) => {
  /**
   * Path Change
   */
  const onPathChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onOptionsChange({
        ...options,
        jsonData: {
          ...options.jsonData,
          path: event.target.value,
        },
      });
    },
    [onOptionsChange, options]
  );

  /**
   * API Key Change
   * Secure fields only sent to the backend
   */
  const onAPIKeyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onOptionsChange({
        ...options,
        secureJsonData: {
          apiKey: event.target.value,
        },
      });
    },
    [onOptionsChange, options]
  );

  /**
   * API Key Reset
   */
  const onResetAPIKey = useCallback(() => {
    onOptionsChange({
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
  }, [onOptionsChange, options]);

  const { jsonData, secureJsonFields } = options;
  const secureJsonData = (options.secureJsonData || {}) as SecureJsonData;

  return (
    <FieldSet data-testid={TestIds.configEditor.root}>
      <InlineFieldRow>
        <InlineField label="Path" labelWidth={14}>
          <Input
            type="text"
            value={jsonData.path}
            width={40}
            onChange={onPathChange}
            data-testid={TestIds.configEditor.fieldPath}
          />
        </InlineField>
      </InlineFieldRow>

      <InlineFieldRow>
        <LegacyForms.SecretFormField
          isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}
          value={secureJsonData.apiKey || ''}
          label="API Key"
          labelWidth={7}
          inputWidth={20}
          onReset={onResetAPIKey}
          onChange={onAPIKeyChange}
          data-testid={TestIds.configEditor.fieldApiKey}
        />
      </InlineFieldRow>
    </FieldSet>
  );
};
