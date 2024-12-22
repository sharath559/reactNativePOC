import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function UserList({ user }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{user.login}</Text>
        <Text style={styles.link}>{user.html_url}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 14,
    color: 'blue',
  },
});
