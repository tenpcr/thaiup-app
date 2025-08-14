import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Lucide from '@react-native-vector-icons/lucide';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { VERSION } from '@env';
import * as Helper from '../../utils/helper';
import { language } from '../../redux/actions/appActions';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AccountProfile from '../../components/Account/AccountProfile';
import ButtonForm from '../../components/Form/Button';
import { logout } from '../../redux/actions/authActions';
import ConfirmModal from '../../components/modal/ConfirmModal';
import { RootStackParamList } from '../../type/navigation';

type AccountNavigationProp = StackNavigationProp<RootStackParamList>;

function Account() {
  const dispatch = useDispatch();
  const navigation = useNavigation<AccountNavigationProp>();
  const { t } = useTranslation();

  const appLanguage = useSelector((state: any) => state.language.result);
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated.result);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(language(lang));
    Helper.setAsyncStorage('lang', lang);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>{t('account')}</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <AccountProfile />

        <View>
          <Text style={styles.sectionTitle}>{t('settings_app')}</Text>
          <View style={styles.listRow}>
            <View style={styles.listLeft}>
              <MaterialIcons name="language" size={20} style={styles.icon} />
              <Text style={styles.listLabel}>{t('language')}</Text>
            </View>
            <View style={styles.listRight}>
              <ButtonForm
                title="ไทย"
                buttonStyle={[
                  styles.langButton,
                  appLanguage === 'th' ? styles.langButtonActive : styles.langButtonInactive,
                ]}
                textStyle={[
                  styles.langText,
                  appLanguage === 'th' ? styles.langTextActive : styles.langTextInactive,
                ]}
                onPress={() => handleChangeLanguage('th')}
              />
              <ButtonForm
                title="ENG"
                buttonStyle={[
                  styles.langButton,
                  appLanguage === 'en' ? styles.langButtonActive : styles.langButtonInactive,
                ]}
                textStyle={[
                  styles.langText,
                  appLanguage === 'en' ? styles.langTextActive : styles.langTextInactive,
                ]}
                onPress={() => handleChangeLanguage('en')}
              />
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>{t('about_thaiup')}</Text>

          <TouchableOpacity
            style={styles.listRow}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <View style={styles.listLeft}>
              <MaterialDesignIcons
                name="shield-account-variant-outline"
                size={20}
                style={styles.icon}
              />
              <Text style={styles.listLabel}>{t('privacy_policy')}</Text>
            </View>
            <View style={styles.listRight}>
              <FontAwesome name="angle-right" size={26} color="#666" />
            </View>
          </TouchableOpacity>

          <View style={styles.listRow}>
            <View style={styles.listLeft}>
              <Lucide name="info" size={20} style={styles.icon} />
              <Text style={styles.listLabel}>{t('version')}</Text>
            </View>
            <View style={styles.listRight}>
              <Text>{VERSION || 'X.X.X'}</Text>
            </View>
          </View>

          {isAuthenticated && (
            <View style={styles.logoutContainer}>
              <ButtonForm
                title={t('change_account_logout')}
                width="100%"
                buttonStyle={styles.logoutButton}
                textStyle={styles.logoutButtonText}
                onPress={() => setShowLogoutModal(true)}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title={t('logout')}
        confirmText={t('confirm')}
        cancelText={t('cancel')}
        description={t('logout_confirm_description')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Prompt-SemiBold',
    color: '#ea0000',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    fontSize: 14,
    fontFamily: 'Prompt-Regular',
    color: '#666666',
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  listRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    color: '#000',
  },
  listLabel: {
    fontSize: 16,
    fontFamily: 'Prompt-Regular',
    marginLeft: 8,
  },
  langButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 8,
  },
  langButtonActive: {
    backgroundColor: '#ffffff',
  },
  langButtonInactive: {
    backgroundColor: '#f5f5f5',
  },
  langText: {
    fontSize: 17,
    textAlign: 'center',
  },
  langTextActive: {
    color: '#ea0000',
    fontFamily: 'Prompt-SemiBold',
  },
  langTextInactive: {
    color: '#333333',
    fontFamily: 'Prompt-Regular',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  logoutButtonText: {
    color: '#333333',
    fontFamily: 'Prompt-SemiBold',
    fontSize: 17,
    textAlign: 'center',
  },
});

export default Account;
