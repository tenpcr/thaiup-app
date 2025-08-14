import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import { AccountStack } from './AccountStack';
import { RootStackParamList } from '../type/navigation';
import { ArticleStack } from './ArticleStack';
import { JobsStack } from './JobsStack';
import PrivacyPolicy from '../screens/account/PrivacyPolicy';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Account"
        component={AccountStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Article"
        component={ArticleStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Jobs"
        component={JobsStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
