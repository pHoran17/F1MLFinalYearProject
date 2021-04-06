//Author: Patrick Horan 2021
//Code for Registration Screen

import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import Header from '../components/Header';
import Firebase from '../api/Firebase';
require('firebase/auth');


/*const registerScreen = ({navigation}) => {
	const [email, setEmail] = useState('')
	const [fullName, setFullName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')


	const onRegisterPress = () => {
		if(password != confirmPassword){
			alert("Passwords are not the same, Please reinsert password")
			return
		}
		Firebase.auth().createUserWithEmailAndPassword(email,password).then((response) => {
			const userid = response.user.userid; 
			const data = {
				id: userid,
				email: email,
				fullName: fullName,
			};
			const usersReference = Firebase.firestore().collection('users')
			usersReference.doc(uid).set(data).then(() => {
				navigation.navigate('Main',{user:data})
			})
			.catch((err) => {
				alert("Failed to register: " + err);
			});
		}) 
	}

	return(
		<>
		<Header />
		<View style={styles.container}>
			<Text style={styles.fieldHeader}>Full Name</Text>
			<TextInput 
				style={styles.input}
				placeholder={'Full Name'}
				placeholderTextColor='#080807'
				onChangeText = {(text) => setFullName(text)}
				value = {fullName}
				underlineColorAndroid = "transparent"
				autoCapitalize = "none"
			/>
			<Text style={styles.fieldHeader}>Email</Text>
			<TextInput 
				style={styles.input}
				placeholder={'E-mail'}
				placeholderTextColor='#080807'
				onChangeText = {(text) => setEmail(text)}
				value = {email}
				underlineColorAndroid = "transparent"
				autoCapitalize = "none"
			/>
			<Text style={styles.fieldHeader}>Password</Text>
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
			<Text style={styles.fieldHeader}>Confirm Password</Text>
			<TextInput 
				style={styles.input}
				placeholder={'Confirm Password'}
				secureTextEntry = {true}
				placeholderTextColor='#080807'
				onChangeText = {(text) => setConfirmPassword(text)}
				value = {confirmPassword}
				underlineColorAndroid = "transparent"
				autoCapitalize = "none"
			/>
			<TouchableOpacity 
				style={styles.button}
				onPress={onRegisterPress}
			>
				<Text>Register</Text>
			</TouchableOpacity>
		</View>
		</>
	);
};*/

export default class RegisterScreen extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			fullName:"",
			email: "",
			password: "",
			confirmPassword:""
		}
	}
	//Function that is called when the register button is pressed
	//Handles process of adding user to Firebase database
	onRegisterPress = () => {
		if(this.state.password != this.state.confirmPassword){
			alert("Passwords are not the same, Please reinsert password")
			return
		}

		Firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((response) => {
			const userid = response.user.userid; 
			const data = {
				id: userid,
				email: this.state.email,
				fullName: this.state.fullName,
			};
			const usersReference = Firebase.firestore().collection('users')
			usersReference.doc(uid).set(data).then(() => {
				navigation.navigate('Main',{user:data})
			})
			.catch((err) => {
				//alert(err)
				const eCode = err.code;
				const eMessage = err.message;
				//Error handling for various errors that can occur as result of user input
				if(eCode === "auth/weak-password")
				{
					alert("Failed to Register: " + eMessage);
				}
				else if(eCode === "auth/email-already-in-use")
				{
					alert(" Failed to Register: " + eMessage);
				}
				else if(eCode === "auth/invalid-email")
				{
					alert("Failed to Register: " + eMessage + " Please ensure that @ is included when entering email address");
				}
				else if(err == "ReferenceError: Can't find variable: uid"){
					console.log('uid null')
				}
				else{
					alert(err);
				}
			});
		}) 
	}
	//Code for rendering Register Screen
	render()
	{
		return(
			<>
			<Header {...this.props}/>
			<View style={styles.container}>
				<Text style={styles.fieldHeader}>Full Name</Text>
				<TextInput 
					style={styles.input}
					placeholder={'Full Name'}
					placeholderTextColor='#080807'
					onChangeText = {(fullName) => this.setState({fullName})}
					value = {this.state.fullName}
					underlineColorAndroid = "transparent"
					autoCapitalize = "none"
				/>
				<Text style={styles.fieldHeader}>Email</Text>
				<TextInput 
					style={styles.input}
					placeholder={'E-mail'}
					placeholderTextColor='#080807'
					onChangeText = {(email) => this.setState({email})}
					value = {this.state.email}
					underlineColorAndroid = "transparent"
					autoCapitalize = "none"
				/>
				<Text style={styles.fieldHeader}>Password</Text>
				<TextInput 
					style={styles.input}
					placeholder={'Password'}
					secureTextEntry = {true}
					placeholderTextColor='#080807'
					onChangeText = {(password) => this.setState({password})}
					value = {this.state.password}
					underlineColorAndroid = "transparent"
					autoCapitalize = "none"
				/>
				<Text style={styles.fieldHeader}>Confirm Password</Text>
				<TextInput 
					style={styles.input}
					placeholder={'Confirm Password'}
					secureTextEntry = {true}
					placeholderTextColor='#080807'
					onChangeText = {(confirmPassword) => this.setState({confirmPassword})}
					value = {this.state.confirmPassword}
					underlineColorAndroid = "transparent"
					autoCapitalize = "none"
				/>
				<TouchableOpacity 
					style={styles.button}
					onPress={this.onRegisterPress}
				>
					<Text>Register</Text>
				</TouchableOpacity>
			</View>
			</>
		);
	}

}
//Stylesheet for Register Screen
const styles = StyleSheet.create({
	container:{
		flex:10,
		alignItems:'center'
	},
	input:{
		borderRadius: 5,
		backgroundColor: '#c4b5b5',
		marginTop: 10,
		marginLeft: 25,
		marginRight: 25,
		marginBottom: 10,
		padding: 10,
		paddingLeft: 20,
		height: 40,
		width: 280,
		overflow: 'hidden'
	},
	button:{
		marginTop: 20,
		height: 40,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ed1005',
		padding: 10,
		color: '#ffffff'
	},
	fieldHeader:{
		fontSize: 15,
		padding:5
	}
});

//export default RegisterScreen;