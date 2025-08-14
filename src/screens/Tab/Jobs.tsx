import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Axios from 'axios';

import * as Helper from '../../utils/helper';
import { useTranslation } from 'react-i18next';
import ItemJob from '../../components/Jobs/ItemJob';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { RootStackParamList } from '../../type/navigation';

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const PAGE_SIZE = 5;

function Jobs() {
  const { t } = useTranslation();
  const navigation = useNavigation<RootStackNavigationProp>();

  const [jobLists, setJobLists] = useState<any[]>([]);
  const [jobListsCount, setJobListsCount] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // const [isEndReached, setIsEndReached] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchJobs = async (page: number) => {
      setIsLoadingMore(true);
      try {
        const response = await Axios.get('https://api.thaiup.net/jobs/list', {
          params: { page, limit: PAGE_SIZE },
        });

        const newItems = response.data?.data || [];
        setJobLists(prev => [...prev, ...newItems]);

        if (newItems.length < PAGE_SIZE) {
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingMore(false);
      }
    };

    fetchJobs(page);
  }, [page]);

  useEffect(() => {
    const getJobCount = async () => {
      try {
        const response = await Axios.get(
          'https://api.thaiup.net/jobs/list/count',
        );
        if (response?.data?.status === 'ok') {
          setJobListsCount(response?.data?.count);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getJobCount();
  }, []);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <ActivityIndicator size="small" color="#0000ff" style={{ margin: 10 }} />
    );
  };

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <View
        style={{
          paddingTop: 10,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'Prompt-SemiBold',
              color: '#ea0000',
            }}
          >
            {t('jobs')}
          </Text>
        </View>
        <TouchableOpacity
          style={{ paddingVertical: 10, paddingHorizontal: 15 }}
          onPress={() => navigation.navigate('Jobs', { screen: 'JobSearch' })}
        >
          <MaterialDesignIcons name="magnify" size={30} color="red" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          borderBottomColor: '#f1f1f1',
          borderBottomWidth: 1,
          paddingHorizontal: 20,
          paddingBottom: 15,
        }}
      >
        <Text style={{ fontSize: 16, fontFamily: 'Prompt-Regular' }}>
          {`${t('found')} ${Helper.numberFormat(jobListsCount)} ${t('jobs')}`}
        </Text>
      </View>

      <FlatList
        data={jobLists}
        renderItem={({ item, index }) => (
          <ItemJob index={index} key={item?.id} item={item} />
        )}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

export default Jobs;
