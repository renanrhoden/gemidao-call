import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Font} from 'expo';
import AnatomyExample from "./src/AnatomyExample";

export default class App extends React.Component {

    state = {
        fontLoaded: false,
    };


    async componentWillMount() {

        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });

        this.setState({ fontLoaded: true });
    }
    render() {
        if (this.state.fontLoaded) {
            return <AnatomyExample/>
        }
        else return null;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
