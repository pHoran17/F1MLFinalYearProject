import React, {useState, useEffect, Component}from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import Header from '../components/Header';
import NavButtons from '../components/NavButtons';
import axios from 'axios';

export default class PredictScreen extends React.Component{
	
	render(){
		return(
			<>
				<Header />
				<View style={styles.container}>
					<Text>Predict Screen</Text>
				</View>
				<View style={styles.buttons}>
					<NavButtons navigation={this.props.navigation}/>
				</View>
			</>
		)
	}

}
const styles = StyleSheet.create({
	container:{
		flex:5
	},
	buttons:{
		flex:2
	}
});
