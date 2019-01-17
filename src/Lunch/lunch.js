import React from 'react';
import { Text, View, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import styles from './../Styles/index';
import { parseString } from 'react-native-xml2js';

//spaghetticode incoming

export default class LunchScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    fetch('https://messi.hyyravintolat.fi/rss/fin/10')

      .then((response) => response.text())
      .then((response) => new Promise(function (resolve, reject) {
        parseString(response, function (err, result) {
          resolve(result)
        });
      }))
      .then((response) => {
        //console.warn(response.rss.channel)
        let day = new Date().getDay()
        if (day === 0) day = 7
        const data = [
          { key: 'day', title: response.rss.channel[0].item[day-1].title, food: response.rss.channel[0].item[day-1].description[0] },
        ]
        this.setState({
          isLoading: false,
          dataSourceChemicum: data,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });

      fetch('https://messi.hyyravintolat.fi/rss/fin/11')

      .then((response) => response.text())
      .then((response) => new Promise(function (resolve, reject) {
        parseString(response, function (err, result) {
          resolve(result)
        });
      }))
      .then((response) => {
        let day = new Date().getDay()
        if (day === 0) day = 7
        const data = [
          { key: 'day', title: response.rss.channel[0].item[day-1].title, food: response.rss.channel[0].item[day-1].description[0] },
        ]
        this.setState({
          isLoading: false,
          dataSourceExactum: data,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });

      fetch('https://messi.hyyravintolat.fi/rss/fin/41')

      .then((response) => response.text())
      .then((response) => new Promise(function (resolve, reject) {
        parseString(response, function (err, result) {
          resolve(result)
        });
      }))
      .then((response) => {
        let day = new Date().getDay()
        if (day === 0) day = 7
        const data = [
          { key: 'day', title: response.rss.channel[0].item[day-1].title, food: response.rss.channel[0].item[day-1].description[0] },
        ]
        this.setState({
          isLoading: false,
          dataSourceOpettaja: data,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator color="#FF60A5"/>
        </View>
      )
    }
    
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <StatusBar
          backgroundColor="#FF60A5"
          barStyle="dark-content"
        />
        <Text style={styles.food}>Chemicum</Text>
        <FlatList
          data={this.state.dataSourceChemicum}
          renderItem={({ item }) => <Text style={{color: 'black', margin: 5}} key={item.key}>{item.title}:{"\n"}{item.food.replace(/Allergeenit(.*?)\. /g,"\n")}{"\n"}</Text>}
          //keyExtractor={({ id }, index) => id}
        />

        <Text style={styles.food}>Exactum</Text>
        <FlatList
          data={this.state.dataSourceExactum}
          renderItem={({ item }) => <Text style={{color: 'black', margin: 5}} key={item.key}>{item.title}:{"\n"}{item.food.replace(/Allergeenit(.*?)\. /g,"\n")}{"\n"}</Text>}
        />

        <Text style={styles.food}>Chemicum, anställda</Text>
        <FlatList
          data={this.state.dataSourceOpettaja}
          renderItem={({ item }) => <Text style={{color: 'black', margin: 5}} key={item.key}>{item.title}:{"\n"}{item.food.replace(/Allergeenit(.*?)\. /g,"\n")}{"\n"}</Text>}
        />
      </View>
    );
  }
}