import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SalesOverviewCard = ({title, annualAmount, dailyAmount}) => {
 return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>${annualAmount}</Text>
      <Text style={styles.subtitle}>Daily</Text>
      <Text style={styles.amount}>${dailyAmount}</Text>
    </View>
 );
};

const styles = StyleSheet.create({
 card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
 },
 title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
 },
 amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
 },
 subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
 },
});

export default SalesOverviewCard;