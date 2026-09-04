import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { BankTransferScreen } from '../screens/BankTransferScreen';
import { CashInScreen } from '../screens/CashInScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ELoadScreen } from '../screens/ELoadScreen';
import { PayBillsScreen } from '../screens/PayBillsScreen';
import { SendMoneyScreen } from '../screens/SendMoneyScreen';
import { BeneficiaryScreen } from '../screens/BeneficiaryScreen';
import { CryptoScreen } from '../screens/CryptoScreen';
import { IREMITXScreen } from '../screens/IREMITXScreen';
import { LoansScreen } from '../screens/LoansScreen';
import { SaveScreen } from '../screens/SaveScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { ActivitiesScreen } from '../screens/ActivitiesScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

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
        <Stack.Screen name="Crypto" component={CryptoScreen} />
        <Stack.Screen name="Loans" component={LoansScreen} />
        <Stack.Screen name="IREMITX" component={IREMITXScreen} />
        <Stack.Screen name="Save" component={SaveScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Beneficiary" component={BeneficiaryScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Activities" component={ActivitiesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
