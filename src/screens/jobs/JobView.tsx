import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { RootStackParamList } from './../../App';
import RenderHtml from 'react-native-render-html';
import JobAboutCompany from './../..//components/Jobs/JobView/AboutCompany';
import { useTranslation } from 'react-i18next';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Lucide } from '@react-native-vector-icons/lucide';

type JobViewScreenRouteProp = RouteProp<RootStackParamList, 'JobView'>;

function JobView({ route }: { route: JobViewScreenRouteProp }) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { id } = route?.params;
  const [detail, setDetail] = useState<any>({});
  const [tab, setTab] = useState('job_detail');

  useEffect(() => {
    if (id) {
      const getJobView = async () => {
        await Axios.get(`https://api.thaiup.net/jobs/view/id/${id}`).then(
          response => {
            if (response?.data?.status === 'ok') {
              console.log('JobDetail', response?.data?.data);
              setDetail(response?.data?.data);
            }
          },
        );
      };

      getJobView();
    }
  }, [id]);

  return (
      <View
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <View
          style={{
            height: 55,
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
            flex: 0,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
              padding: 10,
              borderRadius: 5,
              width: 45,
            }}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="angle-left" size={32} color="#666" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'transparent',
              padding: 10,
              borderRadius: 5,
              flexShrink: 1,
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 18, fontFamily: 'Prompt-SemiBold' }}
            >
              {detail?.company}
            </Text>
          </View>
        </View>
        <View style={{ flexShrink: 1, flex: 1 }}>
          <ScrollView>
            <View>
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'Prompt-SemiBold',
                    color: 'red',
                  }}
                >
                  {detail?.position}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'Prompt-Regular',
                    marginTop: 5,
                  }}
                >
                  {detail?.company}
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal={true}
              style={{ backgroundColor: '#f5f5f5', flexDirection: 'row' }}
            >
              <TouchableOpacity
                onPress={() => {
                  setTab('job_detail');
                }}
                style={{
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  borderBottomWidth: 4,
                  borderBottomColor:
                    tab === 'job_detail' ? 'red' : 'transparent',
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold' }}>
                  {t('jobs_short')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTab('about_company');
                }}
                style={{
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  borderBottomWidth: 4,
                  borderBottomColor:
                    tab === 'about_company' ? 'red' : 'transparent',
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold' }}>
                  {t('about_company')}
                </Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={{ padding: 20 }}>
              {tab === 'job_detail' && (
                <View style={{ gap: 20 }}>
                  <View style={{ gap: 10 }}>
                    <View>
                      <Text
                        style={{ fontSize: 18, fontFamily: 'Prompt-SemiBold' }}
                      >
                        {t('basic_requirements')}
                      </Text>
                    </View>
                    <View
                      style={{
                        gap: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 10,
                        }}
                      >
                        <View style={{ width: 18, justifyContent: 'center' }}>
                          <IconMaterialIcons
                            name="business-center"
                            color="red"
                            size={18}
                          />
                        </View>

                        <Text style={{ fontFamily: 'Prompt-Regular' }}>
                          {detail?.education || t('not_specified')}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 10,
                        }}
                      >
                        <View style={{ width: 18, justifyContent: 'center' }}>
                          <MaterialDesignIcons
                            name="currency-thb"
                            color="red"
                            size={22}
                          />
                        </View>
                        <Text style={{ fontFamily: 'Prompt-Regular' }}>
                          {detail?.salary || t('not_specified')}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 10,
                        }}
                      >
                        <View style={{ width: 18, justifyContent: 'center' }}>
                          <Lucide name="paperclip" color="red" size={16} />
                        </View>
                        <Text style={{ fontFamily: 'Prompt-Regular' }}>
                          {detail?.type || t('not_specified')}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 10,
                        }}
                      >
                        <View style={{ width: 18, justifyContent: 'center' }}>
                          <MaterialDesignIcons
                            name="gender-male-female"
                            color="red"
                            size={20}
                          />
                        </View>
                        <Text style={{ fontFamily: 'Prompt-Regular' }}>
                          {detail?.gender || t('not_specified')}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {detail?.detail && (
                    <View style={{ gap: 10 }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: 'Prompt-SemiBold',
                          }}
                        >
                          {t('job_description')}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderRadius: 10,
                          backgroundColor: '#f5f5f5',
                          padding: 20,
                        }}
                      >
                        <RenderHtml source={{ html: detail?.detail }} />
                      </View>
                    </View>
                  )}
                  {detail?.benefits && (
                    <View style={{ gap: 10 }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: 'Prompt-SemiBold',
                          }}
                        >
                          {t('benefits')}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderRadius: 10,
                          backgroundColor: '#f5f5f5',
                          padding: 20,
                        }}
                      >
                        <RenderHtml source={{ html: detail?.benefits }} />
                      </View>
                    </View>
                  )}
                </View>
              )}

              {tab === 'about_company' && <JobAboutCompany data={detail} />}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
            flex: 0,
            paddingHorizontal: 20,
            paddingVertical: 8,
            gap: 10,
          }}
        >
          <View style={{ flex: 0, justifyContent: 'center', padding: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Prompt-Regular',
              }}
            >
              {t('interested_q')}
            </Text>
          </View>
          <View style={{ flexShrink: 1, flex: 1 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                paddingHorizontal: 40,
                paddingVertical: 15,
                borderRadius: 5,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={{
                  color: '#999999',
                  fontFamily: 'Prompt-Regular',
                  fontSize: 14,
                }}
              >
                {t('job_apply_now')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
}

export default JobView;
