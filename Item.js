import React, {memo} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';

const Item = ({id, thumbnail, title}) => {
  console.log('item', id);
  return (
    <View style={styles.productContainer}>
      <Image source={{uri: thumbnail}} style={styles.productThumbnail} />
      <Text numberOfLines={2} style={styles.productTitle}>
        {title}
      </Text>
    </View>
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
});

export default memo(Item);
