import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import { Button, RadioButton, Text, TextInput, Dialog, ActivityIndicator } from 'react-native-paper';
import { DeviceType, IDevice, DeviceService, RequestType } from '../../services/DeviceService';

function AddDeviceComponent(props: any): JSX.Element {
    const [name, setName] = React.useState('');
    const [model, setModel] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [deviceType, setDeviceType] = React.useState(DeviceType.Mobile);
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const isBtnEnabled: boolean = name.length > 0 && model.length > 0;

    const hideDialog = () => {
        setName('');
        setModel('');
        setDescription('');
        setDeviceType(DeviceType.Mobile);
        setVisible(false);
        props.navigation.goBack();
    }

    const onPressSubmit = async () => {
        setLoading(true);
        const newDevice: IDevice = {
            device: {
                name,
                model,
                description,
                type: deviceType,
                requestType: RequestType.Available,
            },
        };
        await DeviceService.addNewDevice(newDevice);
        setLoading(false);
        setVisible(true);
    }

    const CustomDialog = () => {
        return (
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                    <Text variant="bodyMedium">Device information is successfully added.</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Okay</Button>
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
                <TextInput
                    label="Name"
                    value={name}
                    maxLength={25}
                    onChangeText={text => setName(text)}
                />
                <View style={{ height: 15 }} />
                <TextInput
                    label="Model"
                    value={model}
                    maxLength={25}
                    onChangeText={text => setModel(text)}
                />
                <View style={{ height: 15 }} />
                <TextInput
                    label="Description / Other Details (Optional)"
                    value={description}
                    maxLength={100}
                    multiline={true}
                    onChangeText={text => setDescription(text)}
                />
                <View style={{ height: 15 }} />
                <RadioButton.Group
                    value={deviceType}
                    onValueChange={value => setDeviceType(value as DeviceType)}
                >
                    <Text>Please select the type of device</Text>
                    <RadioButton.Item
                        label={DeviceType.Mobile}
                        value={DeviceType.Mobile}
                        labelVariant={'bodyMedium'}
                        style={styles.radioContainer}
                        color={'green'}
                    />
                    <RadioButton.Item
                        label={DeviceType.IPad}
                        value={DeviceType.IPad}
                        labelVariant={'bodyMedium'}
                        style={styles.radioContainer}
                        color={'green'}
                    />
                    <RadioButton.Item
                        label={DeviceType.Laptop}
                        value={DeviceType.Laptop}
                        labelVariant={'bodyMedium'}
                        style={styles.radioContainer}
                        color={'green'}
                    />
                    <RadioButton.Item
                        label={DeviceType.Thermostat}
                        value={DeviceType.Thermostat}
                        labelVariant={'bodyMedium'}
                        style={styles.radioContainer}
                        color={'green'}
                    />
                </RadioButton.Group>
                <View style={{ height: 20 }} />
                <Button
                    loading={false}
                    mode="contained"
                    onPress={onPressSubmit}
                    style={styles.buttonStyle}
                    disabled={!isBtnEnabled}
                >
                    Submit
                </Button>
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
        marginTop: 15,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 0,
        paddingHorizontal: 16,
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

export default AddDeviceComponent;
