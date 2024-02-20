import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PengunjungScreen = () => {
  const [pengunjungData, setPengunjungData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://2dw5vdj7-5285.asse.devtunnels.ms/api/Pengunjung");
      setPengunjungData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <MaterialCommunityIcons name="account" size={40} color="#2196F3" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>Nama: {item.nama}</Text>
        <Text style={styles.detailText}>Alamat: {item.alamat}</Text>
        <Text style={styles.detailText}>Email: {item.email}</Text>
        <Text style={styles.detailText}>Telepon: {item.telepon}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pengunjungData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 16,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  detailText: {
    fontSize: 14,
    color: "#555",
  },
  textContainer: {
    flex: 1,
  },
});

export default PengunjungScreen;
