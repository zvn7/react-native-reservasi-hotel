import React, { useState, useEffect } from 'react';
import { BackHandler, SafeAreaView, StyleSheet, Text, View, SectionList } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const ReservasiScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();

    // Handle back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      backHandler.remove();
    };
  }, [isFocused]);

  const handleBackButton = () => {
    return true;
  };

  const fetchReservations = () => {
    axios
      .get('https://2dw5vdj7-5285.asse.devtunnels.ms/api/Reservasi')
      .then((response) => {
        const sortedReservations = response.data.data.sort((a, b) =>
          a.tanggal_checkin.localeCompare(b.tanggal_checkin),
        );
        setReservations(sortedReservations);
      })
      .catch((err) => console.log(err));
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Pengecekan status login
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        // Token tidak ditemukan, arahkan pengguna ke layar login
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [isFocused]);

  const renderReservationItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text style={[styles.dateText, { color: '#4CAF50' }]}>
        <Icon name="calendar-alt" size={16} color="#4CAF50" /> Check-in: {new Date(item.tanggal_checkin).toLocaleDateString()}
      </Text>
      <Text style={[styles.dateText, { color: '#4CAF50' }]}>
        <Icon name="calendar-alt" size={16} color="#4CAF50" /> Check-out: {new Date(item.tanggal_checkout).toLocaleDateString()}
      </Text>
      <Text style={[styles.infoText, { color: '#555' }]}>
        Nama Karyawan: {item.nama_lengkap}
      </Text>
      <Text style={[styles.infoText, { color: '#555' }]}>
        Nama Pengunjung: {item.nama}
      </Text>
      <Text style={[styles.infoText, { color: '#555' }]}>
        Nomor Kamar: {item.nomor_kamar}
      </Text>
      <Text style={[styles.infoText, { color: '#555' }]}>
        Lama Hari: {item.lama_hari} Hari
      </Text>
      <Text style={[styles.infoText, { color: '#555' }]}>
        Total Harga: {formatRupiah(item.total_harga)}
      </Text>
      <Text
        style={[
          styles.statusText,
          { color: item.status_pembayaran === 1 ? '#4CAF50' : '#F44336' },
        ]}
      >
        <Icon
          name="check-circle"
          size={16}
          color={item.status_pembayaran === 1 ? '#4CAF50' : '#F44336'}
        /> Status: {item.status_pembayaran === 1 ? 'Lunas' : 'Belum Lunas'}
      </Text>
    </View>
  );
  

  const generateSectionData = (reservations) => {
    const sectionData = [];
    const sections = {};

    reservations.forEach((reservation) => {
      const formattedDate = new Date(reservation.tanggal_checkin).toLocaleDateString();
      if (!sections[formattedDate]) {
        sections[formattedDate] = [];
      }
      sections[formattedDate].push(reservation);
    });

    Object.keys(sections).forEach((key, index) => {
      sectionData.push({
        index,
        title: key,
        data: sections[key],
      });
    });

    return sectionData;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Reservation List</Text>

      <SectionList
        sections={generateSectionData(reservations)}
        renderItem={renderReservationItem}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    color: '#FFF',
  },
  reservationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    marginBottom: 8,
  },
  statusText: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    marginTop: 10,
    backgroundColor: '#2196F3',
    color: '#FFF',
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default ReservasiScreen;