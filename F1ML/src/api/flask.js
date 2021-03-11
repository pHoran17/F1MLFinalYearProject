//Configure flask
import axios from 'axios';

export default axios.create({
	baseURL: 'http://192.168.0.17:5000',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	timeout: 1000
});
