import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import Header from '../components/Header';
import Firebase from '../api/Firebase';
require('firebase/auth');


const RegisterScreen = ({navigation}) => {
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
				email,
				fullName,
			};
			const usersReference = Firebase.firestore().collection('users')
			usersReference.doc(uid).set(data).then(() => {
				navigation.navigate('Main',{user:data})
			})
			.catch((err) => {
				alert(err)
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
};

const styles = StyleSheet.create({
	container:{
		flex:10,
		alignItems:'center'
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
		width: 280,
		overflow: 'hidden'
	},
	button:{
		marginTop: 25,
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

export default RegisterScreen;