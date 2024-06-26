import { View, Text, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import { db, collection, addDoc } from '../config/firebase';
import { getDoc, getFirestore } from "firebase/firestore";
import {doc, setDoc} from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";
import { bankData, useUser } from "../hooks/Context";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../config/dropdownstyle";

const SignUp = () => {
  const { bankData } = useUser();
  const [bankValue, setBankValue] = useState(null);
  
  const [form, setForm] = useState({
    nik: "",
    namaLengkap: "",
    noTelp: "",
    email: "",
    namabank: "",
    noRekening: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (
      form.nik === "" ||
      form.namaLengkap === "" ||
      form.noTelp === "" ||
      form.email === "" ||
      form.password === "" ||
      !bankValue ||
      form.noRekening === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Error", "Please fill in all the fields");
    } else if (form.password !== confirmPassword) {
      Alert.alert("Error", "Password does not match");
    } else {
      try {
          setIsSubmitting(true);
          const docRef = await setDoc(doc(db, "users", form.email),{
            nik: form.nik,
            namaLengkap: form.namaLengkap,
            noTelp: form.noTelp,
            email: form.email,
            inbox: [],
            password: form.password,
            rekening: [{namabank : bankValue.name, norek: form.noRekening, logo: bankValue.logo }], // at least 1 rekening didaftarkan saat registrasi
            riwayat: [],
          });
          Alert.alert("Sukses", "Akun Anda berhasil didaftarkan");
          router.push("/sign-in");
      }
      catch(e){
        console.error("Error adding document: ", e);
      }
      finally{
        setIsSubmitting(false);
      }
    }
  };
  const handleSubmit = async () => {
    if (form.email !== "" && form.password !== "") {
      try {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        submit();
      } catch (err) {
        Alert.alert("Error", err.message);
        console.log(err.message);
      }
    }
  }
  return (
    <View className="flex-1">
      <StatusBar />
      <Image
        source={images.registerImage}
        className="w-full h-[25vh] justify-end flex flex-end align-top bg-thirdary"
        resizeMode="contain"
      />
      <View className="h-full bg-beige flex-1">
        <ScrollView className="bg-primary h-full rounded-t-[40px] pt-3 w-full px-4 flex-1">
          <FormField
            title="NIK"
            value={form.nik}
            handleChangeText={(e) => setForm({ ...form, nik: e })}
            otherStyles="mt-7"
            placeholder="NIK"
          />
          <FormField
            title="Nama Lengkap"
            value={form.namaLengkap}
            handleChangeText={(e) => setForm({ ...form, namaLengkap: e })}
            otherStyles="mt-7"
            placeholder="Nama Lengkap"
          />
          <FormField
            title="Nomer Telepon"
            value={form.noTelp}
            handleChangeText={(e) => setForm({ ...form, noTelp: e })}
            otherStyles="mt-7"
            placeholder="Nomer Telepon"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="my-7"
            placeholder="Email"
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={bankData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Pilih bank"
            searchPlaceholder="Search..."
            value={bankData}
            onChange={item => {
              setBankValue({name: item.value.name, logo: item.value.logo});
            }}
          />
          <FormField
            title="No Rekening"
            value={form.noRekening}
            handleChangeText={(e) => setForm({ ...form, noRekening: e })}
            otherStyles="mt-7"
            placeholder="No Rekening"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder="Password"
            otherStyles="mt-7"
          />
          <FormField
            title="Password"
            value={confirmPassword}
            handleChangeText={(e) => setConfirmPassword(e)}
            placeholder="Konfirmasi Password"
            otherStyles="mt-7"
          />
          <CustomButton
            title="Daftar"
            handlePress={handleSubmit}
            containerStyles="w-full mt-7 bg-btn_primary"
            textStyles="text-white"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2 mb-10">
            <Text className="text-[14px] text-black font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-[14px] font-psemibold text-btn_primary"
            >
              Login here
            </Link>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUp;
