import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import ItemJob from './../../components/Jobs/ItemJob';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import debounce from 'lodash.debounce';
import * as Helper from '../../utils/helper';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 10;

function JobSearch() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [jobLists, setJobLists] = useState<any[]>([]);
  const [jobListsCount, setJobListsCount] = useState<number>(0);
  const [searchPositionText, setSearchPositionText] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [page, setPage] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const getJobLists = async (
    textSearch: string,
    type: 'default' | 'search',
    page: number,
  ) => {
    const params = {
      search: textSearch || '',
      page: page,
      limit: PAGE_SIZE,
    };

    setIsLoadingMore(true);

    try {
      const response = await Axios.get('https://api.thaiup.net/jobs/list', {
        params: params,
      });

      const newItems = response.data?.data || [];

      if (type === 'default') {
        setJobLists((prev: any) => [...prev, ...newItems]);
      } else {
        setJobLists(newItems);
        setPage(0); // รีเซ็ตหน้า
        setIsEndReached(false);
      }

      if (newItems.length < PAGE_SIZE) {
        setIsEndReached(true);
      }

      if (type === 'search') {
        setIsSearchMode(false);
      }
    } catch (error) {
      console.error('Error fetching job lists:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const getJobCount = async (textSearch: string) => {
    const params = {
      search: textSearch || '',
    };

    try {
      const response = await Axios.get(
        'https://api.thaiup.net/jobs/list/count',
        { params },
      );
      if (response?.data?.status === 'ok') {
        setJobListsCount(response?.data?.count);
      }
    } catch (error) {
      console.error('Error fetching job count:', error);
    }
  };

  const debouncedSearch = debounce((text: string) => {
    setIsSearchMode(true);
    setIsEndReached(false);
    setPage(0);
    getJobLists(text, 'search', 0);
    getJobCount(text);
  }, 800);

  useEffect(() => {
    if (!isSearchMode && page > 0) {
      getJobLists(searchPositionText, 'default', page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    debouncedSearch(searchPositionText);
    return () => debouncedSearch.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPositionText]);

  useEffect(() => {
    getJobLists('', 'default', 0);
    getJobCount('');
  }, []);

  const handleLoadMore = () => {
    if (isLoadingMore || isEndReached || isSearchMode) return;
    setPage(prev => prev + 1);
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <ActivityIndicator size="small" color="#0000ff" style={{ margin: 10 }} />
    );
  };

  return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
        }}
      >
        <View
          style={{
            height: 55,
            backgroundColor: '#ffffff',
            flexDirection: 'row',
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

          <View style={{ flexShrink: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 22, fontFamily: 'Prompt-SemiBold' }}>
              {t('search_jobs')}
            </Text>
          </View>
        </View>

        <View style={{ borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <TextInput
              autoFocus={true}
              placeholder={t('position')}
              style={{
                fontFamily: 'Prompt-Regular',
                backgroundColor: '#f5f5f5',
                height: 50,
                borderRadius: 50,
                paddingHorizontal: 20,
                paddingLeft: 50,
                paddingRight: 15,
              }}
              value={searchPositionText}
              onChangeText={setSearchPositionText}
            />
            <MaterialDesignIcons
              name="magnify"
              size={28}
              color="red"
              style={{ position: 'absolute', marginTop: 21, marginLeft: 34 }}
            />
          </View>

          <View
            style={{
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: 'Prompt-Regular' }}>
              {searchPositionText && `${t('keyword')} '${searchPositionText}' `}
              {`${t('found')} ${Helper.numberFormat(jobListsCount)} ${t(
                'jobs',
              )}`}
            </Text>
          </View>
        </View>

        <FlatList
          data={jobLists}
          renderItem={({ item, index }) => (
            <ItemJob key={item?.id || index} item={item} />
          )}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
  );
}

export default JobSearch;
