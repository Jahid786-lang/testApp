/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import RootNavigation from './Navigations/rootNavigation';
const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={'#df1f26'}
        />
        <SafeAreaView style={backgroundStyle}>
          <RootNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
