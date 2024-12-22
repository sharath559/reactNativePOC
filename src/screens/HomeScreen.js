import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchUsers = async (searchQuery, pageNum) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchQuery}&page=${pageNum}&per_page=20`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (pageNum === 1) {
        setUsers(data.items);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...data.items]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(() => {
    if (!query.trim()) {
      Alert.alert('Invalid Search', 'Please enter a valid search term.');
      return;
    }
    setPage(1);
    fetchUsers(query, 1);
  }, [query]);

  const loadMoreUsers = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(query, nextPage);
  };

  const openUserDetails = (user) => {
    navigation.navigate('UserDetails', { user });
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search GitHub Users"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <Button title="Search" onPress={handleSearch} />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openUserDetails(item)}>
            <Text style={styles.userItem}>{item.login}</Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  userItem: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
});
