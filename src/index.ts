/* @flow */
import { Platform, NativeModules, Share } from 'react-native';

const { RNShareFile } = NativeModules;

const sharePDF = async (
  base64Data: string,
  documentFileName: string,
): Promise<void> => {
  try {
    await Platform.select({
      ios: async () => {
        await Share.share({
          url: `data:application/pdf;base64,${base64Data}`,
        });
      },
      android: async () => {
        await RNShareFile.share(base64Data, documentFileName);
      },
    })?.();
  } catch (err) {
    throw new Error('unknown error');
  }
};

export default sharePDF;
