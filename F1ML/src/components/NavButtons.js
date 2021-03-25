import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
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
const NavButtons = ({navigation}) => {
	//console.log(navigation)

	const onHomePress = () => {
		navigation.navigate("Main")
	}

	const onPredPress = () => {
		navigation.navigate('Predict')
	}
	const onResPress = () => {
		navigation.navigate('Results')
	}

	return(
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={onHomePress}
				>
				<Text style={styles.buttonText}>Main</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={onPredPress}
				>
				<Text style={styles.buttonText}>Predict</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={onResPress}
				>
				<Text style={styles.buttonText}>Results</Text>
				</TouchableOpacity>
			</View>
		);
}; 

const styles = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection:'row',
		marginTop:20,
		bottom:0
	},
	button:{
		height: 60,
		width:120,
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

export default NavButtons;
