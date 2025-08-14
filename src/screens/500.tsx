import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

function ServerErrorScreen({ onRetry }: { onRetry?: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.errorContent}>
        <Text style={styles.errorCode}>500</Text>
        <Text style={styles.errorMessage}>No connection available.</Text>
      </View>

      <View style={styles.retryContainer}>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          accessibilityLabel="Retry connection"
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ServerErrorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContent: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 2, // ⚠️ บางเวอร์ชันของ React Native อาจยังไม่รองรับ `gap`
  },
  errorCode: {
    fontFamily: 'Prompt-SemiBold',
    color: '#e1e1e1',
    fontSize: 80,
  },
  errorMessage: {
    fontFamily: 'Prompt-Regular',
    color: '#e1e1e1',
    fontSize: 18,
  },
  retryContainer: {
    marginTop: 35,
  },
  retryButton: {
    backgroundColor: '#e1e1e1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  retryText: {
    fontFamily: 'Prompt-Regular',
    color: '#666666',
    fontSize: 18,
  },
});
