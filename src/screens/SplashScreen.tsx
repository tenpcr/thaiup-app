import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View></View>
      <Image
        source={require('./../../assets/images/icon.png')}
        style={styles.logo}
      />
      <ActivityIndicator
        color="#ea0000"
        size={40}
        style={{ marginBottom: 50 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
