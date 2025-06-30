import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressChartProps {
  timeframe: string;
}

export function ProgressChart({ timeframe }: ProgressChartProps) {
  // Mock data points based on timeframe
  const getDataPoints = () => {
    switch (timeframe) {
      case '1 Week':
        return [75.5, 75.2, 75.0, 74.8, 74.5, 74.3, 74.0];
      case '1 Month':
        return [77.0, 76.5, 76.0, 75.5, 75.0, 74.5, 74.0];
      case '3 Months':
        return [79.0, 78.0, 77.0, 76.0, 75.0, 74.5, 74.0];
      default:
        return [82.0, 80.0, 78.0, 76.5, 75.2, 74.8, 74.0];
    }
  };

  const dataPoints = getDataPoints();
  const minValue = Math.min(...dataPoints);
  const maxValue = Math.max(...dataPoints);
  const range = maxValue - minValue || 1;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
        style={styles.chartContainer}
      >
        <View style={styles.chartArea}>
          {/* Y-axis labels */}
          <View style={styles.yAxis}>
            <Text style={styles.axisLabel}>{maxValue.toFixed(1)}</Text>
            <Text style={styles.axisLabel}>{((maxValue + minValue) / 2).toFixed(1)}</Text>
            <Text style={styles.axisLabel}>{minValue.toFixed(1)}</Text>
          </View>

          {/* Chart line */}
          <View style={styles.chartLine}>
            <View style={styles.line}>
              {dataPoints.map((point, index) => {
                const y = ((maxValue - point) / range) * 100;
                const x = (index / (dataPoints.length - 1)) * 100;
                
                return (
                  <View
                    key={index}
                    style={[
                      styles.dataPoint,
                      {
                        left: `${x}%`,
                        top: `${y}%`,
                      },
                    ]}
                  />
                );
              })}
              
              {/* Trend line */}
              <LinearGradient
                colors={['rgba(0, 212, 170, 0.8)', 'rgba(0, 212, 170, 0.3)']}
                style={styles.trendLine}
              />
            </View>
          </View>
        </View>

        {/* Chart info */}
        <View style={styles.chartInfo}>
          <View style={styles.chartStat}>
            <Text style={styles.statValue}>-{(dataPoints[0] - dataPoints[dataPoints.length - 1]).toFixed(1)} kg</Text>
            <Text style={styles.statLabel}>Total Change</Text>
          </View>
          <View style={styles.chartStat}>
            <Text style={styles.statValue}>{dataPoints[dataPoints.length - 1].toFixed(1)} kg</Text>
            <Text style={styles.statLabel}>Current Weight</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  chartContainer: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  chartArea: {
    flexDirection: 'row',
    height: 150,
    marginBottom: 20,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: 12,
    width: 40,
  },
  axisLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  chartLine: {
    flex: 1,
    position: 'relative',
  },
  line: {
    flex: 1,
    position: 'relative',
  },
  dataPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D4AA',
    marginLeft: -4,
    marginTop: -4,
    shadowColor: '#00D4AA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  trendLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 2,
    opacity: 0.3,
  },
  chartInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  chartStat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
});