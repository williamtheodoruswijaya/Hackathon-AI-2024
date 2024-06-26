import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useUser } from "../hooks/Context";
import { postProblem, postRiwayat } from "../../utility/backend";
import FormField from "../../components/FormField";
import styles from "../config/dropdownstyle";

const data1 = [
  { label: "Masalah dengan kartu ATM", value: "ATM" },
  { label: "Masalah dengan transaksi", value: "TRANSACTION" },
  { label: "Masalah dengan rekening", value: "ACCOUNT" },
  { label: "Masalah dengan aplikasi", value: "APPLICATION" },
  { label: "Masalah dengan mobile banking", value: "MOBILE_BANKING" },
  { label: "Masalah dengan layanan nasabah", value: "CUSTOMER_SERVICE" },
  { label: "Masalah lainnya", value: "OTHER" },
];

const subdata1 = {
  ATM: [
    { label: "Kartu ATM hilang", value: "ATM1" },
    { label: "Kartu ATM rusak", value: "ATM2" },
    { label: "Kartu ATM terblokir", value: "ATM3" },
    { label: "Kartu ATM tertelan mesin ATM", value: "ATM4" },
  ],
  TRANSACTION: [
    { label: "Transaksi gagal", value: "TRANSACTION1" },
    { label: "Transaksi tertunda", value: "TRANSACTION2" },
    { label: "Kesalahan jumlah transaksi", value: "TRANSACTION3" },
  ],
  ACCOUNT: [
    { label: "Saldo tidak sesuai", value: "ACCOUNT1" },
    { label: "Rekening terblokir", value: "ACCOUNT2" },
    { label: "Kesalahan data rekening", value: "ACCOUNT3" },
  ],
};

const subdata2 = {
  ATM1: [
    { label: "Laporkan kehilangan", value: "ATM1A" },
    { label: "Blokir kartu", value: "ATM1B" },
  ],
  ATM2: [
    { label: "Ganti kartu", value: "ATM2A" },
    { label: "Perbaiki kartu", value: "ATM2B" },
  ],
  ATM3: [
    { label: "Buka blokir kartu", value: "ATM3A" },
    { label: "Permintaan kartu baru", value: "ATM3B" },
  ],
  ATM4: [
    { label: "Ambil kartu di bank", value: "ATM4A" },
    { label: "Ajukan kartu baru", value: "ATM4B" },
  ],
  TRANSACTION1: [
    { label: "Cek status transaksi", value: "TRANSACTION1A" },
    { label: "Ajukan komplain", value: "TRANSACTION1B" },
  ],
  TRANSACTION2: [
    { label: "Hubungi bank", value: "TRANSACTION2A" },
    { label: "Pantau status", value: "TRANSACTION2B" },
  ],
  TRANSACTION3: [
    { label: "Koreksi transaksi", value: "TRANSACTION3A" },
    { label: "Ajukan komplain", value: "TRANSACTION3B" },
  ],
  ACCOUNT1: [
    { label: "Cek mutasi", value: "ACCOUNT1A" },
    { label: "Hubungi customer service", value: "ACCOUNT1B" },
  ],
  ACCOUNT2: [
    { label: "Aktivasi ulang rekening", value: "ACCOUNT2A" },
    { label: "Verifikasi identitas", value: "ACCOUNT2B" },
  ],
  ACCOUNT3: [
    { label: "Perbaiki data", value: "ACCOUNT3A" },
    { label: "Hubungi customer service", value: "ACCOUNT3B" },
  ],
};

const subdata3 = {
  ATM1A: [
    { label: "Kunjungi cabang bank", value: "ATM1A1" },
    { label: "Kirim email laporan", value: "ATM1A2" },
  ],
  ATM1B: [
    { label: "Blokir melalui mobile banking", value: "ATM1B1" },
    { label: "Hubungi layanan nasabah", value: "ATM1B2" },
  ],
  ATM2A: [
    { label: "Kunjungi cabang terdekat", value: "ATM2A1" },
    { label: "Ajukan secara online", value: "ATM2A2" },
  ],
  ATM2B: [
    { label: "Hubungi teknisi", value: "ATM2B1" },
    { label: "Kunjungi cabang bank", value: "ATM2B2" },
  ],
  ATM3A: [
    { label: "Isi formulir pembukaan blokir", value: "ATM3A1" },
    { label: "Verifikasi data diri", value: "ATM3A2" },
  ],
  ATM3B: [
    { label: "Ajukan kartu baru melalui CS", value: "ATM3B1" },
    { label: "Isi formulir pengajuan kartu", value: "ATM3B2" },
  ],
  ATM4A: [
    { label: "Datang ke cabang bank", value: "ATM4A1" },
    { label: "Hubungi customer service", value: "ATM4A2" },
  ],
  ATM4B: [
    { label: "Ajukan kartu baru online", value: "ATM4B1" },
    { label: "Kunjungi cabang untuk pengajuan", value: "ATM4B2" },
  ],
  TRANSACTION1A: [
    { label: "Cek status di aplikasi", value: "TRANSACTION1A1" },
    { label: "Hubungi customer service", value: "TRANSACTION1A2" },
  ],
  TRANSACTION1B: [
    { label: "Isi formulir komplain", value: "TRANSACTION1B1" },
    { label: "Kirim email komplain", value: "TRANSACTION1B2" },
  ],
  TRANSACTION2A: [
    { label: "Hubungi layanan nasabah", value: "TRANSACTION2A1" },
    { label: "Kirim email ke bank", value: "TRANSACTION2A2" },
  ],
  TRANSACTION2B: [
    { label: "Pantau di aplikasi", value: "TRANSACTION2B1" },
    { label: "Hubungi layanan nasabah", value: "TRANSACTION2B2" },
  ],
  TRANSACTION3A: [
    { label: "Ajukan koreksi melalui aplikasi", value: "TRANSACTION3A1" },
    { label: "Hubungi customer service", value: "TRANSACTION3A2" },
  ],
  TRANSACTION3B: [
    { label: "Isi formulir komplain", value: "TRANSACTION3B1" },
    { label: "Kirim email komplain", value: "TRANSACTION3B2" },
  ],
  ACCOUNT1A: [
    { label: "Cek di aplikasi mobile banking", value: "ACCOUNT1A1" },
    { label: "Cetak mutasi di ATM", value: "ACCOUNT1A2" },
  ],
  ACCOUNT1B: [
    { label: "Hubungi layanan nasabah", value: "ACCOUNT1B1" },
    { label: "Kunjungi cabang bank", value: "ACCOUNT1B2" },
  ],
  ACCOUNT2A: [
    { label: "Aktivasi melalui aplikasi", value: "ACCOUNT2A1" },
    { label: "Kunjungi cabang terdekat", value: "ACCOUNT2A2" },
  ],
  ACCOUNT2B: [
    { label: "Verifikasi online", value: "ACCOUNT2B1" },
    { label: "Kunjungi cabang untuk verifikasi", value: "ACCOUNT2B2" },
  ],
  ACCOUNT3A: [
    { label: "Perbaiki melalui aplikasi", value: "ACCOUNT3A1" },
    { label: "Hubungi customer service", value: "ACCOUNT3A2" },
  ],
  ACCOUNT3B: [
    { label: "Hubungi customer service", value: "ACCOUNT3B1" },
    { label: "Kunjungi cabang untuk perbaikan", value: "ACCOUNT3B2" },
  ],
};

const DropdownComponent = () => {
  const [selectedValue1, setSelectedValue1] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);
  const [selectedValue4, setSelectedValue4] = useState(null);
  const [masalahLainnya, setMasalahLainnya] = useState(null);
  const [dataPribadi, setDataPribadi] = useState({
    alamat: null,
    pekerjaan: null,
    kewarganegaraan: null,
  });
  const [dataKartu, setDataKartu] = useState({
    noKartu: null,
    tanggalKadaluarsa: null,
    CVC: null,
    alamatATM: null,
  });
  const [detailMasalah, setDetailMasalah] = useState({ detailMasalah: null }); // ini nanti diisi dengan data yang diinput user
  let berkas = [];
  const [alamat, setAlamat] = useState(null);
  const { selectedBank, userData } = useUser();

  const mintaDataPribadi = () => {
    return (
      <View className="py-3 mt-4">
        <Text className="font-psemibold text-sm text-btn_primary">
          Data Pribadi
        </Text>
        <FormField
          title="Alamat Rumah"
          value={dataPribadi.alamat}
          handleChangeText={(e) =>
            setDataPribadi({ ...dataPribadi, alamat: e })
          }
          otherStyles="mt-4"
          keyboardTypes="default"
          placeholder="Alamat Lengkap"
        />
        <FormField
          title="Pekerjaan"
          value={dataPribadi.pekerjaan}
          handleChangeText={(e) =>
            setDataPribadi({ ...dataPribadi, pekerjaan: e })
          }
          otherStyles="mt-4"
          keyboardTypes="default"
          placeholder="Pekerjaan"
        />
        <FormField
          title="Kewarganegaraan"
          value={dataPribadi.kewarganegaraan}
          handleChangeText={(e) =>
            setDataPribadi({ ...dataPribadi, kewarganegaraan: e })
          }
          otherStyles="mt-4"
          keyboardTypes="default"
          placeholder="Kewarganegaraan"
        />
      </View>
    );
  };

  const mintaDataKartu = () => {
    if (selectedValue1 !== "ATM" && selectedValue1 !== "TRANSACTION") {
      return null;
    }
    return (
      <View className="py-3 mt-4">
        <Text className="font-psemibold text-sm text-btn_primary">
          Data Kartu
        </Text>
        <FormField
          title="Nomor Kartu"
          value={dataKartu.noKartu}
          handleChangeText={(e) => setDataKartu({ ...dataKartu, noKartu: e })}
          otherStyles="mt-4"
          keyboardTypes="default"
          placeholder="Nomor Kartu"
        />
        <FormField
          title="Tanggal Kadaluarsa"
          value={dataKartu.tanggalKadaluarsa}
          handleChangeText={(e) =>
            setDataKartu({ ...dataKartu, tanggalKadaluarsa: e })
          }
          otherStyles="mt-4"
          keyboardTypes="default"
          placeholder="Tanggal Kadaluarsa MM/YY"
        />
        <FormField
          title="CVC"
          value={dataKartu.CVC}
          handleChangeText={(e) => setDataKartu({ ...dataKartu, CVC: e })}
          otherStyles="mt-4"
          keyboardTypes="default"
          placeholder="CVC"
        />
        <View className="py-3 mt-4">
          <Text className="font-psemibold text-sm font text-btn_primary">
            Jika kartu ATM tertelan mesin ATM, isi informasi berikut ini:
          </Text>
          <FormField
            title="Alamat ATM"
            value={dataKartu.alamatATM}
            handleChangeText={(e) =>
              setDataKartu({ ...dataKartu, alamatATM: e })
            }
            otherStyles="mt-4"
            keyboardTypes="default"
            placeholder="Alamat mesin ATM yang menelan kartu"
          />
        </View>
      </View>
    );
  };

  const mintaDetailMasalah = () => {
    if (selectedValue1 !== "CUSTOMER_SERVICE") {
      return null;
    }
    return (
      <View className="py-3 mt-4">
        <Text className="font-psemibold text-sm text-btn_primary">
          Detail Masalah
        </Text>
        <FormField
          title="Detail Masalah"
          value={detailMasalah.detailMasalah}
          handleChangeText={(e) =>
            setDetailMasalah({ ...detailMasalah, detailMasalah: e })
          }
          otherStyles="mt-4"
          keyboardTypes="default"
          placeholder="Detail Masalah"
        />
      </View>
    );
  };

  const handleSubmit = async () => {
    // later handleSubmit ini boleh dipindahin ke page submitProblem.jsx, jangan lupa import component dan library nya
    let descriptionBuilder = data1.find(
      (obj) => obj.value === selectedValue1
    ).label;
    masalahLainnya ? (descriptionBuilder += ", " + masalahLainnya) : {};
    selectedValue2
      ? (descriptionBuilder +=
          ", " +
          subdata1[selectedValue1].find((obj) => obj.value === selectedValue2)
            .label)
      : {};
    selectedValue3
      ? (descriptionBuilder +=
          ", " +
          subdata2[selectedValue2].find((obj) => obj.value === selectedValue3)
            .label)
      : {};
    selectedValue4
      ? (descriptionBuilder +=
          ", " +
          subdata3[selectedValue3].find((obj) => obj.value === selectedValue4)
            .label)
      : {};

    dataPribadi.alamat
      ? berkas.push({ title: "Alamat Lengkap", value: dataPribadi.alamat })
      : {};
    dataPribadi.pekerjaan
      ? berkas.push({ title: "Pekerjaan", value: dataPribadi.pekerjaan })
      : {};
    dataPribadi.kewarganegaraan
      ? berkas.push({
          title: "Kewarganegaraan",
          value: dataPribadi.kewarganegaraan,
        })
      : {};
    dataKartu.noKartu
      ? berkas.push({ title: "Nomor Kartu", value: dataKartu.noKartu })
      : {};
    dataKartu.tanggalKadaluarsa
      ? berkas.push({
          title: "Tanggal Kadaluarsa",
          value: dataKartu.tanggalKadaluarsa,
        })
      : {};
    dataKartu.CVC ? berkas.push({ title: "CVC", value: dataKartu.CVC }) : {};
    dataKartu.alamatATM
      ? berkas.push({ title: "Alamat ATM", value: dataKartu.alamatATM })
      : {};
    detailMasalah.detailMasalah
      ? berkas.push({
          title: "Detail Masalah",
          value: detailMasalah.detailMasalah,
        })
      : {};

    try {
      await postProblem(
        selectedBank.bank,
        berkas,
        descriptionBuilder,
        userData.email,
        selectedBank.norek
      ); // ini nanti array kosongnya diganti dengan berkas yang dilampirkan user
      await postRiwayat(
        selectedBank.bank,
        descriptionBuilder,
        new Date(),
        userData.email
      );
      Alert.alert(
        "Sukses",
        "Berhasil mengajukan masalah. Mohon cek inbox Anda secara berkala untuk informasi lebih lanjut."
      );
    } catch (e) {
      Alert.alert("Error", "Gagal mengajukan masalah");
      console.error(e.message);
    } finally {
      router.push("/home");
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary flex-1 pt-5">
      <ScrollView className="px-4">
        <View className="items-center pt-5 pb-7">
          <Text className="font-psemibold text-xl">
            Rekening {selectedBank.bank}
          </Text>
          <Text className="font-pregular text-xl">
            {selectedBank.norek.slice(0, 3) +
              "-" +
              selectedBank.norek.slice(3, 6) +
              "-" +
              selectedBank.norek.slice(6)}
          </Text>
        </View>
        <Dropdown
          className="my-3"
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data1}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Pilih permasalahan"
          searchPlaceholder="Search..."
          value={selectedValue1}
          onChange={(item) => {
            setSelectedValue1(item.value);
            setSelectedValue2(null); // Reset the second dropdown
            setSelectedValue3(null); // Reset the third dropdown
            setSelectedValue4(null); // Reset the fourth dropdown
          }}
        />
        {selectedValue1 === "OTHER" && (
          <FormField
            title="Masalah lainnya"
            value={masalahLainnya}
            handleChangeText={(e) => setMasalahLainnya(e)}
            otherStyles="my-4"
            keyboardTypes="default"
            placeholder="Jelaskan permasalahan Anda"
          />
        )}
        {subdata1[selectedValue1] && (
          <Dropdown
            className="my-3"
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={subdata1[selectedValue1] || []}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Pilih permasalahan"
            searchPlaceholder="Search..."
            value={selectedValue2}
            onChange={(item) => {
              setSelectedValue2(item.value);
              setSelectedValue3(null); // Reset the third dropdown
              setSelectedValue4(null); // Reset the fourth dropdown
            }}
          />
        )}
        {subdata2[selectedValue2] && (
          <Dropdown
            className="my-3"
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={subdata2[selectedValue2] || []}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Pilih permasalahan"
            searchPlaceholder="Search..."
            value={selectedValue3}
            onChange={(item) => {
              setSelectedValue3(item.value);
              setSelectedValue4(null); // Reset the fourth dropdown
            }}
          />
        )}
        {subdata3[selectedValue3] && (
          <Dropdown
            className="my-3"
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={subdata3[selectedValue3] || []}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Pilih permasalahan"
            searchPlaceholder="Search..."
            value={selectedValue4}
            onChange={(item) => {
              setSelectedValue4(item.value);
            }}
          />
        )}
        {!selectedValue1 ||
        (selectedValue1 === "OTHER" && !masalahLainnya) ||
        (!selectedValue2 && subdata1[selectedValue1]) ||
        (!selectedValue3 && subdata2[selectedValue2]) ||
        (!selectedValue4 && subdata3[selectedValue3]) ? (
          <Text className="font-psemibold text-gray-700 text-sm my-5 text-center">
            Mohon lengkapi semua field yang tersedia
          </Text>
        ) : (
          <View>
            {mintaDataPribadi()}
            {mintaDataKartu()}
            {mintaDetailMasalah()}
            <CustomButton
              title="Ajukan masalah"
              handlePress={handleSubmit}
              containerStyles="bg-btn_primary my-10"
              textStyles="text-white font-pregular"
              isLoading={false}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DropdownComponent;
