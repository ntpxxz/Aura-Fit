import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface EnhancedProgressChartProps {
  timeframe: string;
  metric: string;
  color: string;
}

export function EnhancedProgressChart({ timeframe, metric, color }: EnhancedProgressChartProps) {
  // Enhanced mock data with more realistic patterns
  const getDataPoints = () => {
    const baseData = {
      weight: {
        '1 Week': [75.5, 75.3, 75.1, 74.9, 74.7, 74.5, 74.2],
        '1 Month': [77.0, 76.5, 76.2, 75.8, 75.4, 75.0, 74.6, 74.2],
        '3 Months': [79.0, 78.5, 78.0, 77.5, 77.0, 76.5, 76.0, 75.5, 75.0, 74.5, 74.2],
        '6 Months': [82.0, 81.0, 80.0, 79.0, 78.0, 77.0, 76.0, 75.0, 74.5, 74.2],
        '1 Year': [85.0, 83.0, 81.0, 79.0, 77.0, 75.0, 74.2],
      },
      muscle: {
        '1 Week': [41.8, 41.9, 42.0, 42.1, 42.2, 42.3, 42.4],
        '1 Month': [40.5, 40.8, 41.1, 41.4, 41.7, 42.0, 42.2, 42.4],
        '3 Months': [38.0, 38.5, 39.0, 39.5, 40.0, 40.5, 41.0, 41.5, 42.0, 42.2, 42.4],
        '6 Months': [36.0, 37.0, 38.0, 39.0, 40.0, 41.0, 42.0, 42.2, 42.3, 42.4],
        '1 Year': [34.0, 36.0, 38.0, 40.0, 41.0, 42.0, 42.4],
      },
      bodyFat: {
        '1 Week': [18.5, 18.4, 18.3, 18.2, 18.1, 18.0, 17.9],
        '1 Month': [20.0, 19.5, 19.2, 18.9, 18.6, 18.3, 18.1, 17.9],
        '3 Months': [22.0, 21.5, 21.0, 20.5, 20.0, 19.5, 19.0, 18.5, 18.2, 18.0, 17.9],
        '6 Months': [24.0, 23.0, 22.0, 21.0, 20.0, 19.0, 18.5, 18.2, 18.0, 17.9],
        '1 Year': [26.0, 24.0, 22.0, 20.0, 19.0, 18.0, 17.9],
      },
      healthScore: {
        '1 Week': [76, 77, 77, 78, 78, 79, 78],
        '1 Month': [65, 68, 70, 72, 74, 76, 77, 78],
        '3 Months': [55, 58, 62, 65, 68, 70, 72, 74, 76, 77, 78],
        '6 Months': [45, 50, 55, 60, 65, 70, 74, 76, 77, 78],
        '1 Year': [40, 50, 60, 68, 72, 76, 78],
      },
    };

    return baseData[metric as keyof typeof baseData]?.[timeframe] || baseData.weight['1 Month'];
  };

  const dataPoints = getDataPoints();
  const minValue = Math.min(...dataPoints);
  const maxValue = Math.max(...dataPoints);
  const range = maxValue - minValue || 1;

  const chartWidth = width - 80;
  const chartHeight = 180;
  const padding = 20;

  // Generate smooth curve path
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

  const getMetricUnit = () => {
    const units: { [key: string]: string } = {
      weight: 'kg',
      muscle: 'kg',
      bodyFat: '%',
      healthScore: 'pts',
    };
    return units[metric] || '';
  };

  const getTrendAnalysis = () => {
    const firstValue = dataPoints[0];
    const lastValue = dataPoints[dataPoints.length - 1];
    const change = lastValue - firstValue;
    const percentChange = ((change / firstValue) * 100).toFixed(1);
    
    return {
      change: change.toFixed(1),
      percentChange,
      isPositive: change > 0,
      isGoodTrend: (metric === 'weight' || metric === 'bodyFat') ? change < 0 : change > 0,
    };
  };

  const trend = getTrendAnalysis();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
        style={styles.chartContainer}
      >
        {/* Chart Header with Stats */}
        <View style={styles.chartHeader}>
          <View style={styles.currentValue}>
            <Text style={styles.currentValueNumber}>
              {dataPoints[dataPoints.length - 1]?.toFixed(1)}{getMetricUnit()}
            </Text>
            <Text style={styles.currentValueLabel}>Current</Text>
          </View>
          <View style={styles.trendIndicator}>
            <Text style={[
              styles.trendValue,
              { color: trend.isGoodTrend ? '#00D4AA' : '#FF6B6B' }
            ]}>
              {trend.isPositive ? '+' : ''}{trend.change}{getMetricUnit()}
            </Text>
            <Text style={styles.trendPercent}>
              ({trend.isPositive ? '+' : ''}{trend.percentChange}%)
            </Text>
          </View>
        </View>

        {/* SVG Chart */}
        <View style={styles.chartArea}>
          <Svg width={chartWidth} height={chartHeight}>
            <Defs>
              <SvgLinearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <Stop offset="100%" stopColor={color} stopOpacity="0.05" />
              </SvgLinearGradient>
              <SvgLinearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={color} stopOpacity="0.8" />
                <Stop offset="50%" stopColor={color} stopOpacity="1" />
                <Stop offset="100%" stopColor={color} stopOpacity="0.8" />
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
                  stroke={color}
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
            <Text style={styles.insightLabel}>Best Period</Text>
            <Text style={styles.insightValue}>
              {timeframe === '1 Week' ? 'Last 3 days' : 'Recent weeks'}
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Avg Change</Text>
            <Text style={styles.insightValue}>
              {(parseFloat(trend.change) / dataPoints.length).toFixed(2)}{getMetricUnit()}/period
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Consistency</Text>
            <Text style={styles.insightValue}>
              {Math.random() > 0.5 ? 'High' : 'Good'}
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentValue: {
    alignItems: 'flex-start',
  },
  currentValueNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  currentValueLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 2,
  },
  trendIndicator: {
    alignItems: 'flex-end',
  },
  trendValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  trendPercent: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 2,
  },
  chartArea: {
    position: 'relative',
    marginBottom: 20,
  },
  yAxisLabels: {
    position: 'absolute',
    left: -40,
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
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
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
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
});