import React from 'react';
import { render } from '@testing-library/react';
import SortBySelectorView from './SortBySelectorView';

test('App should render correctly', () => {
  const { container } = render(<SortBySelectorView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
