import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//import {createAppContainer} from 'react-navigation';
//import {createStackNavigator} from 'react-navigation-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import * as firebase from 'firebase';
//import {firebaseConfig} from 'config';
import Firebase from './src/api/Firebase';

import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
//import MainScreen from './src/screens/MainScreen';
import ScreenMain from './src/screens/ScreenMain';
import PredictScreen from './src/screens/PredictScreen';
import ResultsScreen from './src/screens/ResultsScreen';

import NavButtons from './src/components/NavButtons';

//firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <NavigationContainer initialRouteName="Start">
		<Stack.Navigator>
			<Stack.Screen name="Start" component={StartScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
			<Stack.Screen name="Main" component={ScreenMain} />
			<Stack.Screen name="Predict" component={PredictScreen} />
			<Stack.Screen name="Results" component={ResultsScreen} />
		</Stack.Navigator>
	</NavigationContainer>
  );
}

const Stack = createStackNavigator();

export default App;
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

/*const navigator = createStackNavigator({
		Start: StartScreen,
		Login: LoginScreen,
		Register: RegisterScreen,
		Main: ScreenMain,
		Predict: PredictScreen
	
},	{
		initialRouteName: 'Start',
		defaultNavigationOptions: {
			title: 'F1ML'
	}
});
*/
//export default createAppContainer(navigator);
