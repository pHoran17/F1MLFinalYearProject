import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";

export default class StartButtons extends React.Component {

	render()
	{
		return(
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => this.props.navigation.navigate('Login')}
				>
				<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => this.props.navigation.navigate('Register')}
				>
				<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
			</View>
		);
	}

}
const styles = StyleSheet.create({
	container:{
		flex: 15,
		alignItems: 'center',
		marginTop:150
	},
	button:{
		marginTop:40,
		height: 60,
		width:200,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ed1005',
		padding: 20,
		color: '#ffffff'
	},
	buttonText:{
		fontSize:20,
		color: '#ffffff'
	}
});
