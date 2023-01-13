import React from 'react';
import { render } from '@testing-library/react';
import ChartTypeSelectorView from './ChartTypeSelectorView';

test('ChartTypeSelectorView should render correctly', () => {
  const { container } = render(<ChartTypeSelectorView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
