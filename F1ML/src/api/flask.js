//Configure flask
import axios from 'axios';

export default axios.create({
	baseURL: 'https://f1ml.herokuapp.com',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	timeout: 1000
});
