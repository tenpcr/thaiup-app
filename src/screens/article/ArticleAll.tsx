import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from '@react-native-vector-icons/fontawesome';
import { RootStackParamList } from './../../App';
import ItemArticleList from './../../components/Article/ItemArticleList';
import * as artcleServices from './../../service/apis/article.service';

type ScreenNavigationRouteProp = RouteProp<RootStackParamList, 'ArticleAll'>;
type ScreenStackNavigationProp = StackNavigationProp<RootStackParamList>;

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
const PAGE_SIZE = 10;

function ArticleAll({ route }: { route: ScreenNavigationRouteProp }) {
  const { headerText, category } = route.params;
  const [articleLists, setArticleLists] = useState<ArticleListsState[]>([]);
  const navigation = useNavigation<ScreenStackNavigationProp>();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log('โหลดเพิ่ม');
    const fetchJobs = async (page: number, category: string) => {
      setIsLoadingMore(true);
      const params: ArticleListsParams = {
        limit: 10,
        page: page,
        category: category,
      };

      try {
        const response = await artcleServices.getArticleList(params);

        const newItems = response.data?.data || [];
        setArticleLists(prev => [...prev, ...newItems]);

        if (newItems.length < PAGE_SIZE) {
          setIsEndReached(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingMore(false);
      }
    };

    fetchJobs(page, category);
  }, [page, category]);

  const handleLoadMore = () => {
    if (isLoadingMore || isEndReached) return;
    setPage(prev => prev + 1);
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <ActivityIndicator size={50} color="#EA0000" style={{ margin: 10 }} />
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#F5f5f5',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
      }}
    >
      <View
        style={{
          height: 55,
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'row',

          flex: 0,
        }}
      >
        <View style={{ flex: 0 }}>
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
        </View>
        <View style={{ flexShrink: 1, flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 22, fontFamily: 'Prompt-SemiBold' }}>
            {headerText}
          </Text>
        </View>
      </View>

      <FlatList
        data={articleLists}
        renderItem={({ item, index }) => (
          <ItemArticleList
            key={
              `${item?._id?.toString()}_${index?.toString()}` ||
              index?.toString()
            }
            item={item}
            onPress={() => {
              navigation.navigate('ArticleView', { id: item?.id });
            }}
            itemStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#f1f1f1',
              borderWidth: 1,
              borderRadius: 5,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              flexShrink: 0,
              shadowColor: '#e1e1e1',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.2,
              elevation: 10,
              padding: 20,
            }}
            imageStyle={{
              aspectRatio: 400 / 205,
              backgroundColor: '#f5f5f5',
            }}
            viewTitleStyle={{
              minHeight: 60,
              paddingHorizontal: 0,
              paddingVertical: 10,
            }}
            textTitleStyle={{
              fontSize: 20,
              fontFamily: 'Prompt-Regular',
              paddingHorizontal: 0,
              paddingVertical: 5,
            }}
            fontSize={17}
            titleLineHeight={30}
          />
        )}
        keyExtractor={(item, index) => item._id?.toString() || index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

export default ArticleAll;
