import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LocationModal = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      {/* Bọc nội dung modal trong KeyboardAvoidingView */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {/* Đây là nền của modal, cung cấp một nền mờ */}
        <TouchableOpacity 
          style={styles.modalBackground} 
          activeOpacity={1} 
          onPressOut={onClose}
        >
          {/* Đây là container cho nội dung, nên có một chiều cao cố định hoặc tối thiểu */}
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Chọn địa điểm</Text>
            </View>
            <View style={styles.searchSection}>
              <Icon name="search" size={24} color="grey" />
              <TextInput
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Tìm kiếm địa điểm"
                clearButtonMode="while-editing"
              />
            </View>
            {/* Các thành phần khác của modal */}
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
    height: screenHeight * 0.6, // Điều chỉnh chiều cao modal
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: 'grey',
    padding: 10
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 10,
  },
  addressText: {
    fontSize: 14,
    color: 'grey',
    marginLeft: 10,
  },
});

export default LocationModal;
