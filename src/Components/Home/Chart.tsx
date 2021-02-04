import React from 'react';
import {StyleSheet} from 'react-native';
import {CandleStickChart} from 'react-native-charts-wrapper';

const Chart = ({data, marker, legend, xAxis, yAxis, onSelect}) => {
  return (
    <CandleStickChart
      style={styles.chart}
      data={data}
      marker={marker}
      chartDescription={{text: 'Amazone Stock'}}
      legend={legend}
      xAxis={xAxis}
      yAxis={yAxis}
      maxVisibleValueCount={16}
      autoScaleMinMaxEnabled={true}
      // zoom={{scaleX: 2, scaleY: 1, xValue:  400000, yValue: 1}}
      zoom={{
        scaleX: 1,
        scaleY: 1,
        xValue: 40,
        yValue: 916,
        axisDependency: 'LEFT',
      }}
      onSelect={onSelect}
      onChange={(event) => console.log(event.nativeEvent)}
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    flex: 1,
  },
});

export default Chart;
