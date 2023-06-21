import { defaults } from 'lodash';
import React, { ChangeEvent, useCallback } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { DefaultQuery, TestIds } from '../../constants';
import { DataSource } from '../../datasource';
import { DataSourceOptions, Query } from '../../types';

/**
 * Editor Properties
 */
type Props = QueryEditorProps<DataSource, Query, DataSourceOptions>;

/**
 * Query Editor
 */
export const QueryEditor: React.FC<Props> = ({ onChange, query }) => {
  /**
   * Query Text change
   */
  const onQueryTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...query, queryText: event.target.value });
    },
    [onChange, query]
  );

  /**
   * Query with defaults
   */
  const finalQuery = defaults(query, DefaultQuery);

  /**
   * Render
   */
  return (
    <InlineFieldRow>
      <InlineField label="Query Text" labelWidth={14} grow>
        <Input
          type="text"
          value={finalQuery.queryText}
          onChange={onQueryTextChange}
          data-testid={TestIds.queryEditor.fieldQueryText}
        />
      </InlineField>
    </InlineFieldRow>
  );
};
