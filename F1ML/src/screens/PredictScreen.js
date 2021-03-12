import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import Header from '../components/Header';
import NavButtons from '../components/NavButtons';
import axios from 'axios';
import base64 from 'base-64';

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
			const url1 = 'http://192.168.0.17:5000/';
			const url2 = 'http://192.168.0.17:5000/graph';
			const req1 = axios.get(url1);
			const req2 = axios.get(url2);


			/*axios.all([req1, req2]).then(axios.spread((...responses) => {
				const res1 = responses[0]
				const res2 = responses[1];
				const b64Image = res2.data.ImageBytes;
				const decodeImage = base64.decode(b64Image);
				console.log(decodeImage);
				this.setState ({

					//graphData:res2.data,
					isloading: false
				});
				
			}).catch(errors => {
				console.error(errors);
			}))*/

			axios.get(url2).then(res => {
				//console.log(res);
				const b64Image = res.data.ImageBytes;
				//const decodeImage = base64.decode(b64Image);
				this.setState({
					graphData:b64Image,
					isloading:false
				});
			});

			
	}

	render()
	{
		if(this.state.graphData.length !== 0){
			
			console.log(typeof(this.state.graphData));
			return(
				<>
					<Header />
					<View style={styles.container}>
						<Text>Model Data Here</Text>
						<Image style={styles.graph} source={{uri: `data:image/png;base64,${this.state.graphData}`}}/>
					</View>
					<View style={styles.buttons}>
						<NavButtons navigation={this.props.navigation}/>
					</View>
				</>
			)
		}
		else
		{
			console.log(this.state.graphData);
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

}
const styles = StyleSheet.create({
	container:{
		flex:5,
		alignItems:'center'
	},
	graph:{
		width:400,
		height:400
	},
	buttons:{
		flex:2
	}
});
