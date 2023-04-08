import React, { useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import { ActivityIndicator, Button, Card, FAB, Portal, Provider, Text } from 'react-native-paper';
import { DeviceService, IDevice, RequestType } from '../../services/DeviceService';

function RequestedDeviceComponent(props: any): JSX.Element {
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }: { open: boolean }) => setState({ open });
    const { open } = state;

    const getRequestedDevice = () => {
        const requestedDevices = props.data.filter((deviceInfo: IDevice) => deviceInfo.device.requestType === RequestType.Requested);
        return requestedDevices;
    }

    const onPressApprove = async (selectedDevice: IDevice) => {
        props.setLoader(true);
        const { device, key } = selectedDevice;
        const updatedDevice: IDevice = {
            key,
            device: {
                name: device.name,
                description: device.description ?? '',
                type: device.type,
                model: device.model ?? '',
                requestType: RequestType.Accept,
            }
        }
        await DeviceService.updateDeviceDetails(updatedDevice);
        props.refeshDeviceList();
    }


    const onPressDeline = async (selectedDevice: IDevice) => {
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
                    <Text style={{ fontWeight: 'bold' }}>Request By: </Text>
                    Rakesh Choudhury
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button
                        loading={false}
                        mode="contained"
                        onPress={() => onPressApprove(param.param)}
                        style={styles.buttonStyle}
                        buttonColor={'green'}
                        textColor={'white'}
                    >
                        Approve
                    </Button>
                    <Button
                        loading={false}
                        mode="contained"
                        onPress={() => onPressDeline(param.param)}
                        style={styles.buttonStyle}
                        buttonColor={'red'}
                        textColor={'white'}
                    >
                        Decline
                    </Button>
                </View>

            </Card>
        );
    }

    const ListEmptyView = () => {
        if (!props.loading) {
            return (
                <View style={styles.emptyView}>
                    <Text>No device request found.</Text>
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
                data={getRequestedDevice()}
                renderItem={(item) => <DeviceCard param={item.item as IDevice} />}
                style={styles.content}
                extraData={[props]}
                ListEmptyComponent={<ListEmptyView />}
            />
            <Provider>

                {/* <Portal>

                    <FAB.Group
                        open={open}
                        visible
                        icon={open ? 'calendar-today' : 'plus'}
                        actions={[
                            {
                                icon: 'plus',
                                label: 'Add',
                                onPress: () => console.log('Pressed add')
                            },
                            {
                                icon: 'minus',
                                label: 'Remove',
                                onPress: () => console.log('Pressed star'),
                            },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
                            }
                        }}
                        // style={{ backgroundColor: 'transparent'}}
                        // fabStyle={{ backgroundColor: 'green' }}
                    />
                </Portal> */}
            </Provider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainerStyle: {
        marginVertical: 15,
    },
    cardContentStyle: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        // backgroundColor: 'black'
    },
    content: {
        marginHorizontal: 25,
    },
    buttonStyle: {
        marginTop: 15,
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
});

export default RequestedDeviceComponent;
