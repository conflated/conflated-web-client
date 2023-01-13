import React from 'react';
import { render } from '@testing-library/react';
import LayoutSelectorView from './LayoutSelectorView';

test('LayoutSelectorView should render correctly', () => {
  const { container } = render(<LayoutSelectorView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
