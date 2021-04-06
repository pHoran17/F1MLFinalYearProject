//Original attempt at Main Screen
//Not used in final application and is not accessible
import React, {useState, useEffect, Component}from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Header from '../components/Header';
import RaceClock from '../components/RaceClock';
import LastRace from '../components/LastRace';
import axios from 'axios';

/*const Item = ({data}) => (
	<View>
		<Text>{data.driver}</Text>
	</View>
);
*/

const MainScreen = () => {
	const[currentTime, setCurrentTime] = useState([]);
	const[nextTrack, setNextTrack] = useState([]);
	const[lastRace, setLastRace] = useState([]);
	
	renderItemComponent = (itemData) => <Text>{itemData.driver}</Text>;
	
	useEffect(() => {
		axios.get('http://192.168.0.17:5000/time').then(res => {
			//console.log(res);
			const time = res.data.time;
			const track = res.data.track;
			setNextTrack(track);
			setCurrentTime(time);
		});
	},[]);
	/*useEffect(() => {
		//setLastRace({data:lastRace.data, loading: true});
		axios.get('http://192.168.0.17:5000/', {
			headers: {
				'Content-Type': 'application/json',
				responseType: 'json'
			}
			}).then(res => {
			console.log(res);
			//this.setState.data.map(d => this.state.data.push(d.data))
			//console.log(this.state.data)
			const lr = res.data;
			//console.log(lr);
			setLastRace({data: res.data, loading:false });
			//console.log([lastRace].data);
			//const result = Object.keys(lastRace).map(index => ({[index]: lastRace[index]}));
			//const result = JSON.parse(lastRace);
			//let i = 0;
			//let dataArr = [];
			while (lastRace.data[i]){
				dataArr.push(lastRace.data[i])
				i++
			}
			//console.log(dataArr);
			const result = res.data.map(function(item){
				return{
					key: item.index,
					label: item.driver
				};
			});
			
			
			//console.log(this.state.data);
			
			
			//setNextTrack(track);
			//setCurrentTime(time);
		});*/
		useEffect(() => {
			setLastRace({data:lastRace.data, loading: true});
			axios.get('http://192.168.0.17:5000/lastrace').then(res => {
				if(res.status == 200){
					console.log(res);
					//setLastRace({data: res.data, loading:false });

				}
			}).catch(function(err){
				console.log(err);
			});
		},[]);
	
	});
	const items = () => {
		const data = [lastRace];
		//console.log(data);
		return (
			<View>
					data.map((index) => (<Text>{data[index]}</Text>)
			</View>
		);
	};
	//console.log(items);
	return(
		<>
			<Header {...this.props}/>
			<View style={styles.clockContainer}>
				<Text style={styles.raceName}>Next Race: {[nextTrack]}</Text>
				<Text style={styles.raceTime}>Starts in: {[currentTime]}</Text>
			</View>
			<View style = {styles.resContainer}>
				<FlatList 
					data={[lastRace]}
						renderItem={(item) => (<Text>{item.driver}</Text>)}
						keyExtractor={(item,i) => i.toString()}
				/>
				
			</View>
		</>

	)
};
/*
<FlatList 
						data={[lastRace.data]}
						renderItem={(item) => (<Text>{item.driver}</Text>)}
						keyExtractor={(item,index) => index}
					/>*/
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
		alignItems:'center'
	}
});

export default MainScreen;
