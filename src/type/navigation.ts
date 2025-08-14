import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Account: NavigatorScreenParams<AccountStackParamList>;
  Jobs: NavigatorScreenParams<JobsStackParamList>;
  Article: NavigatorScreenParams<ArticleStackParamList>;
  PrivacyPolicy: undefined;
};

export type AccountStackParamList = {
  Login: undefined;
  AccountProfile: undefined;
  ProfileFirstnameEdit?: { firstname: string };
  ProfileLastnameEdit?: { lastname: string };
};

export type JobsStackParamList = {
  JobView: { id: string };
  JobSearch: undefined;
};

export type ArticleStackParamList = {
  ArticleAll: { headerText: string; category: any };
  ArticleView: { id: string };
};
