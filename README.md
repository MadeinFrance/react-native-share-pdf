# react-native-share-pdf

[![npm version](https://badge.fury.io/js/react-native-share-pdf.svg)](https://badge.fury.io/js/react-native-share-pdf)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/cba8fd0874ac4f569f4f880e473cbac9?branch=master)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=MadeinFrance/react-native-share-base64-pdf&utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/MadeinFrance/react-native-share-pdf/branch/master/graph/badge.svg?token=zRjKYpheMI)](https://codecov.io/gh/MadeinFrance/react-native-share-pdf)
[![CircleCI](https://circleci.com/gh/MadeinFrance/react-native-share-pdf/tree/master.svg?style=shield)](https://circleci.com/gh/MadeinFrance/react-native-share-base64-pdf/)

Android Library for saving and sharing a base64 encoded PDF.

## Motivation

---

Sharing a base64 PDF works on iOS with the React Native API but it's not working for Android. The `ShareFile` JAVA module shows that's possible by saving the document on local storage of the device and sharing it.

## Demo

| Android                                                                                            | iOS                                                                                        |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| ![Android](https://github.com/MadeinFrance/react-native-share-pdf/raw/master/demo/res/android.gif) | ![iOS](https://github.com/MadeinFrance/react-native-share-pdf/raw/master/demo/res/ios.gif) |

## Install

```shell
npm i react-native-share-pdf
```

## Usage

```js
import sharePDF from 'react-native-share-pdf';

async function loadAndSharePDF() {
  const showError = await sharePDF(mockData.document, mockData.filename);
  if (showError !== undefined) {
    console.log(showError);
    // Do something with the error
  }
}
```

## Methods

- RNShareFile.share(base64Data, documentFileName);

### Manual Installation

React Native > 0.60 will autolink. For earlier versions:

1. Open up `android/app/src/main/java/[...]/MainApplication.java`

- Add `import com.maximegerbe.reactnative.sharefile.ShareFilePackage;` to the imports at the top of the file
- Add `new ShareFilePackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':react-native-share-pdf'
   project(':react-native-share-pdf').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-share-pdf/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
   implementation project(':react-native-share-pdf')
   ```

## License

[MIT](https://opensource.org/licenses/MIT)

## Author

- [Maxime Gerbe](https://github.com/MadeinFrance)

### Other information

- Please, feel free to ⭐️ the project. This gives the confidence that you like it and a great job was done by publishing and supporting it 🤩
