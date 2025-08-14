import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobsView from '../screens/jobs/JobView';
import JobsSearch from '../screens/jobs/JobSearch';
import { JobsStackParamList } from '../type/navigation';

const Stack = createNativeStackNavigator<JobsStackParamList>();

export const JobsStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JobView"
        component={JobsView}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="JobSearch"
        component={JobsSearch}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
