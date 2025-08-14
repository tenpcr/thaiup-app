import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import * as articleServices from './../../service/apis/article.service';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import ItemArticleList from '../Article/ItemArticleList';
import { RootStackParamList } from '../../type/navigation';

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

interface ArticleListsProps {
  limit: number;
  page: number;
  category: any;
  headerText: string;
}

interface ArticleListsParams {
  limit: number;
  page: number;
  category: any;
}

interface ArticleListsState {
  _id: string;
  id: string;
  title: string;
  thumbnail: string;
}

function ArticleLists({
  limit = 0,
  page = 0,
  headerText = 'บทความ',
  category = [],
}: ArticleListsProps) {
  const { t } = useTranslation();
  const [articleLists, setArticleLists] = useState<ArticleListsState[]>([]);
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    const getArticleList = async () => {
      const params: ArticleListsParams = {
        limit: limit,
        page: page,
        category: category,
      };

      await articleServices
        .getArticleList(params)
        .then((response: any) => {
          if (response?.data?.status === 'ok') {
            setArticleLists(response?.data?.data);
          }
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {});
    };

    getArticleList();
  }, [category, limit, page]);

  return (
    <View style={{ flexDirection: 'column', gap: 10 }}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',

          width: '100%',
          gap: 10,
          alignContent: 'center',
          borderWidth: 1,
          borderColor: 'transparent',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Prompt-SemiBold',
            }}
          >
            {headerText}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Article', {
              screen: 'ArticleAll',
              params: {
                headerText: headerText,
                category: category,
              },
            });
          }}
          style={{ flexDirection: 'row', gap: 7, alignItems: 'center' }}
        >
          <View>
            <Text style={{ fontFamily: 'Prompt-SemiBold' }}>
              {t('view_all')}
            </Text>
          </View>

          <View>
            <IconFontAwesome name="angle-right" size={20} color="#000000" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ overflow: 'visible', position: 'relative' }}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            gap: 10,
            paddingHorizontal: 20,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {articleLists?.map((item: ArticleListsState, index: number) => (
            <ItemArticleList
              key={
                `${item?._id?.toString()}_${index?.toString()}` ||
                index?.toString()
              }
              item={item}
              itemStyle={{
                width: 250,
                backgroundColor: '#ffffff',
                borderRadius: 15,
                overflow: 'hidden',
              }}
              imageStyle={{
                aspectRatio: 400 / 205,
                backgroundColor: '#f5f5f5',
              }}
              viewTitleStyle={{ paddingHorizontal: 15, paddingVertical: 15 }}
              textTitleStyle={{ fontFamily: 'Prompt-Regular', fontSize: 14 }}
              fontSize={14}
              titleLineHeight={22}
              onPress={() => {
                navigation.navigate('Article', {
                  screen: 'ArticleView',
                  params: { id: item?.id },
                });
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default ArticleLists;
