import React from 'react';
import { render } from '@testing-library/react';
import LayoutIconsView from './LayoutIconsView';

test('LayoutIconsView should render correctly', () => {
  const { container } = render(<LayoutIconsView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
