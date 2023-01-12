import React from 'react';
import { render } from '@testing-library/react';
import DataExplorerPageRightPaneView from './DataExplorerPageRightPaneView';

test('DataExplorerPageRightPaneView should render correctly', () => {
  const { container } = render(<DataExplorerPageRightPaneView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
