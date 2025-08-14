import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useImmer } from 'use-immer';
import { useDispatch } from 'react-redux';
import { getAuthUserProfile } from '../../../../redux/actions/authActions';

import TextInputForm from '../../../../components/Form/TextInput';
import ButtonForm from '../../../../components/Form/Button';
import { AccountStackParamList } from '../../../../type/navigation';
import * as authService from '../../../../service/apis/auth.service';
import TopAlert from '../../../../components/Form/TopAlert';

type ProfileFirstameEditRouteProp = RouteProp<
  AccountStackParamList,
  'ProfileFirstnameEdit'
>;
interface InputState {
  firstname: string;
}

const initialInput: InputState = {
  firstname: '',
};

export default function ProfileFirstnameEdit() {
  const navigation = useNavigation();
  const route = useRoute<ProfileFirstameEditRouteProp>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const originalFirstname = route.params?.firstname ?? '';
  const [inputData, setInputData] = useImmer<InputState>(initialInput);
  const [topAlert, setTopAlert] = useState<{
    visible: boolean;
    type?: 'info' | 'danger' | 'success' | 'warning' | 'dark';
    message?: string;
  }>({ visible: false });

  useEffect(() => {
    setInputData(draft => {
      draft.firstname = originalFirstname;
    });
  }, [originalFirstname]);

  const handleSave = async () => {
    try {
      setTopAlert({ visible: false, type: 'info', message: '' });

      const params = {
        firstname: inputData?.firstname,
      };
      const result = await authService.updateProfileFirstname(params);
      if (result?.status === 200) {
        showTopAlert('success', t('updated_successfully'));
        dispatch(getAuthUserProfile());
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      }
    } catch (error: any) {
      console.log(error);
      showTopAlert('danger', t('update_failed'));
    }
  };

  const isUnchanged = originalFirstname === inputData.firstname;

  const showTopAlert = useCallback(
    (
      type: 'info' | 'danger' | 'success' | 'warning' | 'dark',
      message: string,
    ) => {
      setTopAlert({ visible: true, type, message });
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="angle-left" size={32} color="#666" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {t('firstname')}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TopAlert
            show={topAlert.visible}
            type={topAlert.type || 'info'}
            message={topAlert.message || ''}
          />
          <View style={styles.inputSection}>
            <TextInputForm
              label={t('firstname')}
              type="text"
              value={inputData.firstname}
              onChange={(value: string) =>
                setInputData(draft => {
                  draft.firstname = value;
                })
              }
              autoFocus
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <ButtonForm
          title={t('Save')}
          width="100%"
          isLoading={false}
          buttonStyle={styles.saveButton}
          textStyle={styles.saveButtonText}
          loadingColor="#ffffff"
          loadingSize={27}
          onPress={handleSave}
          disabled={isUnchanged}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    height: 55,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 45,
  },
  titleContainer: {
    justifyContent: 'center',
    padding: 10,
    flexShrink: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Prompt-SemiBold',
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  inputSection: {
    paddingVertical: 10,
  },
  footer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButton: {
    backgroundColor: '#ea0000',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 17,
    fontFamily: 'Prompt-Regular',
    color: '#ffffff',
    textAlign: 'center',
  },
});
