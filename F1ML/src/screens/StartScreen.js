import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import StartButtons from '../components/StartButtons';
import Firebase from '../api/Firebase';
import firebase from 'firebase';
require('firebase/auth');

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
export default class StartScreen extends React.Component{
	
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.checkifLoggedIn();
	}

	checkifLoggedIn = () =>{
		//const {email, password} = this.state;
		Firebase.auth().onAuthStateChanged(function(user){
			if(user)
			{
				this.props.navigation.navigate('Main');
			} 
			else{
				alert('Not signed in');
			}
		}.bind(this)
	);
	}
	
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
