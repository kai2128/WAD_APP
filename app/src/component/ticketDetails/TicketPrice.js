import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function PriceBox(props) {
  return (
    <View style={styles.priceBox}>
      <Text
        style={[
          props.title === 'Total ticket price: '
            ? styles.priceBold2
            : {fontWeight: 'bold'},
        ]}>
        {props.title}
      </Text>
      <Text
        style={[
          props.title === 'Total ticket price: '
            ? styles.priceBold3
            : styles.priceBold,
        ]}>
        {props.price}{' '}
      </Text>
    </View>
  );
}

function Line() {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: 280,
      }}
    />
  );
}

function TicketPrice(props) {
  let price = Number(props.price);
  let sst = price * 0.06;
  let total_price = price + sst;
  return (
    <View style={styles.priceContainer}>
      <PriceBox title="Ticket Price: " price={'RM ' + price.toFixed(2)} />
      <PriceBox title="SST(6%): " price={'RM ' + sst.toFixed(2)} />
      <Line />
      <PriceBox title="Total ticket price: " price={'RM ' + total_price.toFixed(2)} />
    </View>
  );
}

const styles = StyleSheet.create({
  priceContainer: {
    marginVertical: 20,
  },
  priceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  priceBold: {
    fontWeight: 'bold',
    color: '#24CE85',
  },
  priceBold2: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  priceBold3: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#24CE85',
  },
});

export default TicketPrice;
