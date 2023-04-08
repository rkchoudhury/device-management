import React, { useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import { Button, Text, Dialog, Card, ActivityIndicator } from 'react-native-paper';
import { DeviceService, IDevice, RequestType } from '../../services/DeviceService';

function RemoveDeviceComponent(props: any): JSX.Element {
    const [visibleDialog, setVisibleDialog] = React.useState(false);
    const [allDevices, setAllDevices] = React.useState([] as IDevice[]);
    const [loading, setLoading] = React.useState(false);

    async function fetchAllDevices() {
        const result = await DeviceService.fetchAllDevices();
        setAllDevices(result);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchAllDevices();
    }, []);

    const navigateBack = () => {
        setVisibleDialog(false);
        props.navigation.goBack();
    }

    const onPressCard = async (key: string) => {
        setLoading(true);
        await DeviceService.deleteDevice(key);
        setVisibleDialog(true);
        setLoading(false);
    }

    const DeviceCard = (param: any) => {
        const { device, key } = param.param as IDevice;
        return (
            <Card
                style={styles.cardContainerStyle}
                contentStyle={styles.cardContentStyle}
                onPress={() => onPressCard(key)}
            >
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Name: </Text>
                    {device.name}
                </Text>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Model: </Text>
                    {device.model}
                </Text>
                <View style={{ height: 5 }} />
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Type: </Text>
                    {device.type}
                </Text>
            </Card>
        );
    }

    const CustomDialog = () => {
        return (
            <Dialog visible={visibleDialog}>
                <Dialog.Content>
                    <Text variant="bodyMedium">Device information is successfully removed.</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={navigateBack}>Okay</Button>
                </Dialog.Actions>
            </Dialog>
        );
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
            <View style={styles.content}>
                <FlatList
                    keyExtractor={(item: IDevice) => `deviceID_${item.key}`}
                    data={allDevices}
                    renderItem={(item) => <DeviceCard param={item.item as IDevice} />}
                />
            </View>
            <CustomDialog />
            {loading && <Loader />}
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
    loaderContainer: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RemoveDeviceComponent;
