import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DefaultQuery, TestIds } from '../../constants';
import { Query } from '../../types';
import { QueryEditor } from './QueryEditor';

/**
 * Get Query with default values and ability to override
 *
 * @param overrideQuery
 */
export const getQuery = (overrideQuery = {}): Query => ({
  queryText: DefaultQuery.queryText,
  refId: 'A',
  ...overrideQuery,
});

/**
 * Query Editor
 */
describe('QueryEditor', () => {
  const onRunQuery = jest.fn();
  const onChange = jest.fn();

  beforeEach(() => {
    onRunQuery.mockReset();
    onChange.mockReset();
  });

  /**
   * Query Text
   */
  describe('QueryText', () => {
    it('Should apply queryText value and change', () => {
      const query = getQuery();

      render(<QueryEditor datasource={[] as any} query={query} onRunQuery={onRunQuery} onChange={onChange} />);

      /**
       * Check component
       */
      const testedComponent = screen.getByTestId(TestIds.queryEditor.fieldQueryText);

      expect(testedComponent).toHaveValue(DefaultQuery.queryText);

      /**
       * OnChange
       */
      const newValue = 'new';

      fireEvent.change(testedComponent, { target: { value: newValue } });

      expect(onChange).toHaveBeenCalledWith({
        ...query,
        queryText: newValue,
      });
    });
  });
});
