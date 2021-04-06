//Author: Patrick Horan 2021
//Code for Results Screen. This screen retrieves a specified set of race results ot be displayed.
//The user can choose which race to view the results for from a list of every F1 race from 1950-2020

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
	
	//Constructor called in order to create a state variables for this class, they are used to store data from queries and to render data
    constructor(props)
	{
		super(props);

		this.state =
		{
			resultData: [],
            pickerList: [],
            race: "Abu Dhabi Grand Prix 2020",
			isloading: true
		};
	}

	async componentDidMount()
	{
		//Requests to Flask backend are initialised here.
        //Urls link to specific part of the backend in order to retrieve a list of every race and the results of a specific race respectively	
            const url1 = 'https://f1ml.herokuapp.com/res';
			const url2 = 'https://f1ml.herokuapp.com/raceList';
            //Header objects for each axios request, header information included to prevent request rejections from the Flask backend
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
            
            //Irrelevant code from attempts at using firebase for this screen
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
			
            //Failed attempt at using axios for retrieveing list of races
            /*axios.get(url2).then(response => {
                //pickerItems = response.data;
                //console.log(rList);
                console.log(response.data);
            }).catch(function(error){
                console.log(error);
            });*/


            //Axios request for retrieving race results from Flask server
            axios.post(url1, pRequest).then(response => {
                //setInitResults is called with race results passed as a parameter
                //This data along will be assigned to the class' state in the function
                this.setInitResults(response.data.data);
            }).catch(function(error){
                alert("Failed to connect:" + error);
            });

			
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
    //Function that sets the initial race results shown along with retrieving the list of all F1 races
    //Both JSON objects are assigned to state variables to be utilised in the render method
    async setInitResults(data){
        //const races = [];
        const url2 = 'https://f1ml.herokuapp.com/raceList';
        const listRequest = {
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            responseType: 'json',
            url: url2
        };
        //Code for Get request for retrieving list of races from Flask server, data for race results and list of races is assigned to state here
        await axios.get(url2, listRequest).then(response => {
            //console.log(response.data);
            const races = response.data.data;
            this.setState({resultData: data, pickerList: races});
            //console.log(rList);
        }).catch(function(error){
            alert("Failed to connect:" + error);
        });
        //console.log(races);
        
        //console.log(this.state.pickerList);
    }
    //Function that was intended to set the resultData variable of state, changeRace() used instead
    //A post request is used to request the results of the chosen race and return them to the client as a JSON object
    async setResults(data){
        const url1 = 'https://f1ml.herokuapp.com/res';
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
            alert("Failed to connect to server:" + error);
        });
    }
    //Function for changing the race results when user chooses a new race from the dropdown list.
    //A post request is called in this method with the chosen race passed as a parameter in the raceRequest object. 
    async changeRace(data){
        const crUrl = 'https://f1ml.herokuapp.com/res';
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
        //Post request for retrieving race results, race and resultData state variables are set once the Post request returns a response
        await axios.post(crUrl, raceRequest).then(response => {

            this.setState({race: data, resultData: response.data.data});
            
        }).catch(function(error){
             alert("Failed to connect to server:" + error);
        });
        
    }
	render()
	{
		//If statement used to prevent errors when retrieving data from backend, only renders the full screen's contents when race results have been returned
        if(this.state.resultData.length !== 0){
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
                    <Text style={styles.raceTitle}>{this.state.race} Race Results</Text>
								<View style={styles.listHead}>
									<Text style={styles.listHeadText}>Pos</Text>
									<Text style={styles.listHeadText}>Driver</Text>
									<Text style={styles.listHeadConstruct}>Constructor</Text>
									<Text style={styles.listHeadText}>Time</Text>
								</View>
					<FlatList 
							data={this.state.resultData}
							keyExtractor={(item,index) => item.index.toString()}
							renderItem={({item, index}) => (
								<ListItem>
									<ListItem.Content>
                                        <View style={styles.resultListContent}>
                                                <ListItem.Title style={styles.resultTitle}>{item.positionText}</ListItem.Title>
                                                    <Text style={styles.driver}>{item.driver}</Text>
                                                    <Text style={styles.constructor}>{item.constructor}</Text>
                                                    <Text style={styles.time}>{item.time_x}</Text>
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
			//Renders this code when waiting on a responce from the backend
            //Header and navButtons elements are included to maintain consistent layout and functionality
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

//Stylesheet for Prediction screen
const styles = StyleSheet.create({
	container:{
		flex:10,
		alignItems:'center'
	},
    dropdownContainer:{
        flex:1,
        alignItems:'flex-start',
        marginTop: 10
    },
    dropdown:{
        padding:10,
        marginLeft:30,
        width: 300,
        height: 80
    },
	header:{
		flex:2
	},
	resultsList:{
		flex:7,
		
	},
    listHead:{
        flexDirection:'row',
        padding: 10
    },
    raceTitle:{
        alignItems:'center',
        paddingTop:10,
        marginLeft:80
    },
    listHeadText:{
        marginLeft:10,
		paddingTop:5,
		paddingRight:10,
        marginRight: 15
    },
    listHeadConstructor:{
        paddingTop:10,
        marginTop:10,
        marginLeft:10,
        marginRight:15,
        paddingRight:10
    },
    resultTitle:{
        alignItems:'center',
		fontWeight:'bold',
		paddingRight: 5,
		paddingTop: 5
    },
    driver:{
        marginLeft:10,
        paddingTop:5
    },
    constructor:{
		alignItems:'center',
		paddingTop: 5,
		marginLeft: 15,
		paddingRight: 10
	},
	points:{
		alignItems:'center',
		paddingTop: 5,
		marginLeft: 10,
		paddingRight: 15
	},
	time:{
		alignItems:'center',
		paddingTop: 5,
		marginLeft: 15
	},
    resultListContent:{
        flexDirection: 'row',
		alignItems: 'center'
    },
	buttons:{
		flex:1,
		bottom:0,
		position:'relative',
		marginBottom:10,
        backgroundColor:'#ed1005'
	}
});
