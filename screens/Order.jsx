import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function Order() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <>
      <Appbar.Header className="rounded-b-xl">
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Order" />
      </Appbar.Header>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="flex-1 bg-gray-100 space-y-5">
        </View>
      </ScrollView>
    </>
  )
}

export default Order
