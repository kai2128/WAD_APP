import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function TicketDetails(props) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>
      </View>
      <View style={styles.value}>
        <Text style={{color: '#24CE85', fontSize: 16, fontWeight: 'bold'}}>
          {props.value}{' '}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderColor: "black",
    // borderWidth: 2,
    // height: 75,
    width: 300,
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#EAEAEA',
    margin: 10,
    padding: 7,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 3,
  },
});

export default TicketDetails;
