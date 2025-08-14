import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MenuModalProps {
  show: boolean;
  onClose: () => void;
  menuItems: string[];
  onMenuPress: (() => void)[];
}

export default function MenuModal({
  show,
  onClose,
  menuItems,
  onMenuPress,
}: MenuModalProps) {
  const handlePress = (index: number) => {
    onMenuPress[index]?.();
    onClose();
  };

  return (
    <Modal visible={show} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContent}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handlePress(index)}
            >
              <Text style={styles.menuText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 50,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    paddingVertical: 10,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 15,
    fontFamily: 'Prompt-Regular',
  },
});
