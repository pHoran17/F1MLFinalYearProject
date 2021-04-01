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
import DropDownPicker from 'react-native-dropdown-picker';
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
            pickerList: [],
            race: "Abu Dhabi Grand Prix 2012",
			isloading: true
		};
	}
    /*getRaceKey(keyRace){
        const race = this.state.race;
        keyRace.forEach((dbRace) => {
            if(race == dbRace.race){
                return dbRace.key;
            }
        })
    }
    */
	async componentDidMount()
	{
			const url1 = 'http://192.168.0.17:5000/res';
			const url2 = 'http://192.168.0.17:5000/raceList';
            const pRequest = {
                data:{
                    race: this.state.race
                },
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                responseType: 'json',
                url: url1
            };
            const listRequest = {
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                responseType: 'json',
                url: url2
            };
			//const req1 = axios.post(url1, pRequest);
			//const req2 = axios.get(url2);
            const race = this.state.race;
            //const refer = await Firebase.database().ref('results');
            const items = new Array();
            //const pickerItems = new Array();
            //const racePair = new Object();
            /*refer.on('value',(function (snapshot) 
            {
                //console.log(snapshot.val());
                if(snapshot.exists())
                {
                    //console.log(snapshot.val());
                    snapshot.forEach(function (child) 
                    {
                        //console.log(child.val().race[0]);
                        //console.log(race);
                        const currentRace = child.val().race[0];
                        //console.log(correctRace == race);
                        if(currentRace == race)
                        {
                            const key = child.key;
                            const data = currentRace;
                            //console.log(data);
                            items.push(
                            {
                                key: key,
                                race: data
                            });
                            
                         
                        }
                        pickerItems.push(
                            {
                                label: currentRace,
                                value: child.key,
                            });
                        
                    });
                }
                else
                {
                    alert("Failed to retrieve data");
                }
            })
            );
            if(pickerItems.length !== 0)
            {
                if(items.length !== 0)
                {
                    //console.log(items);
                    const searchPair = JSON.stringify(items);
                    const searchText = searchPair.substring(1, searchPair.length-1);
                    const searchObject = JSON.parse(searchText);
                    //console.log(searchObject);
                    const sKey = searchObject.key;
                    const rVal = searchObject.race;
                    //console.log("Key " + sKey + " RaceSearch " + rVal);
                    //const resQuery = refer.child(searchObject.key).orderByChild("race").equalTo(searchObject.race);
                    const resQuery = await refer.child(searchObject.key);
                    const res = new Array();
                    resQuery.once('value', function(snapshot){
                        if(snapshot.exists()){
                            //console.log(snapshot);
                            //console.log(pickerItems);
                            //Create for loop in forEach to extract values from each array for res array, assign output to state
                            //console.log(snapshot.val().driver);
                            res.push({
                                pos:snapshot.val().positionText,
                                driver:snapshot.val().driver,
                                laps:snapshot.val().laps,
                                time:snapshot.val().time_x

                            });
                            //console.log(res);
                        }
                    });
                    this.setState={
                        resultData: res,
                        pickerList: pickerItems
                    };
                    //console.log(this.state.resultData);
                }
                else
                {
                    alert("Unable to retrieve data, array is null");
                }
            }
            else
            {
                alert("Unable to retrieve results");
            }
            */
            
            
            
            
            //const searchKey = searchPair.key;
            //console.log(searchKey);
            
            //const searchKey = this.getRaceKey(keyRace);
            //console.log(keyRace.key);
            /*resQuery.on('value', (function (snapshot) {
                if(snapshot.exists())
                {
                    console.log(snapshot);
                    
                    this.setState = ({
                        resultData: snapshot.toJSON(),
                        isloading: false
                    })
                }
                else{
                    alert("Failed to retrieve data");
                }
              
            }));*/
            /*refer.child('results').orderByKey().endAt(race).on('value',(function (snapshot) 
            {
                if(snapshot.exists()){
                    console.log(snapshot.val());
                    snapshot.forEach(function (child) {
                        //console.log(child.val())
                    })
                }
                else{
                    console.log("Failed to retrieve data")
                }
            })
            );*/

            //console.log(refer);
            /*refer.child("results").orderByChild('race')
            .on("value", function(snapshot){
                //let data = snapshot.val() ? snapshot.val() : {};
                snapshot.forEach(function(child) {
                    console.log(child.val())
                });
                
            });*/
            /*const race = this.state.race;
            Firebase.database().ref('/results')
            .child('data')
            .orderByChild('race')
            .equalTo(race)
            .once('value').then(querySnapshot => {
                const res = [];
                querySnapshot.forEach(element => {
                    res = [element.val(), ...res];
                }).catch(function(error){
                    console.log(error);
                });
                console.log(res);
            });*/
            //Firebase.database().ref('/results/data').child().
			
			//Causes Unhandled promis rejection when splitting responses, use individual calls instead
			/*axios.all([req1, req2]).then(axios.spread((...responses) => {
				const res1 = responses[0]
				const res2 = responses[1];
                const rList = res2.data;
                this.setInitResults(res1.data.data,rList);
				
			}).catch(errors => {
				console.error(errors);
			}))*/
			
            
            /*axios.get(url2).then(response => {
                //pickerItems = response.data;
                //console.log(rList);
                console.log(response.data);
            }).catch(function(error){
                console.log(error);
            });*/
            axios.post(url1, pRequest).then(response => {
                //console.log(response.data);
                this.setInitResults(response.data.data);
                //console.log(this.state.resultData);
            }).catch(function(error){
                console.log(error);
            });
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
    /*async getPickerList()
    {
        const url2 = 'http://192.168.0.17:5000/raceList';
        axios.get(url2).then(response => {
            console.log(response.data);
            const pickItems = response.data;
            return pickItems;
            //console.log(rList);
        }).catch(function(error){
            console.log(error);
        });
    }*/
    async setInitResults(data){
        //const races = [];
        const url2 = 'http://192.168.0.17:5000/raceList';
        await axios.get(url2).then(response => {
            //console.log(response.data);
            const races = response.data.data;
            this.setState({resultData: data, pickerList: races});
            //console.log(rList);
        }).catch(function(error){
            console.log(error);
        });
        //console.log(races);
        
        //console.log(this.state.pickerList);
    }
    async setResults(data){
        const raceRequest = {
            data:{
                race: data
            },
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            responseType: 'json',
            url: url1
        };
        axios.post(url1, raceRequest).then(response => {
           //await this.setState({resultData: response.data.data, race:data});
           return response.data.data
            
        }).catch(function(error){
            console.log(error);
        });
    }
    async changeRace(data){
        //const newResults = setResults(data);
        //console.log(this.state.race);
        //await this.setState({race:data});
        console.log(this.state.race);
        const crUrl = 'http://192.168.0.17:5000/res';
        const raceRequest = {
            data:{
                race: data
            },
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            responseType: 'json',
            url: crUrl
        };
        await axios.post(crUrl, raceRequest).then(response => {
           //await this.setState({resultData: response.data.data, race:data});
            this.setState({race: data, resultData: response.data.data});
            
        }).catch(function(error){
            console.log(error);
        });
        
    }
	render()
	{
		if(this.state.resultData.length !== 0){
			
			//console.log(this.state.pickerList);
            console.log(this.state.race);
			return(
				<>
					<View style={styles.header}>
						<Header {...this.props}/>
					</View>
                    <View style={styles.dropdownContainer}>
                        <DropDownPicker
                            items={this.state.pickerList}
                            style={styles.dropdown}
                            onChangeItem={item => this.changeRace(item.value)}
                        />
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
												<Text style={styles.constructor}>{item.constructor}</Text>
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
			//console.log(this.state.resultData);
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
/*
<View style={styles.dropdownContainer}>
                        <DropDownPicker
                            items={[
                                {label: 'Abu Dhabi 2020', value:'Abu Dhabi Grand Prix 2020'},
                                {label: 'Sakhir 2020', value:'Sakhir Grand Prix 2020'},
                                {label: 'Bahrain 2020', value:'Bahrain Grand Prix 2020'},
                                {label: 'Turkey 2020', value:'Turkish Grand Prix 2020'},
                                {label: 'Imola 2020', value:'Emilia Romagna Grand Prix 2020'},
                                {label: 'Portugal 2020', value:'Portuguese Grand Prix 2020'},
                                {label: 'Germany 2020', value:'Eifel Grand Prix 2020'},
                                {label: 'Russian 2020', value:'Russian Grand Prix 2020'},
                                {label: 'Mugello 2020', value:'Tuscan Grand Prix 2020'},
                                {label: 'Monza 2020', value:'Italian Grand Prix 2020'},
                                {label: 'Belgium 2020', value:'Belgian Grand Prix 2020'},
                                {label: 'Spain 2020', value:'Spanish Grand Prix 2020'},
                                {label: '70th Anniversary Grand Prix 2020', value:'70th Anniversary Grand Prix 2020'},
                                {label: 'Great Britain 2020', value:'British Grand Prix 2020'},
                                {label: 'Hungary 2020', value:'Hungarian Grand Prix 2020'},
                                {label: 'Styria 2020', value:'Styrian Grand Prix 2020'},
                                {label: 'Austria 2020', value:'Austrian Grand Prix 2020'}

                        ]}
                        defaultValue={this.state.race}
                        style={styles.dropdown}
                        onChangeItem={item => this.setState({
                            race: item.value
                        })}
                        />
                    </View>
*/
//Fix styling issues with header and list
const styles = StyleSheet.create({
	container:{
		flex:10,
		alignItems:'center'
	},
    dropdownContainer:{
        flex:1,
        alignItems:'center',
        marginTop: 20
    },
    dropdown:{
        padding:10,
        width: 200,
        height: 100
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
