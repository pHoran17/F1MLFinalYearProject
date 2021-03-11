import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Header extends React.Component {
	render(){
		return(
			<View style={styles.header}>
				<Text style={styles.headerText}>F1ML</Text>
			</View>
		);

	}
}
const styles = StyleSheet.create({
	header:{
		flex: 1,
		flexDirection:'column',
		alignSelf:'stretch',
		paddingTop: 15,
		paddingBottom: 5,
		backgroundColor: '#ed1005'

	},
	headerText:{
		fontWeight: 'bold',
		fontSize: 17,
		textAlign: 'center',
		color: '#ffffff'
	}
});
