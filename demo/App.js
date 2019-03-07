/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';

import RNShareFile from 'react-native-share-pdf';
import mockData from './mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


async function loadAndSharePDF() {
  console.log(RNShareFile.sharePDF);
  const showError = await RNShareFile.sharePDF(mockData.document, mockData.filename);
  if (showError) {
    console.log(showError);
    // Do something with the error
  }
}
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Download PDF Base64</Text>
        <Button
          title="Share"
          testID="share-button"
          onPress={() => loadAndSharePDF()}
        />
      </View>
    );
  }
}
