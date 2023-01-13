import React from 'react';
import { render } from '@testing-library/react';
import DataExplorerPageLeftPaneView from './DataExplorerPageLeftPaneView';

test('DataExplorerPageLeftPaneView should render correctly', () => {
  const { container } = render(<DataExplorerPageLeftPaneView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
