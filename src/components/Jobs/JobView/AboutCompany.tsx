
import { View, Text, StyleSheet, Image } from "react-native";
import { useTranslation } from "react-i18next";

interface JobAboutCompanyProps {
  data: {
    address: string;
    company: string;
    telephone: string;
    email: string;
    fax: string;
    latitude: string;
    longitude: string;
  };
}

function JobAboutCompany({ data }: JobAboutCompanyProps) {
  const { t, i18n } = useTranslation();

  return (
    <View>
      <View style={style?.companyAddressView}>
        <View>
          <Text style={style?.conpanyNameText}>{data?.company}</Text>
        </View>
        <View>
          <Text style={style?.addressText}>{data?.address}</Text>
        </View>

      </View>

      <View style={style?.contactContainerView}>
        {data?.email && (
          <View style={style?.contactGroupView}>
            <View>
              <Text style={style?.contactHeaderText}>{t('email')}</Text>
              <Text style={style?.contactText}>{data?.email}</Text>
            </View>
          </View>
        )}

        {data?.telephone && (
          <View style={style?.contactGroupView}>
            <View>
              <Text style={style?.contactHeaderText}>{t('phone_number')}</Text>
              <Text style={style?.contactText}>{data?.telephone}</Text>
            </View>
          </View>
        )}

        {data?.fax && (
          <View style={style?.contactGroupView}>
            <View>
              <Text style={style?.contactHeaderText}>{t('fax')}</Text>
              <Text style={style?.contactText}>{data?.fax}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {},
  companyAddressView: {
    flexDirection: "column",
    gap: 5,
    paddingBottom: 10,
  },
  conpanyNameText: {
    fontSize: 20,
    fontFamily: "Prompt-SemiBold",
  },
  addressText: {
    fontSize: 16,
    fontFamily: "Prompt-Regular",
  },
  section2: {},
  contactContainerView: {},
  contactGroupView: {
    paddingVertical: 10,
    borderTopColor: "#f1f1f1",
    borderTopWidth: 1,
  },
  contactHeaderText: {
    fontSize: 16,
    fontFamily: "Prompt-SemiBold",
  },
  contactText: {
    fontSize: 16,
    fontFamily: "Prompt-Regular",
  },
});

export default JobAboutCompany;
