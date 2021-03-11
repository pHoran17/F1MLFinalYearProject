import React, {useState,useEffect, Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import axios from 'axios';

export default class LastRace extends React.Component 
{
	constructor(props)
	{
		super(props);
		
		this.state = 
		{
			data: [],
			loading: true
		};
	}
	renderItem = (item) => {
		return <Text style={styles.raceEntry}>{item.positionOrder} {item.driver} {item.name_y} {item.points} {item.time}</Text>
	}
	renderNativeItem = (item) => {
	
		return <ListItem
			position = {item.positionOrder}
			driver = {item.driver}
			constructor = {item.name_y}
			points = {item.points}
			time = {item.time}
			/>;
	}
	async componentDidMount()
	{
		axios.get('http://192.168.0.17:5000/', {
			headers: {
				'Content-Type': 'application/json'
			}
			}).then(res => {
			console.log(res.data);
			//this.setState.data.map(d => this.state.data.push(d.data))
			//console.log(this.state.data)
			this.setState({
				data: res.data,
				isLoading: false
			});
			console.log(this.state.data);
			//const pos = res.data.positionOrder;
			//const name = res.data.driver;
			//const construct = res.data.name_y;
			//const points = res.data.points;
			//const time = res.data.time;

			//setNextTrack(track);
			//setCurrentTime(time);
		});
	}
	renderItems(){
		const items = this.state.data;
		const listItems = items.map((item) => 
			<ListItem key={index.toString()}
				value={item.driver}
			/>
		);
		return(
			{listItems}
		);
	}
	render(){
		//const{data, isLoading} = this.state;
		const items = this.state.data;
		//console.log(this.state.data)
		const raceList = items.map((race) => {
			return(
				<View>
					<Text>{race.driver}</Text>
				</View>
			)
		})

		return(
			<>
				<View style={styles.container}>
					
				</View>
				
			</>
		)
	}

}
const styles = StyleSheet.create({
	container:{
		flex:10,
		alignItems:'center',
		flexDirection: 'row'
	},
	raceEntry:{
		fontSize:12,
		fontWeight: 'bold'
	},
	raceTime:{
		fontWeight:'bold'
	},
	resContainer:{
		flex:10,
		alignItems:'center'
	}
});