import React, { Component } from 'react';
import { Text, View, Linking, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import { Icon } from 'react-native-elements'
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
} from 'react-navigation';
import styles from './../Styles/index'
import firebase from 'react-native-firebase';
import NewsItem from './newsitem';

class NewsScreen extends Component {
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

class OnlineImage extends Component {
    // constructor() {
    //     super();

    //     this.state = {
    //         textInput: '',
    //         loading: true,
    //         onlineimage: '',
    //     };
    // };

    // async componentDidMount() {
    //     const doc = await firebase.firestore().collection('config').doc('onlineimage').get()
    //     this.setState({ loading: false });
    //     this.setState({
    //         onlineimage: doc.data().ImageURL,
    //     });
    // }

    render() {
        // return <Image style={{ width: 450, height: 250 }} source={{ uri: this.state.onlineimage }} />;
        return <Image style={{ width: 450, height: 250 }} source={ require('./../../assets/spektractum-s.jpg') } />;
    }
}

const Some = ({ navigation }) => (
    <View style={styles.somecontainer}>
        <OnlineImage />

        <Text style={styles.onlinetext}>
            Spektrum finns på sociala medier och har sin egen sida samt tidning på nätet.
          </Text>

        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.facebookbutton}
            onPress={() => { Linking.openURL('https://www.facebook.com/groups/5459743428') }}
        >
            <Ionicon name="logo-facebook" size={34} color="#3b5999" />
        </TouchableOpacity>

        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.instagrambutton}
            onPress={() => { Linking.openURL('https://www.instagram.com/spektrumrf') }}
        >
            <Ionicon name="logo-instagram" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.spektrumbutton}
            onPress={() => { Linking.openURL('https://spektrum.fi') }}
        >
            <Image style={styles.spektrumimagestyle} source={require('./../../assets/spektrum.png')} />
        </TouchableOpacity>

        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.spektrakelbutton}
            onPress={() => { Linking.openURL('https://spektrum.fi/spektraklet') }}
        >
            <Ionicon name="ios-book" size={30} color="#fff" />
        </TouchableOpacity>
    </View>
);

const About = ({ navigation }) => (
    <View style={{ flex: 1, paddingTop: 10, backgroundColor: '#fbfcfb' }}>
        <Text style={{ color: 'black', margin: 5 }}>
            Written in React-Native, database powered by Firebase. {"\n"}{"\n"}
            Application source code can be found on Github, please also report to me about bugs. {"\n"}{"\n"}
            Link to repo below as well as to the Google Play developer profile. Version: 1.1 ©Daniel Holmberg 2019 
          </Text>
    
    <View style={styles.somecontainer}>
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.facebookbutton}
            onPress={() => { Linking.openURL('https://github.com/flansec/spektrumapp') }}
        >
            <Ionicon name="logo-github" size={34} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.facebookbutton}
            onPress={() => { Linking.openURL('https://play.google.com/store/apps/developer?id=flansec') }}
        >
            <Ionicon name="md-appstore" size={34} color="#000" />
        </TouchableOpacity>
    </View>
    </View>
);

const Extra = ({ navigation }) => (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fbfcfb' }}>
        <NewsScreen />
    </View>
);

const SomeStack = createStackNavigator({
    some: {
        screen: Some,
        navigationOptions: ({ navigation }) => ({
            headerRight: <Icon onPress={() => navigation.openDrawer()} name="menu" style={{ marginRight: 30 }} size={30} />,
        }),
    },
});

const AboutStack = createStackNavigator({
    about: {
        screen: About,
        navigationOptions: ({ navigation }) => ({
            headerRight: <Icon onPress={() => navigation.openDrawer()} name="menu" style={{ marginRight: 30 }} size={30} />,
        }),
    },
});

const ExtraStack = createStackNavigator({
    extra: {
        screen: Extra,
        navigationOptions: ({ navigation }) => ({
            headerRight: <Icon onPress={() => navigation.openDrawer()} name="menu" style={{ marginRight: 30 }} size={30} />,
        }),
    },
});

const DrawerComponent = createDrawerNavigator(
    {
        Online: SomeStack,
        Dikthörna: ExtraStack,
        Om: AboutStack

    }, {
        drawerPosition: 'right',
        contentOptions: {
            activeTintColor: '#FF60A5',
            inactiveTintColor: 'black',
            //activeBackgroundColor: '#1999CE',
            //inactiveBackgroundColor: '#ffffff',
        }
    }
);

const AppStack = createStackNavigator({
    Drawer: { screen: DrawerComponent },
}, {
        headerMode: 'none',
    });

const App = props => <AppStack {...props} />;
App.router = AppStack.router;

export default createSwitchNavigator({
    app: App,
});