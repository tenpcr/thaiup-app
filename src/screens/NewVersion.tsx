import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import * as Helper from '../utils/helper';

type NewVersionPromptProps = {
  version?: string;
  downloadUrl?: string;
};

const NewVersionPrompt: React.FC<NewVersionPromptProps> = ({
  version,
  downloadUrl,
}) => {
  const handleDownload = () => {
    if (downloadUrl) {
      Helper.openLink(downloadUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/icon.png')}
        style={styles.image}
      />

      <Text style={styles.title}>พบเวอร์ชั่นใหม่</Text>

      {version && (
        <Text style={styles.versionText}>{version}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleDownload}
        accessibilityLabel="Download new version"
      >
        <Text style={styles.buttonText}>อัปเดตตอนนี้</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewVersionPrompt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Prompt-SemiBold',
    fontSize: 30,
    marginBottom: 8,
    textAlign: 'center',
  },
  versionText: {
    fontFamily: 'Prompt-Regular',
    fontSize: 23,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e1e1e1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    fontFamily: 'Prompt-Regular',
    color: '#666666',
    fontSize: 18,
  },
});
