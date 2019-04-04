import React from 'react';
import { View, ActivityIndicator, WebView } from 'react-native';
import firebase from 'react-native-firebase';

export default class ArchiveScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      textInput: '',
      loading: true,
      sangarkiv: '',
    };
  };

  async componentDidMount() {
    const doc = await firebase.firestore().collection('config').doc('sangarkiv').get()
    this.setState({ loading: false });
    this.setState({
      sangarkiv: doc.data().ArkivURL,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator color="#FF60A5" />
        </View>
      )
    }
    return <WebView source={{ uri: this.state.sangarkiv }} />;
  }
}