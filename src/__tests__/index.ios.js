/**
 * @format
 */
import { Platform, Share } from 'react-native';

import mockData from '../mockData';
import RNShareFile from '../index';

jest.mock('Platform', () => ({
  select: jest.fn(platforms => platforms.ios),
}));

jest.mock('Share', () => ({
  share: jest.fn(),
}));

describe('RNShareFile-iOS', () => {
  it('should share the link - iOS with RN API', async () => {
    (Platform.select: any).mockImplementationOnce(content => content.ios);

    await RNShareFile.sharePDF(mockData.document, mockData.filename);

    expect(Share.share).toHaveBeenCalledTimes(1);
  });
});
