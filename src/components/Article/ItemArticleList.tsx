import {
  TouchableOpacity,
  View,
  Image,
  Text,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import * as helper from '../../utils/helper';
import { DateTime } from 'luxon';

interface ItemArticleListProp {
  item: any;
  itemStyle: any;
  viewTitleStyle: any;
  onPress: any;
  textTitleStyle: any;
  fontSize: number;
  titleLineHeight: number;
  imageStyle?: any;
  imageLayoutStyle?: any;
}

function ItemArticleList({
  item,
  itemStyle = {},
  imageStyle = {},
  viewTitleStyle = {},
  textTitleStyle = {},
  fontSize,
  titleLineHeight,
  onPress,
  imageLayoutStyle,
}: ItemArticleListProp) {
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity style={itemStyle} onPress={onPress}>
      <View style={imageLayoutStyle}>
        <Image source={{ uri: item?.thumbnail }} style={imageStyle} />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <View style={[viewTitleStyle, { gap: 10 }]}>
          <RenderHtml
            contentWidth={width}
            systemFonts={['Prompt-Regular', 'Arial', 'Times New Roman']}
            tagsStyles={{
              div: {
                lineHeight: titleLineHeight,
                fontSize: fontSize,
                fontFamily: 'Prompt-Regular',
                maxWidth: '100%',
              },
            }}
            source={{
              html: `<div>${item?.title}</div>`,
            }}
            defaultTextProps={{
              numberOfLines: 2,
              ellipsizeMode: 'tail',
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: 'Prompt-Light',
                color: '#999999',
                fontSize: 12,
              }}
            >
              {item?.date &&
                helper.getDate(
                  DateTime.fromISO(item.date).isValid
                    ? item.date
                    : DateTime.fromJSDate(new Date(item.date)).toISO(),
                  'en',
                  'short',
                )}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ItemArticleList;
