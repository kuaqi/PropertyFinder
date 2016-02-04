'use strict'; // used a minimified version of JS
var React = require('react-native');  // import libraries in Swift

var SearchPage = require('./SearchPage');

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 30
  },
  container: {
  	flex: 1
  }
});

class PropertyFinderApp extends React.Component {
	render() {
		return (
			<React.NavigatorIOS				// construct a navigation controller
				style={styles.container}	// applies a style
				initialRoute={{				// set the path to the component
					title: 'Property Finder',
					component: SearchPage
				}}/>
		);
	}
}


// entry point to the program application
React.AppRegistry.registerComponent('PropertyFinder', function() { return PropertyFinderApp });

