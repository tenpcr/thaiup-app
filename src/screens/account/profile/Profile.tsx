import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import MenuModal from '../../../components/modal/MenuModal';
import * as authService from '../../../service/apis/auth.service';
import { getAuthUserProfile } from '../../../redux/actions/authActions';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountStackParamList } from '../../../type/navigation';

type NavigationProp = StackNavigationProp<AccountStackParamList>;

function AccountProfile() {
  const navigation = useNavigation();
  const accountNavigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userProfile = useSelector((state: any) => state?.userProfile?.result);
  const [showMenuAvatar, setShowMenuAvatar] = useState(false);

  const updateAvatar = async (image: any) => {
    try {
      const file = {
        uri: image.path,
        type: image.mime,
        name: image.filename || 'avatar.jpg',
      };

      const response = await authService.uploadProfileAvatar(file, (percent: number) => {
        console.log(`Upload Progress: ${percent}%`);
      });

      if (response?.status === 200) {
        dispatch(getAuthUserProfile());
      }
    } catch (err) {
      console.log('Upload failed:', err);
    }
  };

  const takePhoto = () => {
    ImagePicker.openCamera({ width: 400, height: 400, cropping: true }).then(updateAvatar);
  };

  const chooseFromGallery = () => {
    ImagePicker.openPicker({ width: 400, height: 400, cropping: true }).then(updateAvatar);
  };

  const removeAvatar = async () => {
    try {
      const result = await authService.updateProfileAvatar({ avatar: null });
      if (result?.status === 200) {
        dispatch(getAuthUserProfile());
      }
    } catch (err) {
      console.error('Remove avatar failed:', err);
    }
  };

  const ProfileItem = ({
    label,
    value,
    onPress,
  }: {
    label: string;
    value: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.profileItem} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.valueText}>{value}</Text>
        {onPress && <Icon name="angle-right" size={25} color="#999" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Icon name="angle-left" size={32} color="#666" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            Profile
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.avatarButton} onPress={() => setShowMenuAvatar(true)}>
            <Image
              source={
                userProfile?.avatar
                  ? { uri: userProfile.avatar }
                  : require('../../../../assets/images/no-avatar.jpg')
              }
              style={styles.avatarImage}
            />
            <View style={styles.cameraIcon}>
              <MaterialDesignIcons name="camera" color="#fff" size={16} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <ProfileItem
            label={t('firstname')}
            value={userProfile?.firstname}
            onPress={() =>
              accountNavigation.navigate('ProfileFirstnameEdit', {
                firstname: userProfile?.firstname,
              })
            }
          />
          <ProfileItem
            label={t('lastname')}
            value={userProfile?.lastname}
            onPress={() =>
              accountNavigation.navigate('ProfileLastnameEdit', {
                lastname: userProfile?.lastname,
              })
            }
          />
          <ProfileItem label={t('email')} value={userProfile?.email} />
        </View>
      </ScrollView>

      <MenuModal
        show={showMenuAvatar}
        menuItems={[t('open_camera'), t('select_photo'), t('delete_profile_cover')]}
        onMenuPress={[takePhoto, chooseFromGallery, removeAvatar]}
        onClose={() => setShowMenuAvatar(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 45,
  },
  titleContainer: {
    justifyContent: 'center',
    padding: 10,
    flexShrink: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Prompt-SemiBold',
  },
  scrollContent: {
    padding: 20,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fceff0',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  avatarButton: {
    position: 'relative',
    backgroundColor: '#e1e1e1',
    borderRadius: 50,
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: '#fff',
    elevation: 5,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  profileSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    paddingVertical: 10,
  },
  profileItem: {
    paddingVertical: 10,
    gap: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Prompt-Regular',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  valueText: {
    fontSize: 17,
    flex: 1,
    fontFamily: 'Prompt-Regular',
  },
});

export default AccountProfile;
