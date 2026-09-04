import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { BankTransferScreen } from '../screens/BankTransferScreen';
import { CashInScreen } from '../screens/CashInScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ELoadScreen } from '../screens/ELoadScreen';
import { PayBillsScreen } from '../screens/PayBillsScreen';
import { SendMoneyScreen } from '../screens/SendMoneyScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
        <Stack.Screen name="CashIn" component={CashInScreen} />
        <Stack.Screen name="BankTransfer" component={BankTransferScreen} />
        <Stack.Screen name="PayBills" component={PayBillsScreen} />
        <Stack.Screen name="ELoad" component={ELoadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
