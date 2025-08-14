import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

function TextInputForm({
  label,
  required,
  type,
  placeholder,
  alert,
  onChange,
  value,
  autoFocus,
}: {
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  alert?: string;
  onChange?: any;
  value?: string;
  autoFocus?: boolean;
}) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);
  
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={{ color: '#ea0000' }}>*</Text>}
        </Text>
      )}
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder ?? ''}
        placeholderTextColor="#999"
        secureTextEntry={type === 'password' ? true : false}
        value={value}
        onChangeText={onChange}
      />

      {alert && <Text style={styles.alert}>{alert}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 15,
    fontFamily: 'Prompt-Regular',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Prompt-Regular',
  },
  alert: {
    fontSize: 14,
    fontFamily: 'Prompt-Light',
    color: '#ea0000',
  },
});

export default TextInputForm;
