//Author: Patrick Horan 2021
//Code for Main Screen. This screen is displayed when the user signs in.
//This screen shows the user a countdown timer for the next race of the current F1 season and the results of the last completed race

import React, {useState, useEffect, Component}from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import Header from '../components/Header';
import NavButtons from '../components/NavButtons';
import RaceClock from '../components/RaceClock';
import LastRace from '../components/LastRace';
import Countdown from 'react-native-countdown-component';
import axios from 'axios';
import Firebase from '../api/Firebase';
require('firebase/auth');
require('firebase/database');

export default class ScreenMain extends React.Component{

	constructor(props)
	{
		super(props);
		
		this.state = 
		{
			raceData: [],
			timeData:[],
			loading: true
		};
	}
	//Calls after render, used for retrieving data from api, render is called again when state is set in componentdidmount
	async componentDidMount(){
		//Code from old implementation of Axios requests to local implementation of Flask Backend 
		/*
			const url1 = 'http://192.168.0.17:5000/time';
			const url2 = 'http://192.168.0.17:5000/';
			const req1 = axios.get(url1);
			const req2 = axios.get(url2);
			const config = {
				headers: {'Access-Control-Cross-Origin': '*'}
			};
		*/
		/*
			await axios.all([req1, req2]).then(axios.spread((...responses) => {
				const res1 = responses[0];
				const res2 = responses[1];
				//console.log(res1, res2);
				this.setState({
					raceData: res2.data.data,
					timeData: res1.data,
					loading: false
				});
				console.log(this.state.timeData.time);
			})).catch(errors => {
				console.error(errors);
			})
		*/

		//Initialisation of Firebase queries for this page
		const refer = Firebase.database().ref('raceTimes');
		const lrRefer = Firebase.database().ref('lastRace');
		const curTime = new Date();
		const dispTimeData = [];
		const lrData = [];
		//console.log(curTime);
		//This query is used to retrieve the name and time of the next race in the 2021 F1 season
		//Only data for one race is returned
		await refer.once('value', (snapshot) => {
			if(snapshot.exists()){
				const i = 0;
				snapshot.forEach((child) => {
					//console.log(child.val().data[i].time);
					const childTime = child.val().data[i].time;
					const compTime = new Date(childTime).getTime();

					//Condition for comparing the current time to the time of an upcoming race.
					//The data is assigned if the race in question has not been completed
					if(compTime > curTime.getTime()){
						dispTimeData.push({
							race:child.val().data[i].race,
							time:child.val().data[i].time
						})
						return;
					}
					i += 1;

				})
				//console.log(dispTimeData);
			}
		});
		//Query for returning results for last completed race, currently set to Abu Dhabi 2020
		await lrRefer.once('value', (snapshot) => {
			if(snapshot.exists()){
				snapshot.forEach((child) => {
					lrData.push({
						data:child.val().data
					});
				})
				//console.log(lrData);
				
				//console.log(this.state.raceData);
			}
		})
		//Assignment of values to state variables is called outside of query, only way to ensure that data is assigned
		this.setState({
			raceData:lrData[0].data,
			timeData:dispTimeData
		});
	}
	//Unused, flatlist used instead in render
	/*
		renderItems = ({item},{i}) => {
			//const index = i;
			console.log(i);
			return(
				<ListItem>
						<ListItem.Content>
						<ListItem.Title>{this.state.raceData[i].driver}</ListItem.Title>
						<View>
							<Text>{this.state.raceData[i].positionOrder}</Text>
							<Text>{this.state.raceData[i].name_y}</Text>
							<Text>{this.state.raceData[i].points}</Text>
							<Text>{this.state.raceData[i].time}</Text>
						</View>
						</ListItem.Content>
				</ListItem>
			);
		}
	*/
	//Method for rendering screen, called first in lifecycle
	render()
	{	
		//Only gets called provdided racedata is not null, this is to prevent crashes
		if(this.state.raceData.length !== 0)
		{
			//console.log(this.state.raceData[0]);
					//console.log(this.state.timeData);
					const timeD = this.state.timeData[0];
					const raceD = this.state.raceData;
					//const raceDate = new Date(timeD.time);
					const cdTime = new Date(timeD.time).getTime();
					const cdTimeSecs = cdTime * 86400;
					const dateNow = Date.now();
					//const timeNow = dateNow.getTime();
					//const difTime = Math.floor((cdTime - dateNow)/1000);
					//Attempt at improving accuracy of countdown clock
					//Fails to return fully accurate result, hard to determine why due to components lack of documentation
					const difTime = Math.round((cdTime - dateNow)/1000);
					console.log(difTime);
					const tLabels = {d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds', ms:'Milliseconds'};
					const {nav} = this.props.navigation;
					console.log('gettime: ' + cdTime);
					console.log('Seconds: ' + cdTimeSecs);
					const i = 0;
					//Convert raceD to array and map text
					//const raceArr = [raceD];
					/*if(this.state.raceData.length !== undefined)
					{
						//console.log(this.state.raceData);
					}*/

					return(
						<>
							<Header {...this.props}/>
							<View style={styles.clockContainer}>
								<Text style={styles.raceName}>Next Race: {timeD.race}</Text>
								<Countdown until={difTime}
								timeToShow={['D', 'H', 'M']}
								timeLabels={tLabels}
								size={10}/>
							</View>
							<View style={styles.resContainer}>
								<Text style={styles.lastRaceTitle}>Abu Dhabi 2020 Race Results</Text>
								<View style={styles.listHead}>
									<Text style={styles.listHeadText}>Pos</Text>
									<Text style={styles.listHeadText}>Driver</Text>
									<Text style={styles.listHeadConstruct}>Constructor</Text>
									<Text style={styles.listHeadText}>Points</Text>
									<Text style={styles.listHeadText}>Time</Text>
								</View>
								<FlatList 
									data={this.state.raceData}
									keyExtractor= {(item,index) => item.key}
									renderItem={({item,index}) => (
									<ListItem key={item.key}>
											<ListItem.Content>
											<View style={styles.listItemContent}>
												<ListItem.Title style={styles.resultTitle}>{item.positionOrder}</ListItem.Title>
												<Text style={styles.driver}>{item.driver}</Text>
												<Text style={styles.constructor}>{item.name_y}</Text>
												<Text style={styles.points}>{item.points}</Text>
												<Text style={styles.time}>{item.time_x}</Text>
											</View>
											</ListItem.Content>
									</ListItem>)}
								/>
							</View>
							<View style={styles.buttons}>
								<NavButtons navigation={this.props.navigation}/>
							</View>
						</>
					)
		}
		else
		{
			//Loads if data recieved from server is null/undefined, Prevents crash
			return (
				<>
					<Header {...this.props}/>
					<View style={styles.container}>
					<	Text>Loading...</Text>
					</View>
				
				</>
				
			)
		}
		
	}

}
const styles = StyleSheet.create({
	container:{
		flex:10,
		alignItems:'center'
	},
	clockContainer:{
		flex:1,
		alignItems:'center'
	},
	raceName:{
		fontSize:16,
		fontWeight: 'bold'
	},
	raceTime:{
		fontWeight:'bold'
	},
	resContainer:{
		flex:10,
	},
	lastRaceTitle:{
		alignItems:'center',
		alignSelf: 'stretch',
		justifyContent:'center',
		fontSize:16,
		paddingLeft:50,
		paddingRight:50
	},
	listHead:{
		flexDirection: 'row',
	},
	listHeadText:{
		paddingLeft:5,
		paddingTop:5,
		paddingRight:20
	},
	listHeadConstruct:{
		paddingLeft:30,
		paddingTop:5,
		paddingRight:15
	},
	resultTitle:{
		alignItems:'center',
		fontWeight:'bold',
		paddingRight: 10,
		paddingTop: 5
	},
	driver:{
		paddingTop: 5,
		paddingLeft: 15
	},
	constructor:{
		alignItems:'center',
		paddingTop: 5,
		paddingLeft: 15,
		paddingRight: 10
	},
	points:{
		alignItems:'center',
		paddingTop: 5,
		paddingLeft: 10,
		paddingRight: 15
	},
	time:{
		alignItems:'center',
		paddingTop: 5,
		paddingLeft: 15
	},
	buttons:{
		flex:2,
		backgroundColor:'#ed1005'
	},
	listItemContent:{
		flexDirection: 'row',
		alignItems: 'center'
	}
});
