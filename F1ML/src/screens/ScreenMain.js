import React, {useState, useEffect, Component}from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import Header from '../components/Header';
import NavButtons from '../components/NavButtons';
import RaceClock from '../components/RaceClock';
import LastRace from '../components/LastRace';
import axios from 'axios';

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
		const url1 = 'http://192.168.0.17:5000/time';
		const url2 = 'http://192.168.0.17:5000/';
		const req1 = axios.get(url1);
		const req2 = axios.get(url2);
		const config = {
			headers: {'Access-Control-Cross-Origin': '*'}
		};

		axios.all([req1, req2]).then(axios.spread((...responses) => {
			const res1 = responses[0];
			const res2 = responses[1];
			//console.log(res1, res2);
			this.setState({
				raceData: res2.data.data,
				timeData: res1.data,
				loading: false
			});
			//console.log(this.state.raceData);
		})).catch(errors => {
			console.error(errors);
		})
	}
	//Unused, flatlist used instead in render
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
	//Method for rendering screen, called first in lifecycle
	render()
	{	
		//Only gets called provdided racedata is not null, this is to prevent crashes
		if(this.state.raceData.length !== 0)
		{
			//console.log(this.state.raceData[0]);
					const timeD = this.state.timeData;
					const raceD = this.state.raceData;
					const {nav} = this.props.navigation;
					//console.log(this.props);
					const i = 0;
					//Convert raceD to array and map text
					//const raceArr = [raceD];
					if(this.state.raceData.length !== undefined)
					{
						//console.log(this.state.raceData);
					}
					return(
						<>
							<Header {...this.props}/>
							<View style={styles.clockContainer}>
								<Text style={styles.raceName}>Next Race: {timeD.track}</Text>
								<Text style={styles.raceTime}>Starts in: {timeD.time}</Text>
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
			//console.log(this.state.raceData);
			//Loads if data recieved from server is null/undefined, Prevents crash
			return (
				<View>
					<Text>Loading...</Text>
				</View>
			)
		}
		
	}

}
const styles = StyleSheet.create({
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
