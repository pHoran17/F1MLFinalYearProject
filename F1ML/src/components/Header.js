import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
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
			previousPage: ""
		}
	}
	signOut = () => {
		Firebase.auth().signOut()
		this.props.navigation.navigate("Start")
	}
	navToPrevPage = () =>{
		this.props.navigation.goBack()
	}
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
	render(){
		if(this.state.loggedIn == true && this.props.route.name != "Main")
		{
			return(
				<View style={styles.header}>
					<TouchableOpacity 
							style={styles.backButton}
							onPress={this.navToPrevPage}
						>
							<Text>Back</Text>
					</TouchableOpacity>
					<Text style={styles.headerText}>F1ML</Text>
					<TouchableOpacity 
							style={styles.logoutButton}
							onPress={this.signOut}
						>
							<Text>Logout</Text>
					</TouchableOpacity>
				</View>
			);
		}
		else if(this.state.loggedIn == true && this.props.route.name == "Main")
		{
			return(
				<View style={styles.header}>
					<Text style={styles.headerText}>F1ML</Text>
					<TouchableOpacity 
							style={styles.logoutButton}
							onPress={this.signOut}
						>
							<Text>Logout</Text>
					</TouchableOpacity>
				</View>
			);
		}
		else if(this.state.loggedIn == false && this.props.route.name == "Start")
		{
			//console.log(this.props);
			return(
				<View style={styles.header}>
					<Text style={styles.headerText}>F1ML</Text>
				</View>
			);
		}
		else{
			return(
				<View style={styles.header}>
					<TouchableOpacity 
							style={styles.backButton}
							onPress={this.navToPrevPage}
						>
							<Text>Back</Text>
					</TouchableOpacity>
					<Text style={styles.headerText}>F1ML</Text>
				</View>
			);
		}

	}
}

const styles = StyleSheet.create({
	header:{
		flex: 1,
		flexDirection:'row',
		alignSelf:'stretch',
		paddingTop: 15,
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
		marginLeft:170,
		position:'relative'
	},
	backButton:{
		padding: 10,
		marginRight: 0,
		position:'relative',
		left:0
	},
	logoutButton:{
		padding: 10,
		marginLeft: 90,
		position:'relative',
		right:0
	}
});
//export default Header;