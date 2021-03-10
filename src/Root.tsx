import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/Main';
import Todo from './screens/Todo';
import { Routes } from './types/navigation';
import { screenOptions } from './consts/navigation';

const Stack = createStackNavigator();

const Root: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen options={{ title: 'Задания' }} name={Routes.Main} component={Main} />
      <Stack.Screen options={{ title: 'Задание' }} name={Routes.Todo} component={Todo} />
    </Stack.Navigator>
  );
};

export default Root;
