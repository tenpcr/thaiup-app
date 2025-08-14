import React, { useEffect, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import IconFoundation from '@react-native-vector-icons/foundation';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import TabHome from '../screens/Tab/Home';
import TabJobs from '../screens/Tab/Jobs';
import TabAccount from '../screens/Tab/Account';

import * as Helper from '../utils/helper';
import { language as setLanguage } from '../redux/actions/appActions';

const Tab = createBottomTabNavigator();

const DEFAULT_LANGUAGE = 'th';

const screenOptions = {
  tabBarActiveTintColor: '#e61e25',
  tabBarInactiveTintColor: '#555',
  tabBarItemStyle: {
    paddingVertical: 3,
    paddingHorizontal: 0,
  },
  tabBarStyle: {
    height: 60,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: 'Prompt-Regular',
  },
};

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const initializeLanguage = useCallback(async () => {
    const storedLang = await Helper.getAsyncStorage('lang');
    const selectedLang = storedLang || DEFAULT_LANGUAGE;

    i18n.changeLanguage(selectedLang);
    dispatch(setLanguage(selectedLang));
  }, [dispatch, i18n]);

  useEffect(() => {
    initializeLanguage();
  }, [initializeLanguage]);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="TabHome"
        component={TabHome}
        options={{
          headerShown: false,
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size }) => (
            <IconFoundation name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TabJobs"
        component={TabJobs}
        options={{
          headerShown: false,
          tabBarLabel: t('jobs'),
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="briefcase-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TabAccount"
        component={TabAccount}
        options={{
          headerShown: false,
          tabBarLabel: t('account'),
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
