import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./../../App";
import { useTranslation } from "react-i18next";


type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type ScreenName = "Home" | "JobSearch" | "CouponMain" | "PrivacyPolicy";

function GridIcon() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { t } = useTranslation();

const gridMenu: {
  label: string;
  icon: any;
  navigation: ScreenName;
}[] = [
    {
      label: t("coupons"),
      icon: require("../../assets/icons/icon_coupon.png"),
      navigation: "CouponMain" 
    },
        {
      label: t("Jobs"),
      icon: require("../../assets/icons/icon_searchjob.png"),
      navigation: "JobSearch" 
    },
  ];

  return (
    <View style={{ flexDirection: "row", gap: 18, flexWrap: "wrap" }}>
      {gridMenu.map((menuItem, indexItem) => (
        <TouchableOpacity
          key={indexItem}
          onPress={() => {
            navigation.navigate(menuItem?.navigation);
          }}
          style={{ flexBasis: "30%", marginBottom: 18, alignItems: "center" }} 
        >
          <View
            style={{
              backgroundColor: "#e61e25",
              aspectRatio: 1,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 3,
              width: "100%",
            }}
          >
            <Image
              source={menuItem?.icon}
              style={{ aspectRatio: 1, height: "50%", width: "50%" }}
            />
          </View>
          <Text style={{ textAlign: "center", fontFamily: "Prompt-Regular" }}>
            {menuItem?.label}
          </Text>
        </TouchableOpacity>
      ))}



    </View>
  );
}

export default GridIcon;
