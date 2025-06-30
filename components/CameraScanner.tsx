import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Alert, Platform } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { X, Camera, RotateCcw, Zap, ZapOff } from 'lucide-react-native';
import { Typography } from './ui/Typography';
import { Button } from './ui/Button';

interface CameraScannerProps {
  visible: boolean;
  onClose: () => void;
  onScanComplete: (data: any) => void;
}

export function CameraScanner({ visible, onClose, onScanComplete }: CameraScannerProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.permissionContainer}>
          <View style={styles.permissionContent}>
            <Camera size={64} color="#00D4AA" strokeWidth={2} />
            <Typography variant="h3" align="center" style={styles.permissionTitle}>
              Camera Permission Required
            </Typography>
            <Typography variant="body" color="muted" align="center" style={styles.permissionText}>
              We need access to your camera to scan food items and nutrition labels
            </Typography>
            <View style={styles.permissionButtons}>
              <Button variant="outline" onPress={onClose}>
                <Typography variant="body">Cancel</Typography>
              </Button>
              <Button variant="primary" onPress={requestPermission}>
                <Typography variant="body">Grant Permission</Typography>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(current => !current);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        // Simulate food recognition
        const mockFoodData = {
          name: 'Greek Yogurt',
          brand: 'Chobani',
          grade: 'A+',
          serving: '1 cup (227g)',
          nutrition: {
            calories: 130,
            protein: 20,
            carbs: 6,
            fat: 0,
            fiber: 0,
            sugar: 4,
          },
          healthBenefits: ['High Protein', 'Probiotic', 'Low Fat'],
          confidence: 0.95,
          scanMethod: 'camera',
        };

        onScanComplete(mockFoodData);
        onClose();
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    // Simulate barcode scanning
    const mockBarcodeData = {
      name: 'Organic Banana',
      brand: 'Fresh Market',
      grade: 'A+',
      serving: '1 medium (118g)',
      nutrition: {
        calories: 105,
        protein: 1,
        carbs: 27,
        fat: 0,
        fiber: 3,
        sugar: 14,
      },
      healthBenefits: ['High Potassium', 'Natural Energy', 'Fiber Rich'],
      barcode: data,
      confidence: 0.99,
      scanMethod: 'barcode',
    };

    onScanComplete(mockBarcodeData);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          flash={flash ? 'on' : 'off'}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39'],
          }}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerButton} onPress={onClose}>
              <X size={24} color="white" strokeWidth={2} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Typography variant="h4" style={styles.headerTitle}>
                Smart Scanner
              </Typography>
              <Typography variant="caption" style={styles.headerSubtitle}>
                Point at food items or barcodes
              </Typography>
            </View>
            <TouchableOpacity style={styles.headerButton} onPress={toggleFlash}>
              {flash ? (
                <Zap size={24} color="#FFD700" strokeWidth={2} />
              ) : (
                <ZapOff size={24} color="white" strokeWidth={2} />
              )}
            </TouchableOpacity>
          </View>

          {/* Scanning Frame */}
          <View style={styles.scanFrame}>
            <View style={styles.scanOverlay}>
              <View style={styles.scanCorner} />
              <View style={[styles.scanCorner, styles.scanCornerTopRight]} />
              <View style={[styles.scanCorner, styles.scanCornerBottomLeft]} />
              <View style={[styles.scanCorner, styles.scanCornerBottomRight]} />
            </View>
            <Typography variant="body" style={styles.scanInstruction}>
              Position food item or barcode within the frame
            </Typography>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
              <RotateCcw size={24} color="white" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner}>
                <Camera size={32} color="white" strokeWidth={2} />
              </View>
            </TouchableOpacity>
            
            <View style={styles.controlButton} />
          </View>

          {/* Instructions */}
          <View style={styles.instructions}>
            <Typography variant="caption" style={styles.instructionText}>
              • Point camera at food items for AI recognition
            </Typography>
            <Typography variant="caption" style={styles.instructionText}>
              • Scan barcodes for instant product info
            </Typography>
            <Typography variant="caption" style={styles.instructionText}>
              • Ensure good lighting for best results
            </Typography>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionContent: {
    alignItems: 'center',
    gap: 20,
    maxWidth: 300,
  },
  permissionTitle: {
    marginTop: 16,
  },
  permissionText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  permissionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    color: 'white',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scanFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  scanOverlay: {
    width: 250,
    height: 250,
    position: 'relative',
    marginBottom: 20,
  },
  scanCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#00D4AA',
    borderWidth: 3,
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  scanCornerTopRight: {
    top: 0,
    right: 0,
    left: 'auto',
    borderLeftWidth: 0,
    borderRightWidth: 3,
    borderBottomWidth: 0,
  },
  scanCornerBottomLeft: {
    bottom: 0,
    left: 0,
    top: 'auto',
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 3,
  },
  scanCornerBottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  scanInstruction: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00D4AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 4,
  },
  instructionText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
  },
});