import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator,StyleSheet} from 'react-native';

const RefreshButton = ({onPress, isLoading,disabled}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={styles.refreshBtn}>
    {isLoading ? (
      <ActivityIndicator size="large" color="white" />
    ) : (
      <Text style={styles.refreshText}>Refresh</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  refreshBtn: {
    position: 'absolute',
    bottom: 70,
    right: 50,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 15,
  },
  refreshText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RefreshButton