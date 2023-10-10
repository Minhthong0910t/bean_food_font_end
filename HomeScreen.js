import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, SafeAreaView, Platform, Dimensions, Animated } from 'react-native';

const HomeScreen = () => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const banners = [
    require('./Image/banner.jpg'),
    require('./Image/banner1.jpg'),
    require('./Image/banner2.jpg'),
  ];

  const bannerTranslationX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(bannerTranslationX, {
        toValue: -Dimensions.get('window').width, // Di chuyển hình ảnh sang trái ngoài khung hình
        duration: 500, // Thời gian di chuyển (milliseconds)
        useNativeDriver: false,
      }).start(() => {
        setBannerIndex((prevIndex) => (prevIndex +1) % banners.length);
        bannerTranslationX.setValue(0); // Đặt lại giá trị về 0 để hiển thị lại hình ảnh
      });
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Hủy bỏ timeout khi component unmount
  }, [bannerIndex, bannerTranslationX]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./Image/logo_bean.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Bean Food</Text>
      </View>
      <ScrollView style={styles.content}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
        />
        <View style={styles.banner}>
          <Animated.View
            style={[
              styles.bannerContainer,
              {
                transform: [{ translateX: bannerTranslationX }],
              },
            ]}
          >
            <Image
                source={banners[bannerIndex]}
                style={styles.bannerImage}
              />

          </Animated.View>
        </View>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        {/* Nội dung danh mục */}
        <Text style={styles.sectionTitle}>Danh sách nhà hàng</Text>
        {/* Nội dung danh sách nhà hàng */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 70,
    height: 50,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 8,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  banner: {
    height: 200,
    marginBottom: 16,
  },
  bannerContainer: {
    flexDirection: 'row',
  },
  bannerImage: {
    flex: 1,
    width: 200, // Loại bỏ width và height cố định
    height: 200,
    resizeMode: 'contain', // Hiển thị hình ảnh mà không bị cắt hoặc bị méo
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});

export default HomeScreen;
