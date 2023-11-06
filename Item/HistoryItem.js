import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HistoryItem = ({product, quantity}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>15 Oct, 12:32</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.subtitle}>Tài xế đã giao món ngon</Text>
        </View>
        <Text style={styles.price}>{product.price}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}> {quantity}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đặt lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    color: 'grey',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    color: 'green',
  },
  price: {
    fontSize: 16,
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default HistoryItem;
