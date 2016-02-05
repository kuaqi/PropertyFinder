'use strict';

var React = require('react-native');	// include react-native module
var { StyleSheet, Image, View, TouchableHighlight, ListView, Text, Component } = React;

class SearchResults extends Component {
	constructor(props) {
		super(props);

		// supply data to the ListView via a ListView.DataSource
		var dataSource = new ListView.DataSource({ 
			rowHasChanged: (r1, r2) => r1.guid !== r2.guid}); // supply the UI for each row
		this.state = {
			dataSource: dataSource.cloneWithRows(this.props.listings)
		};
	} // end constructor

	renderRow(rowData, sectionID, rowID) {
		return (
			<TouchableHighlight underlayColor='#dddddd'>
				<View>
					<Text>{rowData.title}</Text>
				</View>
			</TouchableHighlight>
		);
	} // end renderRow

	render() {
		return (
			<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
		);
	} // end render

} // end class

module.exports = SearchResults; // export SearchResults class to allow the use in other files