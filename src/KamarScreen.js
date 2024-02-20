import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export default function KamarScreen() {
  const [kamar, setKamar] = useState([]);

  useEffect(() => {
    read();
  }, []);

  const read = () => {
    axios
      .get("https://2dw5vdj7-5285.asse.devtunnels.ms/api/kamar")
      .then((response) => {
        const kamarData = response.data.data;
        setKamar(kamarData);
      })
      .catch((err) => console.log(err));
  };

  const formatRupiah = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Icon name="bed" size={30} color="#2196F3" style={styles.profileIcon} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>Nomor Kamar: {item.nomor_kamar}</Text>
        <Text style={styles.detailText}>Tipe Kamar: {item.tipe_kamar}</Text>
        <Text style={styles.detailText}>Harga: {formatRupiah(item.harga)}</Text>
        <Text style={styles.detailText}>
          Ketersediaan: {item.ketersediaan ? "Tersedia" : "Tidak Tersedia"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Data Kamar</Text>
      <FlatList
        data={kamar}
        keyExtractor={(item) => (item.id ? item.id.toString() : "")}
        renderItem={renderItem}
        style={{ marginTop: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileIcon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  detailText: {
    fontSize: 14,
    color: "#555",
  },
});
