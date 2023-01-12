import React from 'react';
import { render } from '@testing-library/react';
import FilterSelectorView from './FilterSelectorView';

test('App should render correctly', () => {
  const { container } = render(<FilterSelectorView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
