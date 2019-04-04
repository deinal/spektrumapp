import React from 'react';
import { Text, View, Image, StatusBar, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import styles from './../Styles/index';

export default class HomeScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#FF60A5"
                    barStyle="dark-content"
                />
                <Text style={styles.welcome}>
                    Spektrum
          </Text>
                <Image
                    source={require('./../../assets/spektrum-crop.gif')}
                    style={{ width: 450, height: 245 }}
                />
                <Text style={styles.instructions}>
                    Spektrum rf är en svensk­språkig ämnesförening vid Helsingfors universitets matematisk-naturvetenskapliga fakultet.
          </Text>
                <View style={styles.bottom}>
                    <Button
                        onPress={() => navigate('Pdf')}
                        title="Sångboken"
                        color="#FF60A5"
                    />
                </View>
                {/* <View style={styles.bottom}>
                    <Icon
                        name='keyboard-arrow-down'
                        color='black'
                        size={32}
                        onPress={() => navigate('Pdf')}
                    />
                </View> */}
            </View>
        );
    }
}