import React from 'react';
import { render } from '@testing-library/react';
import AppView from './AppView';

test('App should render correctly', () => {
  const { container } = render(<AppView />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
