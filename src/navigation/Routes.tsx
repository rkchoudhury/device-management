import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import Dashboard from '../scenes/dashboard/DashboardComponent';
import Settings from '../scenes/settings/SettingsComponent';
import AddDevice from '../scenes/addDevice/AddDeviceComponent';
import RemoveDevice from '../scenes/removeDevice/RemoveDeviceComponent';
import { ScreenName } from './RouteScreenName';
import Login from '../scenes/authentication/Login';
import Signup from '../scenes/authentication/Signup';

const defaultOptions: NativeStackNavigationOptions = {
    headerStyle: {
        backgroundColor: '#008fbe',
    },
    headerTitleStyle: {
        color: 'white',
        fontSize: 16,
    },
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    contentStyle: {
        // backgroundColor: 'black',
    }
}

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={ScreenName.login}
            screenOptions={defaultOptions}
        >
            <Stack.Screen
                name={ScreenName.login}
                component={Login}
                options={{ 
                    headerShown: false,
                    //Can override the default styles
                    contentStyle: {
                        // backgroundColor: Color.white,
                    }
                }}
            />
            <Stack.Screen
                name={ScreenName.signUp}
                component={Signup}
                options={{
                    title: 'New Account',
                }}
            />
            <Stack.Screen
                name={ScreenName.dashboard}
                component={Dashboard}
                options={({ navigation: { navigate }, route: { params } }) => {
                    return {
                        title: ScreenName.dashboard,
                        headerRight: () => ( 
                            <IconButton
                                icon="account-settings"
                                iconColor={'white'}
                                size={20}
                                onPress={() => navigate(ScreenName.settings)}
                            />
                        ),
                        headerBackVisible: false,
                    }
                }}
            />
            <Stack.Screen
                name={ScreenName.settings}
                component={Settings}
                options={{
                    title: ScreenName.settings,
                }}
            />
            <Stack.Screen
                name={ScreenName.addDevice}
                component={AddDevice}
                options={{
                    title: ScreenName.addDevice,
                }}
            />
            <Stack.Screen
                name={ScreenName.removeDevice}
                component={RemoveDevice}
                options={{
                    title: ScreenName.removeDevice,
                }}
            />
        </Stack.Navigator>
    );
}

// const MainStack = createStackNavigator({
//     DashboardScreen: Dashboard,
//     ProfileScreen: Profile
// });

// export default createAppContainer(createSwitchNavigator({
//   LoginScreen: Login,
//   Main: MainStack
// }));

// https://stackoverflow.com/questions/58814162/prevent-user-from-going-back-to-login-screen-after-logging-in-successfully-in-re#:~:text=For%20this%20i%20would%20suggest,to%20navigate%20to%20the%20screen.