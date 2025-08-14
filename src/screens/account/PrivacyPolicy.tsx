import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import PrivacyPolicyTH from './../../components/PrivacyPolicy/th';

function PrivacyPolicy() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (

      <View
        style={{
          backgroundColor: '#FFFFFF',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
        }}
      >
        <View
          style={{
            height: 55,
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'row',

            flex: 0,
          }}
        >
          <View style={{ flex: 0 }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                width: 45,
              }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="angle-left" size={32} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={{ flexShrink: 1, flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 22, fontFamily: 'Prompt-SemiBold' }}>
              {t('privacy_policy')}
            </Text>
          </View>
        </View>

        <ScrollView style={{ flexGrow: 1 }}>
          <PrivacyPolicyTH />
        </ScrollView>
      </View>

  );
}

export default PrivacyPolicy;
