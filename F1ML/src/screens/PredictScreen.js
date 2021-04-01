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
			const url1 = 'http://192.168.0.17:5000/model';
			const url2 = 'http://192.168.0.17:5000/graph';
			const req1 = axios.get(url1);
			const req2 = axios.get(url2);


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
			axios.get(url1).then(res => {
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
			});

			
	}

	render()
	{
		if(this.state.graphData.length !== 0){
			
			console.log(this.state.modelData);
			return(
				<>
					<View style={styles.header}>
						<Header {...this.props}/>
					</View>
					<View style={styles.resultsList}>
					<FlatList 
							data={this.state.modelData}
							keyExtractor={(item,index) => item.index.toString()}
							renderItem={({item, index}) => (
								<ListItem>
									<ListItem.Content>
										<Text>
											Driver: {item.driver}
										</Text>
										<Text>
											Results: {item.results}
										</Text>
										<Text>
											Podium: {item.podium}
										</Text>
										<Text>
											Actual Podium: {item.actual}
										</Text>
										<Text>
											Predicted Podium: {item.prediction}
										</Text>
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
		flex:1
	},
	resultsList:{
		flex:8,
		
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
