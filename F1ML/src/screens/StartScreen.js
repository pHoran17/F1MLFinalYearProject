import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import StartButtons from '../components/StartButtons';

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

export default class StartScreen extends Component{
	render()
	{
		return(
		<>
		<Header/>
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
