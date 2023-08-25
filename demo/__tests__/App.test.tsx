/**
 * @format
 */

import React from 'react';
import App from '../App';

import sharePDF from 'react-native-share-pdf';
import {fireEvent, render} from '@testing-library/react-native';

jest.mock('react-native-share-pdf', () => jest.fn());

describe('<App />', () => {
  it('renders correctly', () => {
    const {toJSON} = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should share the link', async () => {
    const {getByTestId, toJSON} = render(<App />);
    const shareButton = getByTestId('share-button');

    await fireEvent.press(shareButton);

    expect(sharePDF).toHaveBeenCalledTimes(1);
    expect(toJSON()).toMatchSnapshot();
  });
});
