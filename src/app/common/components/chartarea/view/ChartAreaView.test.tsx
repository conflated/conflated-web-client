import React from 'react';
import { render } from '@testing-library/react';
import ChartAreaView from './ChartAreaView';

test('ChartAreaView should render correctly', () => {
  const { container } = render(<ChartAreaView pageStateNamespace="dataExplorerPage" />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
