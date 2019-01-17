import React, { Component } from 'react';
import { Text, View, Linking, TouchableOpacity, Image, WebView, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements'
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
} from 'react-navigation';
import styles from './../Styles/index'
import firebase from 'react-native-firebase';

class SongArchive extends Component {
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

class OnlineImage extends Component {
    constructor() {
        super();

        this.state = {
            textInput: '',
            loading: true,
            onlineimage: '',
        };
    };

    async componentDidMount() {
        const doc = await firebase.firestore().collection('config').doc('onlineimage').get()
        this.setState({ loading: false });
        this.setState({
            onlineimage: doc.data().ImageURL,
        });
    }

    render() {
        return <Image style={{ width: 450, height: 250 }} source={{ uri: this.state.onlineimage }} />;
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
    <Text>©Daniel Holmberg 2019</Text>
);

const Extra = ({ navigation }) => (
    <View style={{ flex: 1, flexDirection: 'column' }}>
        <SongArchive />
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
        Sångarkiv: ExtraStack,
        About: AboutStack

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