import React from 'react';
import { render } from '@testing-library/react';
import MeasureSelectorView from './MeasureSelectorView';

test('MeasureSelectorView should render correctly', () => {
  const { container } = render(<MeasureSelectorView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
