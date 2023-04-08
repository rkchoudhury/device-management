import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { DeviceService, IDevice, RequestType } from '../../services/DeviceService';

function AvaiableDeviceComponent(props: any): JSX.Element {
    
    const onPressRequest = async (selectedDevice: IDevice) => {
        props.setLoader(true);
        const { device, key } = selectedDevice;
        const updatedDevice: IDevice = {
            key,
            device: {
                name: device.name,
                description: device.description ?? '',
                type: device.type,
                model: device.model ?? '',
                requestType: RequestType.Requested,
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
                <Button 
                    loading={false}
                    mode="contained"
                    onPress={() => onPressRequest(param.param)}
                    style={styles.buttonStyle}
                    disabled={device.requestType === RequestType.Requested}
                >
                    {device.requestType === RequestType.Requested ? 'Requested' : 'Request'}
                </Button>
            </Card>
        );
    }

    const getAvailableDevice = () => {
        const availableDevices = props.data.filter(
            (deviceInfo: IDevice) => [RequestType.Available, RequestType.Requested].includes(deviceInfo.device.requestType)
        );
        return availableDevices;
    }

    const ListEmptyView = () => {
        if (!props.loading) {
            return (
                <View style={styles.emptyView}>
                    <Text>No available device found.</Text>
                    <Text>All the devices are occupied.</Text>
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
                data={getAvailableDevice()}
                renderItem={(item) => <DeviceCard param={item.item as IDevice} />}
                style={styles.content}
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
    },
    content: {
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

export default AvaiableDeviceComponent;
