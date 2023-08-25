/**
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import sharePDF from 'react-native-share-pdf';
import mockData from './mockData';

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  const loadAndSharePDF = async () => {
    const showError = await sharePDF(mockData.document, mockData.filename);

    if (showError !== undefined) {
      console.log(showError);
      // Do something with the error
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: Colors.black,
          }}>
          <View style={styles.container}>
            <Text style={styles.welcome}>Download PDF Base64</Text>
            <Button
              title="Share"
              testID="share-button"
              onPress={async () => {
                loadAndSharePDF();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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

export default App;
