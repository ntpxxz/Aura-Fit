import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface WeightProgressChartProps {
  timeframe: string;
}

export function WeightProgressChart({ timeframe }: WeightProgressChartProps) {
  // Enhanced mock data with more realistic weight loss patterns
  const getDataPoints = () => {
    const baseData = {
      '1 Week': [75.5, 75.3, 75.1, 74.9, 74.7, 74.5, 74.2],
      '1 Month': [77.0, 76.5, 76.2, 75.8, 75.4, 75.0, 74.6, 74.2],
      '3 Months': [79.0, 78.5, 78.0, 77.5, 77.0, 76.5, 76.0, 75.5, 75.0, 74.5, 74.2],
      '6 Months': [82.0, 81.0, 80.0, 79.0, 78.0, 77.0, 76.0, 75.0, 74.5, 74.2],
      '1 Year': [85.0, 83.0, 81.0, 79.0, 77.0, 75.0, 74.2],
    };
    return baseData[timeframe as keyof typeof baseData] || baseData['1 Month'];
  };

  const dataPoints = getDataPoints();
  const minValue = Math.min(...dataPoints);
  const maxValue = Math.max(...dataPoints);
  const range = maxValue - minValue || 1;

  const chartWidth = width - 80;
  const chartHeight = 160;
  const padding = 20;

  // Generate smooth curve path using bezier curves
  const generatePath = () => {
    if (dataPoints.length < 2) return '';

    const points = dataPoints.map((point, index) => {
      const x = padding + (index / (dataPoints.length - 1)) * (chartWidth - 2 * padding);
      const y = padding + ((maxValue - point) / range) * (chartHeight - 2 * padding);
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      
      // Create smooth curves using quadratic bezier curves
      const controlX = (prevPoint.x + currentPoint.x) / 2;
      path += ` Q ${controlX} ${prevPoint.y} ${currentPoint.x} ${currentPoint.y}`;
    }

    return path;
  };

  // Generate area fill path
  const generateAreaPath = () => {
    const linePath = generatePath();
    if (!linePath) return '';

    const lastPoint = dataPoints.length - 1;
    const lastX = padding + (lastPoint / (dataPoints.length - 1)) * (chartWidth - 2 * padding);
    const bottomY = chartHeight - padding;

    return `${linePath} L ${lastX} ${bottomY} L ${padding} ${bottomY} Z`;
  };

  // Calculate progress metrics
  const getProgressMetrics = () => {
    const firstValue = dataPoints[0];
    const lastValue = dataPoints[dataPoints.length - 1];
    const totalChange = lastValue - firstValue;
    const percentChange = ((totalChange / firstValue) * 100);
    const avgWeeklyChange = totalChange / (dataPoints.length / 7);
    
    return {
      totalChange: totalChange.toFixed(1),
      percentChange: percentChange.toFixed(1),
      avgWeeklyChange: avgWeeklyChange.toFixed(1),
      currentWeight: lastValue.toFixed(1),
      startWeight: firstValue.toFixed(1),
      isPositiveTrend: totalChange < 0, // For weight loss, negative is positive
    };
  };

  const metrics = getProgressMetrics();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
        style={styles.chartContainer}
      >
        {/* Chart Header with Key Metrics */}
        <View style={styles.chartHeader}>
          <View style={styles.currentWeight}>
            <Text style={styles.currentWeightNumber}>
              {metrics.currentWeight} kg
            </Text>
            <Text style={styles.currentWeightLabel}>Current Weight</Text>
          </View>
          <View style={styles.progressIndicator}>
            <Text style={[
              styles.progressValue,
              { color: metrics.isPositiveTrend ? '#00D4AA' : '#FF6B6B' }
            ]}>
              {metrics.totalChange} kg
            </Text>
            <Text style={styles.progressPercent}>
              ({metrics.percentChange}%)
            </Text>
            <Text style={styles.progressLabel}>Total Change</Text>
          </View>
        </View>

        {/* SVG Chart */}
        <View style={styles.chartArea}>
          <Svg width={chartWidth} height={chartHeight}>
            <Defs>
              <SvgLinearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#00D4AA" stopOpacity="0.3" />
                <Stop offset="100%" stopColor="#00D4AA" stopOpacity="0.05" />
              </SvgLinearGradient>
              <SvgLinearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#00D4AA" stopOpacity="0.8" />
                <Stop offset="50%" stopColor="#00D4AA" stopOpacity="1" />
                <Stop offset="100%" stopColor="#00D4AA" stopOpacity="0.8" />
              </SvgLinearGradient>
            </Defs>

            {/* Area fill */}
            <Path
              d={generateAreaPath()}
              fill="url(#areaGradient)"
            />

            {/* Main line */}
            <Path
              d={generatePath()}
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {dataPoints.map((point, index) => {
              const x = padding + (index / (dataPoints.length - 1)) * (chartWidth - 2 * padding);
              const y = padding + ((maxValue - point) / range) * (chartHeight - 2 * padding);
              
              return (
                <Circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="white"
                  stroke="#00D4AA"
                  strokeWidth="2"
                />
              );
            })}
          </Svg>

          {/* Y-axis labels */}
          <View style={styles.yAxisLabels}>
            <Text style={styles.axisLabel}>{maxValue.toFixed(1)}</Text>
            <Text style={styles.axisLabel}>{((maxValue + minValue) / 2).toFixed(1)}</Text>
            <Text style={styles.axisLabel}>{minValue.toFixed(1)}</Text>
          </View>
        </View>

        {/* Chart Footer with Insights */}
        <View style={styles.chartFooter}>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Weekly Avg</Text>
            <Text style={[
              styles.insightValue,
              { color: metrics.isPositiveTrend ? '#00D4AA' : '#FF6B6B' }
            ]}>
              {metrics.avgWeeklyChange} kg
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Start Weight</Text>
            <Text style={styles.insightValue}>
              {metrics.startWeight} kg
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Trend</Text>
            <Text style={[
              styles.insightValue,
              { color: metrics.isPositiveTrend ? '#00D4AA' : '#FF6B6B' }
            ]}>
              {metrics.isPositiveTrend ? '↓ Losing' : '↑ Gaining'}
            </Text>
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
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  currentWeight: {
    alignItems: 'flex-start',
  },
  currentWeightNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 36,
  },
  currentWeightLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 2,
  },
  progressIndicator: {
    alignItems: 'flex-end',
  },
  progressValue: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
  progressPercent: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 2,
  },
  progressLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 4,
  },
  chartArea: {
    position: 'relative',
    marginBottom: 20,
  },
  yAxisLabels: {
    position: 'absolute',
    left: -50,
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  axisLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
  },
  insightItem: {
    alignItems: 'center',
  },
  insightLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '700',
  },
});