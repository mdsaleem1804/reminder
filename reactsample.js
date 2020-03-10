/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Text,
  Picker,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
} from 'react-native';

export default class ListThreat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listItems: [],
    };
  }
  componentDidMount() {
    return fetch('http://technicalhspt.org/test/read.php')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            listItems: responseJson,
          },
          function() {
            // In this block you can do something with new state.
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderItem({item, index}) {
    return <Text>{item.title}</Text>;
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <FlatList data={this.state.listItems} renderItem={this.renderItem} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map: {
    height: 400,
    marginTop: 20,
  },
});
