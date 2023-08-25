/* @flow */
import { Share } from 'react-native';

import { it, describe, expect } from '@jest/globals';

import mockData from '../mockData';
import sharePDF from '../index';

jest.mock('react-native', () => ({
  Platform: { select: jest.fn((platforms) => platforms.android) },
  Share: { share: jest.fn() },
  NativeModules: { RNShareFile: { share: jest.fn() } },
}));

describe('RNShareFile-Android', () => {
  it('should share the link - Android', async () => {
    await sharePDF(mockData.document, mockData.filename);

    expect(Share.share).toHaveBeenCalledTimes(0);
  });

  it('handles incorrect base64 data - Android', async () => {
    await sharePDF('mockData.document', mockData.filename);
  });
});
