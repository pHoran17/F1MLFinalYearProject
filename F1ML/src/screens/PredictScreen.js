import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import Header from '../components/Header';
import NavButtons from '../components/NavButtons';
import axios from 'axios';
import base64 from 'base-64';
import firebase from 'firebase';
import Firebase from '../api/Firebase';
require('firebase/auth');
require('firebase/database');

export default class PredictScreen extends React.Component
{
	
	constructor(props)
	{
		super(props);

		this.state =
		{
			modelData: [],
			graphData: [],
			isloading: true
		};
	}

	async componentDidMount()
	{
			const url1 = 'http://192.168.0.17:5000/model';
			const url2 = 'http://192.168.0.17:5000/graph';
			const req1 = axios.get(url1);
			const req2 = axios.get(url2);

			//Rewrite to retrieve data from Firebase
			/*
			//Causes Unhandled promise rejection when splitting responses, use individual calls instead
			axios.all([req1, req2]).then(axios.spread((...responses) => {
				const res1 = responses[0]
				const res2 = responses[1];
				const b64Image = res2.data.ImageBytes;
				const decodeImage = base64.decode(b64Image);
				console.log(decodeImage);
				this.setState ({

					modelData: res1.data.data,
					graphData:res2.data.ImageBytes,
					isloading: false
				});
				
			}).catch(errors => {
				console.error(errors);
			}))
			*/
			/*axios.get(url1).then(res => {
				//console.log(res.data.data);
				const modelReq = res.data.data; 
				//const decodeImage = base64.decode(b64Image);
				this.setState({
					modelData:res.data.data
				});
			});
			*/


			/*axios.get(url2).then(res => {
				//console.log(res);
				const b64Image = res.data.ImageBytes;
				//console.log(this.state.modelData);
				//const decodeImage = base64.decode(b64Image);
				this.setState({
					graphData:b64Image,
					isloading:false
				});
				//console.log(this.state.modelData);
			});*/

			//const predictions = [];
			const predKey = []
			const refer = Firebase.database().ref('predict');

			await refer.once('value', (snapshot) => {
				if(snapshot.exists()){
					snapshot.forEach((child) => {
						const key = child.key;
						predKey.push({
							pKey: key,
							data: child.val().data
						});
						
					})
				}
			});
			const predictionKey = predKey[0].pKey
			await refer.child(predictionKey).once('value', (snapshot) => {
				this.setState({
					modelData:snapshot.val().data
				})

			});
	}
	/*async setPredictionData(data){
		this.setState=({
			modelData:data
		});
		console.log(this.state.modelData);
	}*/
	render()
	{
		if(this.state.modelData.length !== 0){
			
			console.log(this.state.modelData);
			return(
				<>
					<View style={styles.header}>
						<Header {...this.props}/>
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.predPageTitle}>2020 F1 Season Podium Predcitions</Text>
					</View>
					<View style={styles.resultsList}>
						<View style={styles.predListHead}>
										<Text style={styles.listHeadText}>Driver</Text>
										<Text style={styles.listHeadRes}>Results</Text>
										<Text style={styles.listHeadActPod}>Actual</Text>
										<Text style={styles.listHeadPredPod}>Predicted</Text>
						</View>
						<FlatList 
								data={this.state.modelData}
								keyExtractor={(item,index) => item.index.toString()}
								renderItem={({item, index}) => (
									<ListItem>
										<ListItem.Content>
											<View style ={styles.predictItem}>
												<Text style={styles.driverItem}>
													{item.driver}
												</Text>
												<Text style={styles.resultItem}>
													{item.results}
												</Text>
												<Text style={styles.actItem}>
													{item.actual}
												</Text>
												<Text style={styles.predItem}>
													{item.prediction}
												</Text>
											</View>
										</ListItem.Content>
									</ListItem>
								)}
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
			//console.log(this.state.graphData);
			return(
				<>
					<Header {...this.props}/>
					<View style={styles.container}>
						<Text>Loading...</Text>
					</View>
					<View style={styles.buttons}>
						<NavButtons navigation={this.props.navigation}/>
					</View>
				</>
			)
		}
	}

}
/*
		<View style={styles.container}>
			<Image style={styles.graph} source={{uri: `data:image/png;base64,${this.state.graphData}`}}/>
		</View>
*/
//Fix styling issues with header and list
const styles = StyleSheet.create({
	container:{
		flex:10,
		alignItems:'center'
	},
	header:{
		flex:2
	},
	titleContainer:{
		flex:1,
		alignItems:'center'
	},
	predPageTitle:{
		fontSize:20,
		fontWeight:'bold',
		marginTop:10
	},
	resultsList:{
		flex:7,
		
	},
	predListHead:{
		flexDirection:'row'
	},
	listHeadText:{
		marginLeft:20
	},
	listHeadRes:{
		marginLeft:80
	},
	listHeadActPod:{
		marginLeft:60
	},
	listHeadPredPod:{
		marginLeft:20
	},
	predictItem:{
		flexDirection:'row'
	},
	driverItem:{
		marginLeft:5
	},
	resultItem:{
		marginLeft:25
	},
	actItem:{
		marginLeft:25
	},
	predItem:{
		marginLeft:30
	},
	graph:{
		width:400,
		height:400
	},
	buttons:{
		flex:1,
		bottom:0,
		position:'relative',
		marginBottom:10,
		backgroundColor:'#ed1005'
	}
});
