import React from 'react';
import { render } from '@testing-library/react';
import DataExplorerPageView from './DataExplorerPageView';

test('DataExplorerPageView should render correctly', () => {
  const { container } = render(<DataExplorerPageView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
