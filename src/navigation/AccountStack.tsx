import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountProfile from '../screens/account/profile/Profile';
import ProfileFirstnameEdit from '../screens/account/profile/edit/Firstname';
import ProfileLastnameEdit from '../screens/account/profile/edit/Lastname';
import { AccountStackParamList } from '../type/navigation';
import Login from '../screens/account/Login';

const Stack = createNativeStackNavigator<AccountStackParamList>();

export const AccountStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountProfile"
        component={AccountProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfileFirstnameEdit"
        component={ProfileFirstnameEdit}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfileLastnameEdit"
        component={ProfileLastnameEdit}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
