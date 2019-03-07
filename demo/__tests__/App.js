/**
 * @format
 */

import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

const rejectedPromise = () => new Promise((resolve, reject) => {
  return reject();
});

jest.mock('react-native', () => ({
  __esModule: true,
  // $FlowFixMe
  StyleSheet: require.requireActual('react-native').StyleSheet,
  // $FlowFixMe
  View: require.requireActual('react-native').View,
  // $FlowFixMe
  Text: require.requireActual('react-native').Text,
  // $FlowFixMe
  Button: require.requireActual('react-native').Button,
  Platform: { select: jest.fn() },
  NativeModules: {
    RNShareFile: {
      share: jest.fn(() => new Promise((resolve, reject) => {
        return resolve(true);
      })),
    },
  },
  Share: {
    share: jest.fn(() => new Promise((resolve, reject) => {
      return resolve(true);
    })),
  },
}));

function setupMocksAndRequireModules(platform: string) {
  const {
    Platform,
    Share,
  } = require('react-native');
  (Platform.select: any).mockImplementationOnce((content) => content[platform]);

  const { RNShareFile } = require('react-native').NativeModules;
  const App = require('../App').default;

  return {
    App, RNShareFile, Share,
  };
}

describe('<App />', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('should share the link - iOS with RN API', async () => {
    const {
      App, RNShareFile,
    } = setupMocksAndRequireModules('ios');
    RNShareFile.share.mockImplementationOnce(rejectedPromise);
    const tree = renderer.create(
      <App/>
    );
    const shareButton = tree.root.findByProps({
      testID: 'share-button'
    });

    await shareButton.props.onPress();

    expect(RNShareFile.share).toHaveBeenCalledTimes(0);
    expect(tree).toMatchSnapshot();
  });

  it('should share the link - Android', async () => {
    const {
      App, RNShareFile,
    } = setupMocksAndRequireModules('android');

    const tree = renderer.create(
      <App/>
    );
    const shareButton = tree.root.findByProps({
      testID: 'share-button'
    });

    await shareButton.props.onPress();

    expect(RNShareFile.share).toHaveBeenCalledTimes(1);
    expect(tree).toMatchSnapshot();
  });

  it('reject and handle incorrect base64 data - ios', async () => {
    const {
      App, RNShareFile, Share,
    } = setupMocksAndRequireModules('ios');
    Share.share.mockImplementationOnce(() => {
      throw new Error('RNShareFile some error');
    });
    const tree = renderer.create(
      <App/>
    );
    const shareButton = tree.root.findByProps({
      testID: 'share-button'
    });

    await shareButton.props.onPress();

    expect(RNShareFile.share).toHaveBeenCalledTimes(0);
    expect(tree).toMatchSnapshot();
  });

  it('handles incorrect base64 data - Android', async () => {
    const {
      App, RNShareFile,
    } = setupMocksAndRequireModules('android');
    RNShareFile.share.mockImplementationOnce(() => {
      throw new Error('RNShareFile some error');
    });
    const tree = renderer.create(
      <App/>
    );
    const shareButton = tree.root.findByProps({
      testID: 'share-button'
    });

    await shareButton.props.onPress();

    expect(tree).toMatchSnapshot();
  });
});