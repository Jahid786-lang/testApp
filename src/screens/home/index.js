import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useQuery} from 'react-query';
import theme from '../../utils/theme';
import {fetchTrendingGifs} from '../../services/gifsServices';

import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = ({route }) => {
  // const {user} = user;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
 const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser !== null) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          console.log('No user data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to retrieve user data from AsyncStorage', error);
      }
    };

    fetchUserData();
  }, []);

  const {error, isLoading} = useQuery(
    ['trendingGifs', page],
    () => fetchTrendingGifs(page),
    {
      onSuccess: newData => {
        setData(prevData => [...prevData, ...newData]);
        setIsFetchingNextPage(false);
      },
    },
  );

  const loadMore = () => {
    if (!isFetchingNextPage) {
      setIsFetchingNextPage(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.item} key={'gif' + item.id}>
      <FastImage
        source={{uri: item.images.fixed_height.url}}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
  console.log("user>>>>>>>>>>>", typeof user )
  
  return (
    <>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          {/* Welcome, {user.firstName} {user.lastName}! */}
          Welcome, {user?.firstName || ''} {user?.lastName || ''}!
        </Text>
      </View>
      {/* {isLoading && page === 1 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.red} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={{color: theme.red}}>Error fetching data</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.id + '-' + index}
            numColumns={3}
            renderItem={renderItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              isFetchingNextPage && (
                <ActivityIndicator size="large" color={theme.red} />
              )
            }
          />
        </View>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: theme.black,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  image: {
    width: 110,
    height: 110,
  },
});

export default Home;
