import React from "react";
import { View, Text, Button, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token) {
            try {
                const response = await axios.post(
                    "https://admin.beilcoff.shop/api/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success) {
                    await AsyncStorage.removeItem("jwtToken");
                    navigation.navigate("Login");
                } else {
                    Alert.alert("Logout failed", response.data.message);
                }
            } catch (error) {
                Alert.alert(
                    "Logout error",
                    error.response?.data?.message || "Something went wrong"
                );
            }
        } else {
            Alert.alert("No token found", "You are not logged in.");
        }
    };

    return (
        <ScrollView>
            <View className="flex-1 bg-gray-100 space-y-5">
                <View className="p-10 bg-red-600 rounded-b-3xl space-y-8">
                    <View>
                        <Text className="text-center text-3xl font-semibold text-white">
                            Beilcoff
                        </Text>
                        <Text className="text-center text-xl font-semibold text-white">
                            Welcome, Afy
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <View className="my-auto">
                            <Text className="text-center text-lg text-white font-bold">
                                Total Pendapatan
                            </Text>
                            <Text className="text-center text-lg text-white font-bold">
                                Rp.2.500.000,00
                            </Text>
                        </View>
                        <TouchableOpacity className="p-2 rounded-xl border-2 border-white my-auto">
                            <Text className="text-center text-lg text-white font-semibold my-auto">
                                Settlement
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View className="bg-white rounded-xl p-4">
                            <Text className="text-2xl font-extrabold text-black">Flit Coffe</Text>
                            <svg width="18" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 10.45C6.7896 10.45 6.10829 10.1603 5.60596 9.64454C5.10363 9.12882 4.82143 8.42935 4.82143 7.7C4.82143 6.97065 5.10363 6.27118 5.60596 5.75546C6.10829 5.23973 6.7896 4.95 7.5 4.95C8.2104 4.95 8.89171 5.23973 9.39404 5.75546C9.89637 6.27118 10.1786 6.97065 10.1786 7.7C10.1786 8.06114 10.1093 8.41873 9.97468 8.75238C9.84007 9.08603 9.64276 9.38918 9.39404 9.64454C9.14531 9.89991 8.85002 10.1025 8.52505 10.2407C8.20007 10.3789 7.85175 10.45 7.5 10.45ZM7.5 0C5.51088 0 3.60322 0.811248 2.1967 2.25528C0.790176 3.69931 0 5.65783 0 7.7C0 13.475 7.5 22 7.5 22C7.5 22 15 13.475 15 7.7C15 5.65783 14.2098 3.69931 12.8033 2.25528C11.3968 0.811248 9.48912 0 7.5 0Z" fill="black" />
</svg>
                        </View>
                    </View>
                </View>
                <View className="w-1/2 mx-auto">
                    <TouchableOpacity
                        className="p-2 bg-red-600 rounded-xl"
                        onPress={handleLogout}>
                        <Text className="text-lg text-center my-auto font-bold text-white">Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
