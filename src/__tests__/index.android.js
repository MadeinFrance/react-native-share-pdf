/* @flow */
import {
  Platform,
  Share,
} from 'react-native';

import mockData from '../mockData';
import RNShareFile from '../index';

jest.mock('Platform', () => ({
  select: jest.fn(platforms => platforms.android),
}));

jest.mock('Share', () => ({
  share: jest.fn(),
}));

describe('RNShareFile-Android', () => {
  it('should share the link - Android', async () => {
    (Platform.select: any).mockImplementationOnce(content => content.android);

    await RNShareFile.sharePDF(mockData.document, mockData.filename);

    expect(Share.share).toHaveBeenCalledTimes(0);
  });

  it('handles incorrect base64 data - Android', async () => {
    (Platform.select: any).mockImplementationOnce(content => content.android);

    await RNShareFile.sharePDF('mockData.document', mockData.filename);
  });
});
