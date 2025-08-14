import React, { useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { AppStack } from './navigation/AppStack';

// Screens
import HomeScreen from './screens/Home';
import PrivacyPolicy from './screens/account/PrivacyPolicy';
import Login from './screens/account/Login';
import SplashScreen from './screens/SplashScreen';
import Error500 from './screens/500';
import NewVersion from './screens/NewVersion';
import ProfileFirstnameEdit from './screens/account/profile/edit/Firstname';
import ProfileLastnameEdit from './screens/account/profile/edit/Lastname';

// Utils & Services
import * as Helper from './utils/helper';
import i18n from './i18n';
import * as serverService from './service/apis/server.service';
import * as authService from './service/apis/auth.service';
import { setUserProfile } from './redux/actions/userActions';
import { setAuthenticated, checkAuth } from './redux/actions/authActions';

// Env
import { VERSION, PLAY_STORE_URL, APP_STORE_URL } from '@env';
import wrapper from './redux/store';
import AccountProfile from './screens/account/profile/Profile';
import { RootStackParamList } from './type/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [showError500, setShowError500] = useState(false);
  const [showNewVersion, setShowNewVersion] = useState<{
    show: boolean;
    newVersion?: string;
  }>({ show: false });

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    const serverIsHealthy = await checkServerHealth();
    if (!serverIsHealthy) {
      setShowError500(true);
      return;
    }

    await configureLanguage();
    await verifyAppVersion();
    await dispatch(checkAuth());

    setShowSplashScreen(false);
  };

  const checkServerHealth = async (): Promise<boolean> => {
    try {
      const response = await serverService.getServerHealth();
      return response.status === 200;
    } catch {
      return false;
    }
  };

  const verifyAppVersion = async () => {
    try {
      const response = await serverService.getServerMobileAppVersion('android');
      const serverVersion = response?.data?.data;

      if (
        response.status === 200 &&
        serverVersion &&
        Helper.compareVersions(serverVersion.toString(), VERSION || '0.0.0') ===
          1
      ) {
        setShowNewVersion({ show: true, newVersion: serverVersion });
      }
    } catch (error) {
      console.error('App version check failed:', error);
    }
  };

  const configureLanguage = async () => {
    const lang = await Helper.getAsyncStorage('lang');
    i18n.changeLanguage(lang || 'th');
  };

  const getDownloadUrl = () => {
    if (Platform.OS === 'android') return PLAY_STORE_URL;
    if (Platform.OS === 'ios') return APP_STORE_URL;
    return '';
  };

  if (showSplashScreen) return <SplashScreen />;

  if (showNewVersion.show) {
    return (
      <NewVersion
        version={showNewVersion.newVersion}
        downloadUrl={getDownloadUrl()}
      />
    );
  }

  if (showError500) {
    return (
      <Error500
        onRetry={async () => {
          if (await checkServerHealth()) {
            setShowError500(false);
            setShowSplashScreen(false);
          }
        }}
      />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppStack />
          {/* <Stack.Navigator initialRouteName="Home">
           */}
          {/* <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AccountProfile"
              component={AccountProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AccountProfileFirstnameEdit"
              component={ProfileFirstnameEdit}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AccountProfileLastnameEdit"
              component={ProfileLastnameEdit}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ArticleAll"
              component={ArticleAll}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ArticleView"
              component={ArticleView}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicy}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator> */}
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default wrapper(App);
