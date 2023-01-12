import React from 'react';
import { render } from '@testing-library/react';
import HeaderView from './HeaderView';

test('HeaderView should render correctly', () => {
  const { container } = render(<HeaderView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
