import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Alert, Linking } from 'react-native';

import { DateTime } from "luxon";

export const numberFormat = (number: number) => {
  try {
    return number ? Intl.NumberFormat().format(number) : 0;
  } catch (error) {
    console.error('NumberFormat', error);
  }
};

export const setAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('setAsyncStorage', error);
  }
};

export const getAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error('getAsyncStorag', error);
    return null;
  }
};

export const checkInternetStatus = async () => {
  const state = await NetInfo.fetch();
  return !!(state.isConnected && state.isInternetReachable);
};

export const compareVersions = (v1: string, v2: string): number => {
  const a = v1.split('.').map(num => parseInt(num, 10));
  const b = v2.split('.').map(num => parseInt(num, 10));
  const length = Math.max(a.length, b.length);

  for (let i = 0; i < length; i++) {
    const num1 = a[i] || 0;
    const num2 = b[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
};

 export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


export const openLink = async (url: string) => {
  if (url) {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`ไม่สามารถเปิด URL: ${url}`);
    }
  }
};

export const monthsShort: Record<string, string[]> = {
  en: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  th: [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ]
};

export const monthsFull: Record<string, string[]> = {
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  th: [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ]
};

export const getDate = (
  datetime: string | null,
  lang: string,
  type: string
) => {
  if (!datetime) return "-";

  const dt = DateTime.fromISO(datetime);

  if (lang === "th") {
    const monthIndex = dt.get("month") - 1;
    const monthName =
      type === "short"
        ? monthsShort.th[monthIndex]
        : monthsFull.th[monthIndex];
    const buddhistYear = dt
      .setLocale("th")
      .toFormat("yyyy", { outputCalendar: "buddhist" });

    return `${dt.get("day")} ${monthName} ${buddhistYear}`;
  }

  const formatMap: Record<string, string> = {
    short: "LLL d, yyyy",
    full: "LLL d. yyyy",
  };

  return dt.toFormat(formatMap[type]);
};

export const getDateTime = (datetime: any, lang = "th", type = "short"): string => {
    if (datetime !== null) {
      return `${getDate(datetime, lang, type)} ${getTime(datetime, lang)}`;
    } else {
      return "-";
    }
  };

    export const getTime = (time: any, lang: any) => {
    let hours = Number(DateTime.fromISO(time).toFormat(`HH`));
    if (lang === "en" && hours > 12) {
      hours = hours - 12;
    } else if (lang === "en" && hours === 0) {
      hours = 12;
    }
    return DateTime.fromISO(time).toFormat(
      `${hours}:mm ${lang == "en" ? "a" : lang == "th" ? "" : ""}`
    );
  };
