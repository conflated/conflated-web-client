import React from 'react';
import { render } from '@testing-library/react';
import DimensionSelectorView from './DimensionSelectorView';

test('DimensionSelectorView should render correctly', () => {
  const { container } = render(<DimensionSelectorView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
