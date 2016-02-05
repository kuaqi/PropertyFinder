'use strict';

var React = require('react-native');
var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	Component
} = React;

var styles = StyleSheet.create({
	description: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#656565'
	},
	container: {
		padding: 30,
		marginTop: 65,
		alignItems: 'center'
	},
	flowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: 36,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	searchInput: {
		height: 36,
		padding: 4,
		marginRight: 5,
		flex: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48BBEC',
		borderRadius: 8,
		color: '#48BBEC'
	},
	image: {
		width: 217,
		height: 138
	}
});


function urlForQueryAndPage(key, value, pageNumber) { // free function
	var data = {
		country: 'uk',
		pretty: '1',
		encoding: 'json',
		listing_type: 'buy',
		action: 'search_listings',
		page: pageNumber
	};
	data[key] = value;

	var querystring = Object.keys(data)
		.map(key => key + '=' + encodeURIComponent(data[key]))
		.join('&');

	return 'http://api.nestoria.co.uk/api?' + querystring;
}; // end function


class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: 'london',
			isLoading: false,	// keep track of whether a query is in progress
			message: ''
		};
	} // end constructor

		onSearchTextChanged(event) {	// event handler
			// console.log('onSearchTextChanged');
			this.setState({ searchString: event.nativeEvent.text });
			// console.log(this.state.searchString);
		} // end method

		_executeQuery(query) {
			console.log(query);
			this.setState({ isLoading: true });
			fetch(query)
				.then(response => response.json())
				.then(json => this._handleResponse(json.response))
				.catch(error =>
					this.setState({
						isLoading: false,
						message: 'Error occurred: ' + error
					}));
		} // end method

		_handleResponse(response) {
			this.setState({ isLoading: false, message: '' }); // clears "isLoading"
			if (response.application_response_code.substr(0, 1) === '1') {
				console.log('Properties found: ' + response.listings.length);
				// logs the number of properties found upon successful query
				this.setState({ message: 'Properties found: ' + response.listings.length});
			} else
				this.setState({ message: 'Location not recognized; please try again.'});
		} // end method

		onSearchPressed() {
			var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
			this._executeQuery(query);	// "_" indicating this should be private
		} // end method

	render() {
		// console.log('SearchPage.render');
		var spinner = this.state.isLoading ?
			( <ActivityIndicatorIOS	// returns activity indicator
				hidden='true'
				size='large'/> ) :
			( <View/> );			// or, returns empty view

		return (
			<View style={styles.container}>
				<Text style={styles.description}>
					Search for houses to buy!
				</Text>

				<Text style={styles.description}>
					Search by place-name, postcode or search near your location.
				</Text>

				<View style={styles.flowRight}>
					<TextInput
						style={styles.searchInput}
						// value={this.state.searchString}	// sets the searchString variable
						onChange={this.onSearchTextChanged.bind(this)} // call method
						placeholder='Search via name or postcode' />

					<TouchableHighlight style={styles.button}
						underlayColor='#99d9f4'
						onPress={this.onSearchPressed.bind(this)}>
						<Text style={styles.buttonText}>Go</Text>
					</TouchableHighlight>
				</View>

				<TouchableHighlight style={styles.button}
					underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>Location</Text>
				</TouchableHighlight>
				
				<Image source={require('image!house')} style={styles.image}/>
				{spinner}
				<Text style={styles.description}>{this.state.message}</Text>
			</View>
		);
	} // end render
} // end class

module.exports = SearchPage;	// export SearchPage class to allow the use in other files

