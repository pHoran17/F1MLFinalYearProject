//Author: Patrick Horan 2021
//Code for Navigation Buttons that are displayed when user is signed in and on the main, results or prediction screen
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
//import ScreenMain from '../screens/ScreenMain';
//import PredictScreen from '../screens/PredictScreen';
import {useNavigation} from '@react-navigation/native';

/*export default class NavButtons extends React.Component {

	constructor(props)
	{
		super(props);

		
	}

	getNav = ({screenName}) => {
		const navigation = useNavigation();
		return(
			<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate({screenName})}
			>
				<Text style={styles.buttonText}>{screenName}</Text>
			</TouchableOpacity>
		);
	}

	render()
	{
		//const navigation = getNav();
		console.log(this.props);
		return(
			<View style={styles.container}>
				{<TouchableOpacity
								style={styles.button}
								onPress={() => navigation.navigate('Main')}
								>
									<Text style={styles.buttonText}>Home</Text>
								</TouchableOpacity>
								<TouchableOpacity
								style={styles.button}
								onPress={() => this.props.navigation.navigate('Predict')}
								>
									<Text style={styles.buttonText}>Predict</Text>
								</TouchableOpacity>
				
			</View>
		);
	}

}*/
//Component that provides buttons for navigating to specific pages
const NavButtons = ({navigation}) => {
	//console.log(navigation)

	//Function called when button for Main screen is pressed
	const onHomePress = () => {
		navigation.navigate("Main")
	}
	//Function Called when button for Prediction screen is pressed
	const onPredPress = () => {
		navigation.navigate('Predict')
	}
	//Function called when button for Results screen is pressed
	const onResPress = () => {
		navigation.navigate('Results')
	}
	//Renders buttons containing an icon and text to describe the respective pages that they navigate to
	return(
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={onHomePress}
				>
				<Image style={styles.mainImage} source={require('../icons/home.png')}/>
				<Text style={styles.buttonText}>Main</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={onPredPress}
				>
				<Image style={styles.predictImage} source={require('../icons/predict.png')}/>
				<Text style={styles.buttonText}>Predict</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={onResPress}
				>
				<Image style={styles.resultsImage} source={require('../icons/results.png')}/>
				<Text style={styles.buttonText}>Results</Text>
				</TouchableOpacity>
			</View>
		);
}; 
//Stylesheet for NAvigation buttons, renders buttons in row that is displayed at the bottom of a page
//Done using absolute positioning and the row atrribute for flexDirection
const styles = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection:'row',
		marginTop:0,
		bottom:0
	},
	button:{
		height: 85,
		width:130,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ed1005',
		padding: 30,
		color: '#ffffff'
	},
	mainImage:{
		height:35,
		width:30
	},
	predictImage:{
		height:35,
		width:30
	},
	resultsImage:{
		height:35,
		width:50
	},
	buttonText:{
		fontSize:18,
		color: '#ffffff'
	}
});

export default NavButtons;
