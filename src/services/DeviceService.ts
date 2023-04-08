import { firebase } from '@react-native-firebase/database';
import configData from '../config/configData.json';

export enum DeviceType {
    Mobile = 'Mobile',
    IPad = 'IPad',
    Laptop = 'Laptop',
    Thermostat = 'Thermostat',
}

export enum RequestType {
    Requested = 'Requested',
    Accept = 'Accept',
    Declined = 'Declined',
    Available = 'Available',
    Revoke = 'Revoke',
}

export interface IDeviceDetails {
    name: string;
    model?: string;
    type: DeviceType;
    description?: string;
    requestType: RequestType;
}

export interface IDevice {
    key?: string;
    device: IDeviceDetails;
}

export interface IDeviceService {
    addNewDevice(data: IDevice): Promise<void>;
    fetchAllDevices(): Promise<IDevice[]>;
    updateDeviceDetails(updatedData: IDevice): Promise<void>;
    deleteDevice(key: string): Promise<void>;
}

class DeviceServiceImp {
    private async database(): Promise<any> {
        try {
              const db = await firebase.app().database(configData.baseUrl);
              return db;
        } catch (error) {
            throw error;
        }
    }

    async addNewDevice(data: IDevice): Promise<void> {
        const db = await this.database();
        const deviceRef = db.ref('devices').push();
        const { device } = data;

        await deviceRef.set({
            device: {
                ...device,
                requestType: RequestType.Available,
            },
        });
    }

    async fetchAllDevices(): Promise<IDevice[]> {
        const db = await this.database();
        const ref = db.ref();
        const deviceRef = ref.child('devices');

        let result: IDevice[] = [];
        await deviceRef?.once('value', (snapshot: any) => {
            const value = snapshot.val();
            if (value) {
                result = Object.keys(value).map((key) => {
                    return {
                        key,
                        ...value[key]
                    }
                });
            }
        });

        return result;
    }

    async updateDeviceDetails(updatedData: IDevice): Promise<void> {
        const db = await this.database();
        const { key, device } = updatedData;

        db.ref(`/devices/${key}`).update({
            device: {
                ...device,
            },
        });
    }

    async deleteDevice(key: string): Promise<void> {
        const db = await this.database();
        db.ref(`/devices/${key}`).remove();
    }
}

export const DeviceService: IDeviceService = new DeviceServiceImp();