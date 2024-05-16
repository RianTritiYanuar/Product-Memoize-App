/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useMemo} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';
import axios from 'axios';
import Item from './Item';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [button, setButton] = useState(1);

  const initialSkip = 0;

  useEffect(() => {
    getProducts();
  }, []);

  // Get products from API
  const getProducts = async (skip = initialSkip) => {
    setLoading(true);
    axios
      .get(
        `https://dummyjson.com/products?limit=10&skip=${skip}&select=title,thumbnail`,
      )
      .then(response => {
        if (response?.status === 200) {
          if (skip === initialSkip) {
            setProducts(response?.data);
          } else {
            setProducts({
              ...products,
              ...response?.data,
              products: [...products?.products, ...response?.data?.products],
            });
          }
        } else {
          throw 'Status code not 200';
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('[d] error', error);
        setLoading(false);
      });
  };

  // FlatList onEndReached
  const onEndReached = () => {
    if (products?.skip < products?.total && !loading) {
      getProducts(products?.skip + 10);
    }
  };

  // FlatList renderItem
  const _renderItem = ({item}) => {
    // return (
    //   <View style={styles.productContainer}>
    //     <Image
    //       source={{uri: item?.thumbnail}}
    //       style={styles.productThumbnail}
    //     />
    //     <Text numberOfLines={2} style={styles.productTitle}>
    //       {item.title}
    //     </Text>
    //   </View>
    // );
    return (
      <Item id={item?.id} title={item?.title} thumbnail={item?.thumbnail} />
    );
  };

  const processedItems = useMemo(() => _renderItem);

  // FlatList ListFooterComponent
  const _renderListFooterComponent = () => {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator style={styles.loading} />;
  };

  // Render
  console.log('render');
  return (
    <SafeAreaView>
      <Button
        title={button.toString()}
        onPress={() => {
          setButton(button + 1);
        }}
      />
      <FlatList
        numColumns={2}
        renderItem={processedItems}
        data={products?.products}
        onEndReachedThreshold={0.3}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={_renderListFooterComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    width: '50%',
    minHeight: 180,
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  productThumbnail: {width: 120, height: 120, marginBottom: 6},
  productTitle: {fontSize: 12, fontWeight: 'bold', alignSelf: 'flex-start'},
  loading: {marginVertical: 10},
});

export default App;
