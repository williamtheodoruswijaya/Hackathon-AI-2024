import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import useAuth from "./hooks/useAuth";


export default function App() {
  const {user} = useAuth();
  if (user) {
    router.push("/home");
  }
  else {
    return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center min-h-[100vh] px-4">
            <View>
              <Image
                source={images.logo}
                className="w-[226.09px] h-[223px]"
                resizeMode="contain"
              />
            </View>
            <View className="relative mt-5">
              <Text className="text-3xl text-black font-bold text-center">
                Hello
              </Text>
              <Text className="font-pmedium text-1xl text-gray text-center">
                Welcome to BAITS, where Banking made simpler for everyone
              </Text>
            </View>
            <CustomButton
              title="Login"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7 bg-btn_primary"
              textStyles="text-white"
            />
            <CustomButton
              title="Register"
              handlePress={() => router.push("/sign-up")}
              containerStyles="w-full mt-7 bg-btn_secondary"
              textStyles="text-black"
            />
          </View>
        </ScrollView>
        <StatusBar />
        <View className="flex-1 items-center justify-center"></View>
      </SafeAreaView>
    );
  }
}
