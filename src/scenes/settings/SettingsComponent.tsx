import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { BottomNavigation, List, Text } from 'react-native-paper';
import { ScreenName } from '../../navigation/RouteScreenName';
import AddDevice from '../addDevice/AddDeviceComponent';
import RemoveDevice from '../removeDevice/RemoveDeviceComponent';


function Settings(props: any): JSX.Element {

    const Item = (label: string, screenName: string) => {
        return (
            <TouchableOpacity
                style={styles.listViewStyle}
                onPress={() => props.navigation.navigate(screenName)}
            >
                <Text>{label}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {Item('Add Device', ScreenName.addDevice)}
            {Item('Remove Device', ScreenName.removeDevice)}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25,
    },
    listViewStyle: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
});

export default Settings;
