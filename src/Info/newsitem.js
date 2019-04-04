import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Styles/index'

export default class Todo extends React.PureComponent {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <Text style={styles.food}>{this.props.title.replace(/\\|    |   /g,"\n\n")}{"\n"}</Text>
                <Text style={{color: 'black', margin: 5}}>{this.props.content.replace(/\\|    |   /g,"\n\n")}</Text>
            </View>
        );
    }
}