import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

interface TopAlertProps {
  show: boolean;
  type: 'info' | 'danger' | 'success' | 'warning' | 'dark';
  message: string;
}

const viewStyles = StyleSheet.create({
  base: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  info: {
    backgroundColor: '#EBF8FF',
  },
  danger: {
    backgroundColor: '#FFF5F5',
  },
  success: {
    backgroundColor: '#F0FFF4',
  },
  warning: {
    backgroundColor: '#FFFBEB',
  },
  dark: {
    backgroundColor: '#F9FAFB',
  },
});

const textStyles = StyleSheet.create({
  title: {
    fontWeight: '700',
    marginBottom: 4,
  },
  message: {
    fontWeight: '400',
  },
  infoText: {
    color: '#2C5282',
  },
  dangerText: {
    color: '#9B2C2C',
  },
  successText: {
    color: '#276749',
  },
  warningText: {
    color: '#744210',
  },
  darkText: {
    color: '#1F2937',
  },
});

const AlertBox = ({
  type,
  title,
  message,
}: {
  type: TopAlertProps['type'];
  title: string;
  message: string;
}) => {
  return (
    <View style={[viewStyles.base, viewStyles[type]]} accessibilityRole="alert">
      <Text style={[textStyles.title, textStyles[`${type}Text`]]}>{title}</Text>
      <Text style={[textStyles.message, textStyles[`${type}Text`]]}>
        {message}
      </Text>
    </View>
  );
};

function TopAlert({ show, type, message }: TopAlertProps) {
  const { t } = useTranslation();

  if (!show) return null;

  const titles: Record<TopAlertProps['type'], string> = {
    info: t('Information'),
    danger: t('Error'),
    success: t('Success'),
    warning: t('Warning'),
    dark: t('Notice'),
  };
  return <AlertBox type={type} title={titles[type]} message={message} />;
}

export default TopAlert;
