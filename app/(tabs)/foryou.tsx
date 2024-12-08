import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Suggested from '../suggested';
import Liked from '../liked';
import Library from '../library';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  const theme = useColorScheme() ?? 'light';
  return (
    <ThemedSafeAreaView style={styles.container}>
      <Tab.Navigator style={{
        flex: 1,
      }} screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarStyle: {
          backgroundColor: Colors[theme].background,
        }
      }}>
        <Tab.Screen name="Suggested" component={Suggested} />
        <Tab.Screen name="Liked" component={Liked} />
        <Tab.Screen name="Library" component={Library} />
      </Tab.Navigator>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  }
})