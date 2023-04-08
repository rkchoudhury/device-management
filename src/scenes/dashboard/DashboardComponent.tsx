import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import { ActivityIndicator, BottomNavigation, Text } from 'react-native-paper';
import { DeviceService, IDevice } from '../../services/DeviceService';
import AvaiableDevice from '../device/AvaiableDeviceComponent';
import OccupiedDevice from '../device/OccupiedDeviceComponent';
import RequestedDevice from '../device/RequestedDeviceComponent';

function Dashboard(): JSX.Element {
    const [allDevices, setAllDevices] = React.useState([] as IDevice[]);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'availableDevices', title: 'Available', focusedIcon: 'devices', unfocusedIcon: 'devices' },
        { key: 'occupiedDevices', title: 'Occupied', focusedIcon: 'laptop-off', unfocusedIcon: 'laptop-off' },
        { key: 'requestedDevices', title: 'Requested', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    ]);
    const [refreshData, setRefreshData] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const isFocused = useIsFocused();


    const renderScene = BottomNavigation.SceneMap({
        availableDevices: () => (
            <AvaiableDevice
                data={allDevices}
                refeshDeviceList={refeshDeviceList}
                setLoader={setLoader}
                loading={loading}
            />
        ),
        occupiedDevices: () => (
            <OccupiedDevice
                data={allDevices}
                refeshDeviceList={refeshDeviceList}
                setLoader={setLoader}
                loading={loading}
            />
        ),
        requestedDevices: () => (
            <RequestedDevice
                data={allDevices}
                refeshDeviceList={refeshDeviceList}
                setLoader={setLoader}
                loading={loading}
            />
        ),
    });

    async function fetchAllDevices() {
        setLoading(true);
        setTimeout(async () => {
            const result = await DeviceService.fetchAllDevices();
            setAllDevices(result);
            setLoading(false);
        })
    }

    useEffect(() => {
        isFocused && fetchAllDevices();
    }, [isFocused]);

    useEffect(() => {
        fetchAllDevices();
    }, [refreshData]);

    const refeshDeviceList = () => {
        setRefreshData(!refreshData);
    }

    const setLoader = (value: boolean) => {
        setLoading(value);
    }

    const Loader = () => {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator animating={true} color={'black'} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
            {loading && <Loader />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loaderContainer: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Dashboard;
