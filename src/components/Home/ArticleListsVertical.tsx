import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as articleServices from '../../service/apis/article.service';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import ItemArticleList from '../Article/ItemArticleList';
import ButtonForm from '../Form/Button';
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

function ArticleListsVertical({
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

          width: '100%',
        }}
      >
        <View
          style={{
            backgroundColor: '#ffffff',
            flexDirection: 'column',
            padding: 20,
            width: '100%',
            gap: 10,
            alignContent: 'center',
            borderWidth: 1,
            borderColor: 'transparent',
            justifyContent: 'space-between',
            borderRadius: 15,
          }}
        >
          <View
            style={{
              backgroundColor: '#ffffff',
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
                  fontSize: 18,
                  fontFamily: 'Prompt-SemiBold',
                }}
              >
                {headerText}
              </Text>
            </View>
          </View>
          <View
            style={{
              overflow: 'visible',
              position: 'relative',
              gap: 15,
            }}
          >
            {articleLists?.map((item: ArticleListsState, index: number) => (
              <ItemArticleList
                key={
                  `${item?._id?.toString()}_${index?.toString()}` ||
                  index?.toString()
                }
                item={item}
                itemStyle={{
                  width: '100%',
                  backgroundColor: '#ffffff',

                  overflow: 'hidden',
                  flexDirection: 'row',
                  gap: 13,
                }}
                imageLayoutStyle={{
                  aspectRatio: 1 / 1,
                  flex: 'none',
                  width: 70,
                }}
                imageStyle={{
                  width: 70,
                  height: 70,
                  aspectRatio: 1 / 1,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 15,
                }}
                viewTitleStyle={{ width: '85%' }}
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
          </View>

          <ButtonForm
            title={t('view_all')}
            buttonStyle={{
              backgroundColor: '#f5f5f5',
              paddingVertical: 12,
              paddingHorizontal: 15,
              borderRadius: 10,
              marginTop: 10,
            }}
            textStyle={{
              color: '#33333',
              fontFamily: 'Prompt-SemiBold',
              fontSize: 14,
              textAlign: 'center',
            }}
            width="100%"
            onPress={() => {
              navigation.navigate('Article', {
                screen: 'ArticleAll',
                params: {
                  headerText: headerText,
                  category: category,
                },
              });
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default ArticleListsVertical;
