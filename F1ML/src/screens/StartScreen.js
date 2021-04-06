//Author: Patrick Horan 2021
//Code for Start Screen
//Contains basic header and two buttons for navigating user to Login and Registration Screens
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import StartButtons from '../components/StartButtons';
import Firebase from '../api/Firebase';
import firebase from 'firebase';
require('firebase/auth');

//Old Implementation of STart screen, changed to class implementation during development
/*const StartScreen = ({navigation}) => {
	return (
		/*<View style = {styles.container}>
		<Header/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('Login')}
			>
				<Text>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('Register')}
			>
				<Text>Register</Text>
			</TouchableOpacity>
		</View>
		
		<>
		<Header/>
		<StartButtons/>
		</>
	);
};*/
//Stylesheet for start screen
const styles = StyleSheet.create({
	container:{
		flex: 10,
		alignItems: 'center'
	},
	button:{
		marginTop:25,
		height: 40,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ed1005',
		padding: 20,
		color: '#ffffff'
	}
});
//const { FireBase } = require('../api/Firebase');	
//Current implementation of start screen
export default class StartScreen extends React.Component{
	
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.checkifLoggedIn();
	}
	//Function for checking authentication status of user. Automatically navigates user to main screen if they are already authenticated
	checkifLoggedIn = () =>{
		//const {email, password} = this.state;
		Firebase.auth().onAuthStateChanged(function(user){
			if(user)
			{
				this.props.navigation.navigate('Main');
			} 
			else{
				console.log("Not Logged In")
			}
		}.bind(this)
	); //Bind command prevents crash
	}
	//Render code for start screen, contains two buttons for navigation
	render()
	{
		//console.log(this.props)
		return(
		<>
		<Header {...this.props}/>
		<View style = {styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => this.props.navigation.navigate('Login')}
			>
				<Text>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => this.props.navigation.navigate('Register')}
			>
				<Text>Register</Text>
			</TouchableOpacity>
		</View>
		</>
		)
	}
}
