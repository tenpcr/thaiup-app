import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ArticleStackParamList } from '../type/navigation';
import ArticleAll from '../screens/article/ArticleAll';
import ArticleView from '../screens/article/ArticleView';

const Stack = createNativeStackNavigator<ArticleStackParamList>();

export const ArticleStack: React.FC = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};
