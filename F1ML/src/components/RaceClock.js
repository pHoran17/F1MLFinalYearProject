import React, {useState,useEffect, Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";

//Overhaul to take time given from parent component and to countdown to zero
const RaceClock = ({data}) => {
	
	
	return(
		<View style={styles.container}>
			<Text style={styles.raceName}>Next Race: {data.track}</Text>
			<Text style={styles.raceTime}>Starts in: {timeD.time}</Text>
		</View>
	);
};
const styles = StyleSheet.create(
{
	container:{
		flex:1,
		alignItems:'center'
	},
	raceName:{
		fontSize:16,
		fontWeight: 'bold'
	},
	raceTime:{
		fontWeight:'bold'
	}
});
