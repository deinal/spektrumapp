import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import NewsItem from './newsitem';

export default class NewsScreen extends React.Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('news');
    this.unsubscribe = null;

    this.state = {
      textInput: '',
      loading: true,
      news: [],
    };
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const news = [];
    querySnapshot.forEach((doc) => {
      const { title, content } = doc.data();
      news.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        content,
      });
    });
    this.setState({
      news,
      loading: false,
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
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.news}
          renderItem={({ item }) => <NewsItem {...item} />}
        />
      </View>
    );
  }
}