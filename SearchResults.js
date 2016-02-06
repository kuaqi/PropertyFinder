// This component list the results of the API request in a list view

'use strict';

var React = require('react-native');	// include react-native module
var PropertyDetail = require('./PropertyDetail');
var { StyleSheet, Image, View, TouchableHighlight, ListView, Text, Component } = React;
var styles = StyleSheet.create({
	thumb: { width: 80, height: 80, marginRight: 10 },
	textContainer: { flex: 1 },
	separator: { height: 1, backgroundColor: '#dddddd' },
	price: { fontSize: 25, fontWeight: 'bold', color: '#48BBEC' },
	title: { fontSize: 20, color: '#656565' },
	rowContainer: { flexDirection: 'row', padding: 10 } 
}); // styles for each row

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
		var price = rowData.price_formatted.split(' ')[0];

		return (
			// arrow function used to capture the guid for the row
			<TouchableHighlight underlayColor='#dddddd' onPress={() => this.rowPressed(rowData.guid)}>
				<View>
					<View style={styles.rowContainer}>
						<Image style={styles.thumb} source={{ uri: rowData.img_url }} />
						<View style={styles.textContainer}>
							<Text style={styles.price}>£{price}</Text>
							<Text style={styles.title}numberOfLines={1}>{rowData.title}</Text>
						</View>
					</View>
					<View style={styles.separator}/>
				</View>
			</TouchableHighlight>
		);
	} // end renderRow

	render() {
		return (
			<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
		);
	} // end render

	// locates the property that was tapped by the user
	rowPressed(propertyGuid) {
		var property = this.props.listings.filter(prop => prop.guid === propertyGuid)[0];
	
		this.props.navigator.push({
			title: "Property",
			component: PropertyDetail,
			passProps: { property: property }
		});
	} // end method


} // end class

module.exports = SearchResults; // export SearchResults class to allow the use in other files
