import React from 'react';
import { render } from '@testing-library/react';
import DataSourceSelectorView from './DataSourceSelectorView';

test('DataSourceSelectorView should render correctly', () => {
  const { container } = render(<DataSourceSelectorView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
