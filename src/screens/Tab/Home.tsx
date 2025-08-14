import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import ArticleLists from '../../components/Home/ArticleLists';
import ArticleHot from '../../components/Home/ArticleHot';
import ArticleListsVertical from '../../components/Home/ArticleListsVertical';

function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.sectionLayout}>
        <View>
          <Text style={styles.frameLayoutTitle}>{t('home')}</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollViewMain}>
        <View style={{ flexDirection: 'column', gap: 15, paddingVertical: 20 }}>
          <ArticleHot
            headerText={t('highlights')}
            limit={10}
            page={0}
            category={[]}
          />

          <ArticleLists
            headerText={t('technologies')}
            limit={10}
            page={0}
            category={['technology']}
          />

          <ArticleLists
            headerText={t('business')}
            limit={10}
            page={0}
            category={['business']}
          />

          <ArticleListsVertical
            headerText={t('varieties')}
            limit={5}
            page={0}
            category={['variety']}
          />

          <ArticleLists
            headerText={t('politics')}
            limit={10}
            page={0}
            category={['politic']}
          />

          <ArticleLists
            headerText={t('properties')}
            limit={10}
            page={0}
            category={['property']}
          />

          <ArticleLists
            headerText={t('foods')}
            limit={10}
            page={0}
            category={['food']}
          />

          <ArticleLists
            headerText={t('mysteries')}
            limit={10}
            page={0}
            category={['mystery']}
          />

          <ArticleLists
            headerText={t('entertain')}
            limit={10}
            page={0}
            category={['entertain']}
          />

          <ArticleLists
            headerText={t('movies')}
            limit={10}
            page={0}
            category={['movie']}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
    flex: 1,
  },
  frameLayoutTitle: {
    fontSize: 22,
    fontFamily: 'Prompt-SemiBold',
    color: '#EA0000',
  },
  sectionLayout: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  scrollViewMain: {
    flexGrow: 1,
  },
});

export default HomeScreen;
