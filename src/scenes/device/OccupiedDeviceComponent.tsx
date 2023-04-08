import React, { useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { DeviceService, IDevice, RequestType } from '../../services/DeviceService';

function OccupiedDeviceComponent(props: any): JSX.Element {

    const getOccupiedDevice = () => {
        const occupiedDevices = props.data.filter((deviceInfo: IDevice) => deviceInfo.device.requestType === RequestType.Accept);
        return occupiedDevices;
    }

    const onPressRevoke = async (selectedDevice: IDevice) => {
        props.setLoader(true);
        const { device, key } = selectedDevice;
        const updatedDevice: IDevice = {
            key,
            device: {
                name: device.name,
                description: device.description ?? '',
                type: device.type,
                model: device.model ?? '',
                requestType: RequestType.Available,
            }
        }
        await DeviceService.updateDeviceDetails(updatedDevice);
        props.refeshDeviceList();
    }

    const DeviceCard = (param: any) => {
        const { device, key } = param.param as IDevice;
        return (
            <Card style={styles.cardContainerStyle} contentStyle={styles.cardContentStyle}>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Name: </Text>
                    {device.name}
                </Text>
                <View style={{ height: 5 }} />
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Model: </Text>
                    {device.model}
                </Text>
                <View style={{ height: 5 }} />
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Type: </Text>
                    {device.type}
                </Text>
                <View style={{ height: 5 }} />
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Assigned To: </Text>
                    Rakesh Choudhury
                </Text>
                <Button
                    loading={false}
                    mode="contained"
                    onPress={() => onPressRevoke(param.param)}
                    style={styles.buttonStyle}
                    buttonColor={'darkred'}
                >
                    Revoke
                </Button>
            </Card>
        );
    }

    const ListEmptyView = () => {
        if (!props.loading) {
            return (
                <View style={styles.emptyView}>
                    <Text>All the devices are free.</Text>
                </View>
            )
        } else {
            return null;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={(item: IDevice) => `deviceID_${item.key}`}
                data={getOccupiedDevice()}
                renderItem={(item) => <DeviceCard param={item.item as IDevice} />}
                extraData={[props]}
                ListEmptyComponent={<ListEmptyView />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 15,
    },
    container: {
        flex: 1,
        marginHorizontal: 25,
    },
    cardContainerStyle: {
        marginVertical: 15,
    },
    cardContentStyle: {
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
});

export default OccupiedDeviceComponent;
