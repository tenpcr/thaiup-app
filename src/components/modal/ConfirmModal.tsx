import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native';

interface ConfirmModalProps {
  isOpen: boolean;
  description?: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmModal({
  isOpen = false,
  title = 'Confirm?',
  description = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);



  const closeModal = () => {
    onClose();
  };

  return (
    <Modal visible={isOpen} transparent onRequestClose={closeModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>
              {title}
            </Text>
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontFamily: 'Prompt-Light', fontSize: 16 }}>
              {description}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: '49%',
                padding: 12,
                backgroundColor: '#e1e1e1',
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: '#333333',
                  textAlign: 'center',
                  fontFamily: 'Prompt-Regular',
                  fontSize: 16,
                }}
                numberOfLines={1}
              >
                {cancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                width: '49%',
                padding: 12,
                backgroundColor: '#ea0000',
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: '#ffffff',
                  textAlign: 'center',
                  fontFamily: 'Prompt-Regular',
                  fontSize: 16,
                }}
                numberOfLines={1}
              >
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxWidth: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ConfirmModal;
