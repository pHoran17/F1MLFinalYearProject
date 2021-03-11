import React, {useState,useEffect, Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";

export default class StartButtons extends React.Component 
{
	/*const [currentTime, setCurrentTime] = useState();
	useEffect(() => {
		fetch('/time').then(res => res.json()).then(data => {
			setCurrentTime(data.time);
		})
	}, []);
	
	function getNextRace(){
	const[currentTime, setCurrentTime] = useState(0);
	const[nextTrack, setNextTrack] = useState('');
	useEffect(() => {
		fetch('/time').then(res => res.json()).then(data => {
			setCurrentTime(data.time);
			setNextTrack(data.track);
		})
	}, []);

	render()
	{
		return(
			<>
				<View style={styles.container}>
					<Text style ={styles.raceName}>Next Race: {nextTrack}</Text>
					<Text style={styles.raceTime}>Race starts: {currentTime}</Text>
				</View>
			</>
		);
	}*/
	constructor(props)
	{
		super(props);
		
		state = 
		{
			data: [],
			loading: true
		};
	}

	async componentDidMount()
	{
		
			await fetch('/', {
				method: 'get',
				headers:{
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
			})
								.then((response) => response.json())
								.then((json) => 
								{
									this.setState({data : json.timeResult })
								})
								.catch((error) => console.error(error))
								.finally(() => {
									this.setState({isLoading: false});
								});
								
			//const nextRace = await raceApiCall.json();
			//this.setState({raceList: nextRace.results, loading: false});
			console.log({data});
	}
	render(){
		const{data, isLoading} = this.state;
		
		return(
			<>
				{isLoading ? <ActivityIndicator/> : (
					<View style={styles.container}>
						<Text style ={styles.raceName}>Next Race: {this.data.track}</Text>
						<Text style={styles.raceTime}>Race starts: {this.data.time}</Text>
					</View>
				)}
				
			</>
		)
	}
	/*render(){
		//const {raceList, loading} = this.state;
		if(!loading){
			return(
				<>
				<View style={styles.container}>
					<Text style ={styles.raceName}>Next Race: {this.data.track}</Text>
					<Text style={styles.raceTime}>Race starts: {this.data.time}</Text>
				</View>
			</>
			);
		}
		else{
			return <ActivityIndicator />
		}
	};*/
}
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
