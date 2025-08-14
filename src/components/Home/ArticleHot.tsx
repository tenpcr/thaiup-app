import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { StackNavigationProp } from '@react-navigation/stack';
import * as articleServices from './../../service/apis/article.service';
import ItemArticleList from '../Article/ItemArticleList';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
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

const { width: screenWidth } = Dimensions.get('window');

export default function ArticleHot({
  limit = 0,
  page = 0,
  headerText = 'บทความ',
  category = [],
}: ArticleListsProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { t } = useTranslation();
  const [articleLists, setArticleLists] = useState<ArticleListsState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <View style={styles.container}>
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
              params: { headerText: headerText, category: category },
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

      <Carousel
        width={screenWidth}
        data={articleLists}
        height={300}
        onSnapToItem={(index: number) => setCurrentIndex(index)}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <View style={{ paddingHorizontal: 20 }}>
            <ItemArticleList
              key={
                `${item?._id?.toString()}_${index?.toString()}` ||
                index?.toString()
              }
              item={item}
              itemStyle={{
                width: '100%',
                backgroundColor: '#ffffff',
                borderRadius: 5,
                overflow: 'hidden',
                height: '100%',
              }}
              imageStyle={{
                aspectRatio: 400 / 205,
                backgroundColor: '#f5f5f5',
              }}
              viewTitleStyle={{ paddingHorizontal: 15, paddingVertical: 15 }}
              textTitleStyle={{ fontFamily: 'Prompt-Regular' }}
              fontSize={17}
              titleLineHeight={26}
              onPress={() => {
                navigation.navigate('Article', {
                  screen: 'ArticleView',
                  params: { id: item?.id },
                });
              }}
            />
          </View>
        )}
        autoPlay
        autoPlayInterval={4500}
        loop
        scrollAnimationDuration={600}
      />

      <View style={styles.dotContainer}>
        {articleLists.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  item: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#ea0000',
    width: 20,
  },
});
