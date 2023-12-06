import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet,Text,TouchableOpacity } from 'react-native';

const EditAddressModal = ({ isVisible, setIsVisible, onConfirmAddress }) => {
    const [newAddress, setNewAddress] = useState('');
  
    const handleConfirm = () => {
      onConfirmAddress(newAddress);
      setIsVisible(false);
    };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Cập nhật địa chỉ mới</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setNewAddress}
              value={newAddress}
              multiline
              numberOfLines={6}
              placeholder="Nhập địa chỉ mới..."
            />
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.touchableButton, styles.cancelButton]}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.buttonText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchableButton, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: { 
        marginHorizontal:20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: '90%', // Đảm bảo modal không chiếm toàn bộ chiều rộng
      },
      modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
      },
      textInput: {
        height: 120,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10, // Bo góc cho đường viền
        margin: 10,
        padding: 10,
        textAlignVertical: 'top',
        width: '100%', 
      },
      touchableButton: {
        borderRadius: 20, // Bo góc cho các nút
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10, // Khoảng cách giữa các nút
        elevation: 2, // Đối với Android
        minWidth: '40%', // Đảm bảo rằng nút có độ rộng tối thiểu
        alignItems: 'center', // Căn giữa nội dung của nút
      },
      cancelButton: {
        backgroundColor: 'red', // Màu nền cho nút Huỷ
      },
      confirmButton: {
        backgroundColor: 'blue', // Màu nền cho nút Xác nhận
      },
      buttonText: {
        color: 'white', // Màu chữ cho các nút
        fontWeight: 'bold',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%', // Chiếm toàn bộ chiều rộng của modalView
      },
});

export default EditAddressModal;
