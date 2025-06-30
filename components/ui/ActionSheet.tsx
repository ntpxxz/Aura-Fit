import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { X } from 'lucide-react-native';
import { Typography } from './Typography';
import { Button } from './Button';

const { height } = Dimensions.get('window');

interface ActionSheetOption {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<any>;
  color?: string;
  onPress: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  options: ActionSheetOption[];
  cancelText?: string;
}

export function ActionSheet({
  visible,
  onClose,
  title,
  description,
  options,
  cancelText = 'Cancel'
}: ActionSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          onPress={onClose}
          activeOpacity={1}
        />
        
        <View style={styles.container}>
          {/* Header */}
          {(title || description) && (
            <View style={styles.header}>
              {title && (
                <Typography variant="h4" align="center" style={styles.title}>
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="body" color="muted" align="center" style={styles.description}>
                  {description}
                </Typography>
              )}
            </View>
          )}

          {/* Options */}
          <ScrollView style={styles.optionsContainer}>
            {options.map((option, index) => {
              const Icon = option.icon;
              
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.option,
                    index === options.length - 1 && styles.lastOption
                  ]}
                  onPress={() => {
                    option.onPress();
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionContent}>
                    {Icon && (
                      <View style={[
                        styles.optionIcon,
                        { backgroundColor: option.color ? `${option.color}15` : '#F1F5F9' }
                      ]}>
                        <Icon 
                          size={20} 
                          color={option.destructive ? '#EF4444' : option.color || '#64748B'} 
                          strokeWidth={2} 
                        />
                      </View>
                    )}
                    
                    <View style={styles.optionText}>
                      <Typography 
                        variant="body" 
                        weight="semibold"
                        style={[
                          styles.optionTitle,
                          option.destructive && { color: '#EF4444' }
                        ]}
                      >
                        {option.title}
                      </Typography>
                      {option.description && (
                        <Typography variant="small" color="muted" style={styles.optionDescription}>
                          {option.description}
                        </Typography>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Cancel Button */}
          <View style={styles.cancelContainer}>
            <Button variant="outline" onPress={onClose} style={styles.cancelButton}>
              <Typography variant="body">{cancelText}</Typography>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  title: {
    marginBottom: 8,
  },
  description: {
    lineHeight: 22,
  },
  optionsContainer: {
    maxHeight: height * 0.5,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    marginBottom: 2,
  },
  optionDescription: {
    lineHeight: 18,
  },
  cancelContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  cancelButton: {
    width: '100%',
  },
});