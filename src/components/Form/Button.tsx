import { ActivityIndicator } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

interface BottomType {
  title: string;
  buttonStyle?: any;
  textStyle?: any;
  buttonColor?: string;
  textColor?: string;
  fontFamily?: string;
  textAlign?: string;
  borderRadius?: number;
  fontSize?: number;
  isLoading?: boolean;
  loadingSize?: number;
  loadingColor?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  width?: any;
  borderWidth?: number;
  borderColor?: string;
  onPress?: any;
  disabled?: boolean;
}

function ButtonForm({
  title,
  buttonStyle,
  textStyle,
  buttonColor,
  textColor,
  fontFamily,
  borderRadius,
  fontSize,
  isLoading,
  loadingSize,
  loadingColor,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  width,
  borderWidth,
  borderColor,
  onPress,
  disabled = false,
}: BottomType) {
  return (
    <TouchableOpacity
      style={[
        buttonStyle,
        {
          width: width,
          alignSelf: width ? 'flex-start' : 'flex-start',
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={() => {
        !disabled && onPress && onPress();
      }}
    >
      <Text
        style={[
          textStyle,
          {
            ...(fontSize ? { fontSize } : {}),
            ...(fontFamily ? { fontFamily } : {}),
          },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator
            color={loadingColor ?? '#ea0000'}
            size={loadingSize}
          />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
}

export default ButtonForm;
