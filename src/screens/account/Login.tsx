import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import LoginTab from "../../components/Account/LoginTab/Login";
import RegisterTab from "../../components/Account/LoginTab/Register";
import ButtonForm from "../../components/Form/Button";

const TAB_LOGIN = "login";
const TAB_REGISTER = "register";

function Login() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>(TAB_LOGIN);
  const handleBackPress = () => navigation.goBack();

  return (
    <View style={{ flex: 1, backgroundColor: "#ea0000" }}>
      <View style={{ flexShrink: 0 }}>
        <View
          style={{
            height: 55,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 0,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              padding: 10,
              borderRadius: 5,
              width: 45,
            }}
            onPress={handleBackPress}
          >
            <MaterialIcons name="close" size={32} color="#ffffff" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
        </View>
        <View style={{ paddingHorizontal: 20, paddingBottom: 25 }}>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 37,
              fontFamily: "Prompt-SemiBold",
              textAlign: "center",
            }}
          >
            Thaiup
          </Text>
        </View>
      </View>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        contentContainerStyle={{ padding: 15 }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <ButtonForm
              title={t("login")}
              width="50%"
              buttonStyle={{
                backgroundColor: activeTab === TAB_LOGIN ? "#ffffff" : "#e1e1e1",
                padding: 15,
              }}
              textStyle={{
                fontSize: 18,
                fontFamily:
                  activeTab === TAB_LOGIN ? "Prompt-SemiBold" : "Prompt-Regular",
                color: activeTab === TAB_LOGIN ? "#ea0000" : "#999999",
                textAlign: "center",
              }}
              onPress={() => setActiveTab(TAB_LOGIN)}
            />
            <ButtonForm
              title={t("register")}
              width="50%"
              buttonStyle={{
                backgroundColor: activeTab === TAB_REGISTER ? "#ffffff" : "#e1e1e1",
                padding: 15,
              }}
              textStyle={{
                fontSize: 18,
                fontFamily:
                  activeTab === TAB_REGISTER
                    ? "Prompt-SemiBold"
                    : "Prompt-Regular",
                color: activeTab === TAB_REGISTER ? "#ea0000" : "#999999",
                textAlign: "center",
              }}
              buttonColor={activeTab === TAB_REGISTER ? "#ffffff" : "#e1e1e1"}
              onPress={() => setActiveTab(TAB_REGISTER)}
            />
          </View>

          {activeTab === TAB_LOGIN && <LoginTab />}
          {activeTab === TAB_REGISTER && (
            <RegisterTab onRegisterSuccess={() => setActiveTab(TAB_LOGIN)} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default Login;
