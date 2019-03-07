/* @flow */
import {
  Platform,
  NativeModules,
  Share,
} from 'react-native';

const { RNShareFile } = NativeModules;

export default {
  sharePDF: async (base64Data: string, documentFileName: string): Promise<Error | void> => {
    try {
      await Platform.select({
        ios: async () => {
          await Share.share({ url: `data:application/pdf;base64,${base64Data}` });
        },
        android: async () => {
          await RNShareFile.share(base64Data, documentFileName);
        },
      })();
      return undefined;
    } catch (err) {
      return err;
    }
  },
};
