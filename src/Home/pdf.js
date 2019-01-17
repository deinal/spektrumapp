import React from 'react';
import { View, StatusBar } from 'react-native';
import Pdf from 'react-native-pdf';
import styles from '../Styles/index';
import firebase from 'react-native-firebase';


export default class PdfScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            textInput: '',
            loading: true,
            sangbok: '',
        };
    };

    async componentDidMount() {
        const doc = await firebase.firestore().collection('config').doc('sangbok').get()
        this.setState({
            sangbok: doc.data().SangbokURL,
        });
    }

    render() {

        const source = { uri: this.state.sangbok, cache: true };

        return (
            <View style={styles.pdfcontainer}>
                <StatusBar
                    backgroundColor="#FF60A5"
                    barStyle="dark-content"
                />

                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    style={styles.pdf} />
            </View>
        )
    }
}