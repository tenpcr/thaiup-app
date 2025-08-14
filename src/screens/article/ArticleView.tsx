import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/fontawesome';
import { getArticleViewById } from '../../service/apis/article.service';
import * as helper from '../../utils/helper';
import { DateTime } from 'luxon';
import { ArticleStackParamList, RootStackParamList } from '../../type/navigation';

type ArticleStackNavigationProp = RouteProp<ArticleStackParamList, 'ArticleView'>;

function ArticleView({ route }: { route: ArticleStackNavigationProp }) {
  const { id } = route?.params;
  const [detail, setDetail] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      const getArticleDetail = async () => {
        try {
          const { data } = await getArticleViewById(id);

          if (data?.status === 'ok') {
            setDetail(data?.data);
          } else {
            console.error('Failed to fetch article detail.');
          }
        } catch (error) {
          console.error('Error fetching article detail:', error);
        } finally {
          setLoading(false);
        }
      };

      getArticleDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
          <Icon name="angle-left" size={32} color="#666" />
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
            style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold' }}
          >
            {detail?.title}
          </Text>
        </View>
      </View>
      <View style={{ flexShrink: 1 }}>
        <ScrollView>
          <View style={{ aspectRatio: 400 / 200, backgroundColor: '#f5f5f5' }}>
            {detail?.thumbnail && (
              <Image
                source={{ uri: detail?.thumbnail }}
                style={{ aspectRatio: 400 / 200, backgroundColor: '#f5f5f5' }}
              />
            )}
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 20, }}>
            <RenderHtml
              contentWidth={width}
              systemFonts={['Prompt-Medium', 'Arial', 'Times New Roman']}
              tagsStyles={{
                h1: {
                  fontSize: 22,
                  color: '#000000',
                  marginBottom: 12,
                  lineHeight: 35,
                  fontFamily: 'Prompt-Medium',
                },
              }}
              source={{
                html: `<h1>${detail?.title}</h1>`,
              }}
            />
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 10, marginBottom: 40 }}>
            <Text style={{ fontFamily: 'Prompt-Light', color: '#999999' }}>
              {detail?.date &&
                helper.getDateTime(
                  DateTime.fromISO(detail?.date).isValid
                    ? detail?.date
                    : DateTime.fromJSDate(new Date(detail?.date)).toISO(),
                  'th',
                  'long',
                )}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
            <RenderHtml
              contentWidth={width}
              tagsStyles={{
                h2: {
                  fontSize: 50,
                },
                div: {
                  fontSize: 16,
                  color: '#000000',
                  lineHeight: 25,
                },
                img: {
                  marginBottom: 30,
                  marginTop: 30,
                },
                p: {
                  marginBottom: 0,
                },
                a: {
                  color: '#ea0000',
                  textDecorationLine: 'underline',
                },
                strong: {
                  fontWeight: 'bold',
                },
                b: {
                  fontWeight: 'bold',
                },
              }}
              source={{
                html: `<div style="font-size: 16px; line-height: 2.3em;">${detail?.detail?.replace(
                  /{{AdsInContent}}/gi,
                  '',
                )}</div>`,
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ArticleView;
