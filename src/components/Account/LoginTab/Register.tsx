import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import TextInputForm from '../../Form/TextInput';
import ButtonForm from '../../Form/Button';
import { useTranslation } from 'react-i18next';
import * as authService from '../../../service/apis/auth.service';
import { useImmer } from 'use-immer';
import * as helper from '../../../utils/helper';
import TopAlert from '../../Form/TopAlert';

interface RegisterTabProps {
  onRegisterSuccess?: () => void;
  onSetInputData?: (data: { username: string }) => void;
}

interface InputDataType {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface InputAlertType {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const initialInputData: InputDataType = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterTab: React.FC<RegisterTabProps> = ({
  onRegisterSuccess,
  onSetInputData,
}) => {
  const { t } = useTranslation();

  const [inputData, setInputData] = useState<InputDataType>(initialInputData);
  const [inputAlert, setInputAlert] = useImmer<InputAlertType>({});
  const [loading, setLoading] = useState(false);
  const [topAlert, setTopAlert] = useState<{
    visible: boolean;
    type?: 'info' | 'danger' | 'success' | 'warning' | 'dark';
    message?: string;
  }>({ visible: false });

  const setFieldAlert = useCallback(
    (field: keyof InputAlertType, message: string) => {
      setInputAlert(draft => {
        draft[field] = message;
      });
    },
    [setInputAlert],
  );

  const showTopAlert = useCallback(
    (
      type: 'info' | 'danger' | 'success' | 'warning' | 'dark',
      message: string,
    ) => {
      setTopAlert({ visible: true, type, message });
    },
    [],
  );

  useEffect(() => {
    if (topAlert.visible) {
      const timer = setTimeout(() => {
        setTopAlert({ visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [topAlert.visible]);

  const resetInputAlerts = useCallback(() => {
    setInputAlert({});
  }, [setInputAlert]);

  const handleInputChange = useCallback(
    (field: keyof InputDataType, value: string) => {
      setInputData(prev => ({ ...prev, [field]: value }));
      setFieldAlert(field, '');
    },
    [setFieldAlert],
  );

  const handleRegister = async (): Promise<void> => {
    resetInputAlerts();

    if (!helper.validateEmail(inputData.email)) {
      setFieldAlert('email', t('invalid_email_format'));
      return;
    }

    if (inputData.password !== inputData.confirmPassword) {
      const message = t('the_passwords_do_not_match');
      setFieldAlert('password', message);
      setFieldAlert('confirmPassword', message);
      return;
    }

    setLoading(true);
    try {
      const response = await authService.authRegister(inputData);
      if (response.status === 201) {
        showTopAlert('success', t('registration_successful'));

        setInputData(initialInputData);
        onSetInputData && onSetInputData({ username: inputData.email });

        setTimeout(() => {
          onRegisterSuccess && onRegisterSuccess();
        }, 2000);
      }
    } catch (error: any) {
      if (error?.response?.status === 409) {
        setFieldAlert('email', t('this_email_is_already_in_use'));
      } else {
        showTopAlert('danger', t('register_failed'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ flexDirection: 'column', width: '100%', padding: 20, gap: 15 }}
    >
      <TopAlert
        show={topAlert.visible}
        type={topAlert.type || 'info'}
        message={topAlert.message || ''}
      />
      <TextInputForm
        label={t('firstname')}
        type="text"
        alert={inputAlert.firstname}
        value={inputData.firstname}
        onChange={(val: string) => handleInputChange('firstname', val)}
        required
      />
      <TextInputForm
        label={t('lastname')}
        type="text"
        alert={inputAlert.lastname}
        value={inputData.lastname}
        onChange={(val: string) => handleInputChange('lastname', val)}
        required
      />
      <TextInputForm
        label={t('email')}
        type="text"
        alert={inputAlert.email}
        value={inputData.email}
        onChange={(val: string) => handleInputChange('email', val)}
        required
      />
      <TextInputForm
        label={t('password')}
        type="password"
        alert={inputAlert.password}
        value={inputData.password}
        onChange={(val: string) => handleInputChange('password', val)}
        required
      />
      <TextInputForm
        label={t('confirm_password')}
        type="password"
        alert={inputAlert.confirmPassword}
        value={inputData.confirmPassword}
        onChange={(val: string) => handleInputChange('confirmPassword', val)}
        required
      />

      <ButtonForm
        title={t('register')}
        width="100%"
        isLoading={loading}
        buttonStyle={{
          backgroundColor: '#ea0000',
          padding: 15,
          borderRadius: 50,
          marginTop: 10,
        }}
        textStyle={{
          fontSize: 17,
          fontFamily: 'Prompt-Regular',
          color: '#ffffff',
          textAlign: 'center',
        }}
        loadingColor="#ffffff"
        loadingSize={27}
        onPress={handleRegister}
        disabled={
          !inputData.firstname ||
          !inputData.lastname ||
          !inputData.email ||
          !inputData.password ||
          !inputData.confirmPassword
        }
      />
    </View>
  );
};

export default RegisterTab;
