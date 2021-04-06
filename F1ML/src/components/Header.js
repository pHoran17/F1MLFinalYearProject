//Author: Patrick Horan 2021
//Code for Header component. 
//This component is used on every screen and its functionality is modified depending on the screen that it is being utilised on
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Firebase from '../api/Firebase';
//import firebase from 'firebase';
require('firebase/auth');

//Add back button for pages other than start and main
export default class Header extends React.Component {
	constructor(props)
	{
		super(props);
		this.state={
			loggedIn:false,
			previousPage: "",
			backImage:require('../icons/back.png'),
			logoutImage:require('../icons/logout.png')
		}
	}
	//Functionality for logOut button
	signOut = () => {
		Firebase.auth().signOut()
		this.props.navigation.navigate("Start")
	}
	//Function for Back button
	navToPrevPage = () =>{
		this.props.navigation.goBack()
	}
	//Check for status of user Login is executed in componentDidMount(). This will always be called after render()
	componentDidMount(){
		if(this.props.route.name == "Start" || this.props.route.name == "Main" )
		Firebase.auth().onAuthStateChanged((user) => {
			if(user){
				this.setState({loggedIn: true})
			}
			else{
				this.setState({loggedIn: false})
			}
		})
	}
	//Render code for header
	//Various conditions are put in place to display different functionality in the header component depending on the screen that is being used
	//Back and Logout buttons added if user is signed in and not on Main Screen
	//Back button can be added on Login + Register Screens
	//Logout button is rendered on main screen without back button
	render(){
		//Back and Logout buttons added if user is signed in and not on Main Screen
		if(this.props.route.name == "Results" || this.props.route.name == "Predict")
		{
			return(
				<View style={styles.header}>
					<TouchableOpacity 
							style={styles.backButton}
							onPress={this.navToPrevPage}
						>
							<Image style={styles.buttonImage} source={require('../icons/back.png')}/>
							<Text style={styles.backText}>Back</Text>
					</TouchableOpacity>
					<Text style={styles.fullHeaderText}>F1ML</Text>
					<TouchableOpacity 
							style={styles.logoutButton}
							onPress={this.signOut}
						>
							<Image style={styles.logoutImage} source={require('../icons/logout.png')}/>
							<Text style={styles.logoutText}>Logout</Text>
					</TouchableOpacity>
				</View>
			);
		}
		else if(this.state.loggedIn == true && this.props.route.name == "Main")
		{
			//Logout button is rendered on main screen without back button
			return(
				<View style={styles.header}>
					<Text style={styles.headerText}>F1ML</Text>
					<TouchableOpacity 
							style={styles.logoutButton}
							onPress={this.signOut}
						>
							<Image style={styles.logoutImage} source={require('../icons/logout.png')}/>
							<Text style={styles.logoutText}>Logout</Text>
					</TouchableOpacity>
				</View>
			);
		}
		else if(this.state.loggedIn == false && this.props.route.name == "Start")
		{
			//Basic header with no buttons is displayed if user is on Start screen
			return(
				<View style={styles.header}>
					<Text style={styles.headerText}>F1ML</Text>
				</View>
			);
		}
		
		else{
			//Back button can be added on Login + Register Screens
			return(
				<View style={styles.header}>
					<TouchableOpacity 
							style={styles.backButton}
							onPress={this.navToPrevPage}
						>
							<Image style={styles.buttonImage} source={require('../icons/back.png')}/>
							<Text style={styles.backText}>Back</Text>
					</TouchableOpacity>
					<Text style={styles.loginHeaderText}>F1ML</Text>
				</View>
			);
		}

	}
}
//Stylesheet for header component
//Contains styling for each variant of the header component depending on the conditions that are met in render()
const styles = StyleSheet.create({
	header:{
		flex: 2,
		flexDirection:'row',
		alignSelf:'stretch',
		paddingTop: 10,
		paddingBottom: 5,
		backgroundColor: '#ed1005',
		top:0,
		position:'relative'

	},
	headerText:{
		fontWeight: 'bold',
		fontSize: 17,
		textAlign: 'center',
		color: '#ffffff',
		marginLeft:175,
		marginTop:50,
		position:'relative'
	},
	loginHeaderText:{
		fontWeight: 'bold',
		fontSize: 17,
		textAlign: 'center',
		color: '#ffffff',
		marginLeft:120,
		marginTop:70,
		position:'relative'
	},
	backText:{
		color:'#ffffff',
		padding: 5
	},
	logoutText:{
		color:'#ffffff',
		padding: 5
	},
	mainHeaderText:{

		fontWeight: 'bold',
		fontSize: 17,
		textAlign: 'center',
		color: '#ffffff',
		marginLeft:175,
		position:'relative'
	},
	fullHeaderText:{

		fontWeight: 'bold',
		fontSize: 17,
		textAlign: 'center',
		color: '#ffffff',
		marginLeft:120,
		marginTop:60,
		position:'relative',
		paddingTop: 10
	},
	backButton:{
		padding: 5,
		marginRight: 0,
		marginTop: 50,
		position:'relative',
		left:0
	},
	logoutButton:{
		padding: 10,
		marginLeft: 90,
		marginTop: 50,
		position:'relative',
		right:0
	},
	buttonImage:{
		width:40,
		height:35,
		paddingBottom:10
	},
	logoutImage:{
		width:25,
		height:25
	}
});
//export default Header;