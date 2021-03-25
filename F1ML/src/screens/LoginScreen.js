import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import Header from '../components/Header';
//import firebase from 'firebase';
import Firebase from '../api/Firebase';
require('firebase/auth');

//Alter screen layout, make inputs etc. into component for cleaner layout
/*const LoginScreen = ({navigation}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onFootLinkPress = () => {
		navigation.navigate("Register")
	}

	const onLoginPress = () => {
		navigation.navigate('Main')
	}

	return(
		<>
		<Header/>
		<View style={styles.container}>
			<Text style={styles.descriptText}>E-mail</Text>
			<TextInput 
				style={styles.input}
				placeholder={'E-mail'}
				placeholderTextColor='#080807'
				onChangeText = {(text) => setEmail(text)}
				value = {email}
				underlineColorAndroid = "transparent"
				autoCapitalize = "none"
			/>
			<Text style={styles.descriptText}>Password</Text>
			<TextInput 
				style={styles.input}
				placeholder={'Password'}
				secureTextEntry = {true}
				placeholderTextColor='#080807'
				onChangeText = {(text) => setPassword(text)}
				value = {password}
				underlineColorAndroid = "transparent"
				autoCapitalize = "none"
			/>
			<TouchableOpacity 
				style={styles.button}
				onPress={onLoginPress}
			>
				<Text>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<View style={styles.footSection}>
					<Text style={styles.footText}>
						Don't have an account?
					</Text>
					<Text style={styles.footLink} 
						onPress={onFootLinkPress}>
							Register here!
					</Text>
				</View>
			</TouchableOpacity>
		</View>
		</>
	);
};*/
export default class LoginScreen extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			email: "",
			password: ""
		}
	}

	handleLogin = () => {
		const {email, password} = this.state

		Firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => this.props.navigation.navigate('Main')).catch(error => console.log(error))
	}

	onFootLinkPress = () => {
		this.props.navigation.navigate("Register")
	}

	render(){
		return(
			<>
				<Header {...this.props}/>
				<View style={styles.container}>
					<Text style={styles.descriptText}>E-mail</Text>
					<TextInput 
						style={styles.input}
						placeholder={'E-mail'}
						placeholderTextColor='#080807'
						onChangeText = {email => this.setState({email})}
						value = {this.state.email}
						underlineColorAndroid = "transparent"
						autoCapitalize = "none"
					/>
					<Text style={styles.descriptText}>Password</Text>
					<TextInput 
						style={styles.input}
						placeholder={'Password'}
						secureTextEntry = {true}
						placeholderTextColor='#080807'
						onChangeText = {password => this.setState({password})}
						value = {this.state.password}
						underlineColorAndroid = "transparent"
						autoCapitalize = "none"
					/>
					<TouchableOpacity 
						style={styles.button}
						onPress={this.handleLogin}
					>
						<Text>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<View style={styles.footSection}>
							<Text style={styles.footText}>
								Don't have an account?
							</Text>
							<Text style={styles.footLink} 
								onPress={this.onFootLinkPress}>
									Register here!
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</>
		)
	}
	
}

const styles = StyleSheet.create({
	container:{
		flex: 10,
		alignItems:'center'
	},
	descriptText:{
		fontSize: 15,
		padding: 5
	},
	input:{
		borderRadius: 5,
		backgroundColor: '#c4b5b5',
		marginTop: 20,
		marginLeft: 25,
		marginRight: 25,
		marginBottom: 20,
		padding: 10,
		paddingLeft: 20,
		height: 40,
		width: 300,
		overflow: 'hidden'
	},
	footSection:{
		alignItems: 'center',
		flex: 1,
		marginTop: 10,
	},
	footText:{
		color: '#c4b5b5',
		fontSize: 20
	},
	footLink:{
		fontSize: 20,
		fontWeight: 'bold',
		color: '#3949f7'
	},
	button:{
		marginTop: 25,
		height: 40,
		width: 80,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ed1005',
		padding: 5,
		color: '#ffffff'
	}
});

//export default LoginScreen;
