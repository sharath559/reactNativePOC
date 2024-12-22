import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function UserDetailsScreen({ navigation }) {
  const user = navigation.getParam('user', null);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
          <Text style={styles.name}>{user.login}</Text>
          <Text style={styles.url}>{user.html_url}</Text>
        </>
      ) : (
        <Text>No User Data</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  url: {
    fontSize: 16,
    color: 'blue',
  },
});
