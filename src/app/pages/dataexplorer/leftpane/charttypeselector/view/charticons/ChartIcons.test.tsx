import React from 'react';
import { render } from '@testing-library/react';
import ChartIconsView from './ChartIconsView';

test('ChartIconsView should render correctly', () => {
  const { container } = render(<ChartIconsView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
