import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from "@expo/vector-icons"

import ManageExpense from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createStackNavigator()
const BottomTabs = createBottomTabNavigator()


function ExpensesOverview(){
  return<BottomTabs.Navigator 
  screenOptions={({navigation})=>({
    headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor:"white",
    tabBarStyle :{ backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor : GlobalStyles.colors.accent500,
    headerRight:()=>
      <IconButton 
      icon="add" 
      size={35} 
      color="white" 
      onPress={()=>{
        navigation.navigate("Manage Expense")
      }}/>
    
  })}>
    <BottomTabs.Screen 
    name='RecentExpenses' 
    component={RecentExpenses}
    options={{
      title:"Recent Expenses",
      tabBarLabel:"Recent",
      tabBarIcon:({color,size})=>(
        <Ionicons name='hourglass' 
        size={size}
        color={color}/> 
      )
    }}
    />
    <BottomTabs.Screen 
    name='AllExpenses' 
    component={AllExpenses}
    options={{
      title:"All Expenses",
      tabBarLabel:"All",
      tabBarIcon:({color,size})=>(
        <Ionicons name='calendar' 
        size={size}
        color={color}/> 
      )
    }}
    />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{ backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: "white"
        }}>
          <Stack.Screen 
          name='ExpensesOverview' 
          component={ExpensesOverview}
          options={{headerShown : false}}
          />
          <Stack.Screen name='Manage Expense' component={ManageExpense} 
          options={{
            presentation:"modal"
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>

  );
}

