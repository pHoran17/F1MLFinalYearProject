import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import Header from '../components/Header';
import NavButtons from '../components/NavButtons';
import axios from 'axios';
import base64 from 'base-64';
import Firebase, {database} from '../api/Firebase';
//import FBDatabase from '../api/FBDatabase';
import firebase from 'firebase';
require('firebase/auth');
require('firebase/database');
//const database = Firebase.database();

export default class ResultsScreen extends React.Component
{
	
	constructor(props)
	{
		super(props);

		this.state =
		{
			resultData: [],
			isloading: true
		};
	}
    
	async componentDidMount()
	{
			//const url1 = 'http://192.168.0.17:5000/results';
			//const url2 = 'http://192.168.0.17:5000/graph';
			//const req1 = axios.get(url1);
			//const req2 = axios.get(url2);
            Firebase.database().ref('/results/data').on('value', querySnapshot => {
                let data = querySnapshot.val() ? querySnapshot.val() : {};
                let response = {...data};
                //console.log(response);
                this.setState({
                    resultData: response
                });
            });
            /*
            const year = 2020;
            Firebase.database().ref('/results')
            .child('data')
            .orderByChild('year')
            .equalTo(year)
            .once('child_added').then(querySnapshot => {
                const res = [];
                querySnapshot.array.forEach(element => {
                    res = [element.val(), ...res];
                });
                console.log(res);
            });*/
            //Firebase.database().ref('/results/data').child().
			/*
			//Causes Unhandled promis rejection when splitting responses, use individual calls instead
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


			axios.get(url2).then(res => {
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

			
	}

	render()
	{
		if(this.state.resultData.length !== 0){
			
			console.log(this.state.resultData);
			return(
				<>
					<View style={styles.header}>
						<Header {...this.props}/>
					</View>
					<View style={styles.resultsList}>
					<FlatList 
							data={this.state.resultData}
							keyExtractor={(item,index) => item.index.toString()}
							renderItem={({item, index}) => (
								<ListItem>
									<ListItem.Content>
                                    <ListItem.Title style={styles.resultTitle}>{item.positionText}</ListItem.Title>
												<Text style={styles.driver}>{item.driver}</Text>
												<Text style={styles.constructor}>{item.name_y}</Text>
												<Text style={styles.points}>{item.points}</Text>
												<Text style={styles.time}>{item.time_x}</Text>
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
						<Text>Loading</Text>
					</View>
					<View style={styles.buttons}>
						<NavButtons navigation={this.props.navigation}/>
					</View>
				</>
			)
		}
	}

}

//Fix styling issues with header and list
const styles = StyleSheet.create({
	container:{
		flex:10,
		alignItems:'center'
	},
	header:{
		flex:1
	},
	resultsList:{
		flex:8,
		
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
		bottom:0,
		position:'relative',
		marginBottom:10,
        backgroundColor:'#ed1005'
	}
});
