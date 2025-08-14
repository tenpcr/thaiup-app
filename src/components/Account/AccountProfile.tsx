import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AccountStackParamList,
  RootStackParamList,
} from '../../type/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import ButtonForm from '../Form/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

function AccountProfile() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { t } = useTranslation();

  const isAuthenticated = useSelector(
    (state: any) => state.isAuthenticated.result,
  );
  const userProfile = useSelector((state: any) => state.userProfile.result);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 20,
      }}
    >
      <View
        style={{
          paddingBottom: 20,
          flexDirection: 'row',
          gap: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#e1e1e1',
        }}
      >
        <View style={{ width: 80, position: 'relative', overflow: 'hidden' }}>
          <Image
            source={
              userProfile?.avatar
                ? { uri: userProfile?.avatar }
                : require('./../../../assets/images/no-avatar.jpg')
            }
            style={{ width: 80, height: 80, borderRadius: 50 }}
          />
        </View>

        <View style={{ flex: 1, gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Prompt-Medium',
                fontSize: 20,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {isAuthenticated
                ? `${userProfile?.firstname} ${userProfile?.lastname}`
                : 'Guest'}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            {isAuthenticated ? (
              <ButtonForm
                title={t('edit_profile')}
                buttonStyle={{
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderWidth: 1,
                  borderColor: '#e1e1e1',
                }}
                textStyle={{
                  color: '#333333',
                  fontFamily: 'Prompt-Regular',
                  fontSize: 15,
                }}
                onPress={() => {
                  navigation.navigate('Account', { screen: 'AccountProfile' });
                }}
              />
            ) : (
              <ButtonForm
                title={t('login_register')}
                buttonStyle={{
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderWidth: 1,
                  borderColor: '#e1e1e1',
                }}
                textStyle={{
                  color: '#333333',
                  fontFamily: 'Prompt-Regular',
                  fontSize: 15,
                }}
                onPress={() => {
                  navigation.navigate('Account', { screen: 'Login' });
                }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default AccountProfile;
