/**
 * @format
 */
import { Share } from 'react-native';

import { it, describe, expect } from '@jest/globals';

import mockData from '../mockData';
import sharePDF from '../index';

jest.mock('react-native', () => ({
  Platform: { select: jest.fn((platforms) => platforms.ios) },
  Share: { share: jest.fn() },
  NativeModules: { RNShareFile: { share: jest.fn() } },
}));

describe('RNShareFile-iOS', () => {
  it('should share the link - iOS with RN API', async () => {
    await sharePDF(mockData.document, mockData.filename);

    expect(Share.share).toHaveBeenCalledTimes(1);
  });
});
