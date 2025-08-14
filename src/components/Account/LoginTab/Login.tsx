import { Text, TouchableOpacity, View } from 'react-native';
import TextInputForm from '../../Form/TextInput';
import ButtonForm from '../../Form/Button';
import { useTranslation } from 'react-i18next';
import * as authService from '../../../service/apis/auth.service';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated } from '../../../redux/actions/authActions';
import { setUserProfile } from '../../../redux/actions/userActions';
import * as Helper from '../../../utils/helper';
import * as tokenUtils from '../../../utils/token.utils';
import TopAlert from '../../Form/TopAlert';

interface LoginDataState {
  username: string;
  password: string;
}

function LoginTab() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [inputData, setInputData] = useState<LoginDataState>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [topAlert, setTopAlert] = useState<any>({});
  const userProfile = useSelector((state: any) => state.userProfile.result);

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!inputData?.username || !inputData?.password) {
        return;
      }

      const formData = {
        username: inputData?.username?.toLowerCase(),
        password: inputData?.password,
      };

      const response = await authService.authLogin(formData);
      const data = response.data?.data || {};

      if (response.status === 200) {
        showTopAlert(true, 'success', t('login_success'));
        dispatch(setUserProfile(data || {}));
        dispatch(setAuthenticated(true));

        if (data?.accessToken) {
          tokenUtils.setToken('access-token', data?.accessToken);
        }
        if (data?.refreshToken) {
          tokenUtils.setToken('refresh-token', data?.refreshToken);
        }

        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 404)
      ) {
        showTopAlert(true, 'danger', t('email_password_invalid_retry'));
      }
    } finally {
      setLoading(false);
    }
  };

  const showTopAlert = (visible: boolean, type: string, message: string) => {
    setTopAlert({
      type: type,
      message: message,
      visible: visible,
    });
    setTimeout(() => {
      setTopAlert({});
    }, 3000);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        width: '100%',
        padding: 20,
        gap: 15,
      }}
    >
      <TopAlert
        show={topAlert?.visible}
        type={topAlert?.type}
        message={topAlert?.message}
      />

      <TextInputForm
        label={t('email')}
        type="text"
        value={inputData?.username}
        onChange={(event: any) => {
          setInputData(prevInputData => {
            return { ...prevInputData, username: event };
          });
        }}
        required
      />

      <TextInputForm
        label={t('password')}
        type="password"
        value={inputData?.password}
        onChange={(event: any) => {
          setInputData(prevInputData => {
            return { ...prevInputData, password: event };
          });
        }}
        required
      />

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity style={{ padding: 5, alignSelf: 'flex-start' }}>
          <Text
            style={{
              textAlign: 'right',
              textDecorationLine: 'underline',
              fontFamily: 'Prompt-Regular',
              fontSize: 15,
            }}
          >
            {t('forgot_password')}
          </Text>
        </TouchableOpacity>
      </View>

      <ButtonForm
        title={t('login')}
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
        loadingColor='#ffffff'
        loadingSize={27}
        onPress={handleLogin}
        disabled={!inputData?.username || !inputData?.password}
      />
    </View>
  );
}

export default LoginTab;
