import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { RootStackParamList } from '../../type/navigation';

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

function ItemJob({ item }: any) {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <TouchableOpacity
      key={item?.id}
      style={{
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderColor: '#e1e1e1',
      }}
      onPress={() => {
        navigation.navigate('Jobs', {
          screen: 'JobView',
          params: { id: item?._id },
        });
      }}
    >
      <Text
        style={{
          paddingVertical: 3,
          fontSize: 16,
          fontFamily: 'Prompt-SemiBold',
        }}
      >
        {item?.position}
      </Text>
      <Text
        style={{
          paddingVertical: 3,
          fontSize: 14,
          fontFamily: 'Prompt-Regular',
        }}
      >
        {item?.company}
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
          marginTop: 5,
        }}
      >
        <View style={{ flex: 0, width: 18 }}>
          <MaterialDesignIcons name="map-marker" size={18} color="#F67280" />
        </View>
        <View style={{ flexShrink: 1, paddingLeft: 5 }}>
          <Text style={{ fontFamily: 'Prompt-Regular', fontSize: 13 }}>
            {item?.region}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ItemJob;
