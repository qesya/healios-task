import React, {useEffect} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  processColor,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import update from 'immutability-helper';

import _ from 'lodash';
import {CandleStickChart} from 'react-native-charts-wrapper';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true,
        isLoading: true,
      },
      data: {
        dataSets: [
          {
            values: [
              {shadowH: 101.76, shadowL: 100.4, open: 100.78, close: 101.03},
              {shadowH: 101.58, shadowL: 100.27, open: 101.31, close: 101.12},
              {shadowH: 102.24, shadowL: 100.15, open: 101.41, close: 101.17},
              {shadowH: 102.28, shadowL: 101.5, open: 102.24, close: 102.23},
              {shadowH: 102.91, shadowL: 101.78, open: 101.91, close: 102.52},
              {shadowH: 105.18, shadowL: 103.85, open: 103.96, close: 104.58},
              {shadowH: 106.31, shadowL: 104.59, open: 104.61, close: 105.97},
            ],
            label: 'AMZN',
            config: {
              highlightColor: processColor('darkgray'),

              shadowColor: processColor('black'),
              shadowWidth: 1,
              shadowColorSameAsCandle: true,
              increasingColor: processColor('#71BD6A'),
              increasingPaintStyle: 'FILL',
              decreasingColor: processColor('#D14B5A'),
            },
            xAxis: {},
            yAxis: {},
          },
        ],
      },
      marker: {
        enabled: true,
        markerColor: processColor('#2c3e50'),
        textColor: processColor('white'),
      },
      zoomXValue: 0,
    };

    this.x = 0;
  }

  async getData() {
    const currentDate = new Date();

    try {
      let resp = await fetch(
        'https://finnhub.io//api/v1/stock/candle?symbol=AMZN&resolution=1&from=1605543327&to=' +
          Math.floor(currentDate.getTime() / 1000),
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Finnhub-Token': 'c0d8luf48v6vf7f7g0j0',
          },
        },
      );
      let json = await resp.json();

      const c = json.c.slice(Math.max(json.c.length - 7, 1));
      const o = json.o.slice(Math.max(json.o.length - 7, 1));
      const h = json.h.slice(Math.max(json.h.length - 7, 1));
      const l = json.l.slice(Math.max(json.l.length - 7, 1));

      const data = [];
      c.map((item, index) =>
        data.push({
          shadowH: h[index],
          shadowL: l[index],
          open: o[index],
          close: item,
        }),
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const myData = await this.getData();
    this.setState({
      data: {
        dataSets: [
          {
            values: myData,
            label: 'AMZN',
            config: {
              highlightColor: processColor('darkgray'),
              shadowColor: processColor('black'),
              shadowWidth: 1,
              shadowColorSameAsCandle: true,
              increasingColor: processColor('#71BD6A'),
              increasingPaintStyle: 'FILL',
              decreasingColor: processColor('#D14B5A'),
            },
            xAxis: {},
            yAxis: {},
          },
        ],
      },
      isLoading: false,
    });
    const data = this.setState(
      update(this.state, {
        xAxis: {
          $set: {
            drawLabels: true,
            drawGridLines: true,
            position: 'BOTTOM',
            yOffset: 5,

            limitLines: _.times(
              this.state.data.dataSets[0].values.length / 5,
              (i) => {
                return {
                  limit: 5 * (i + 1) + 0.5,
                  lineColor: processColor('darkgray'),
                  lineWidth: 1,
                  label: (i + 1).toString(),
                };
              },
            ),
          },
        },
        yAxis: {
          $set: {
            left: {
              valueFormatter: '$ #',
              limitLines: [
                {
                  limit: 112.4,
                  lineColor: processColor('red'),
                  lineDashPhase: 2,
                  lineDashLengths: [10, 20],
                },
                {
                  limit: 89.47,
                  lineColor: processColor('red'),
                  lineDashPhase: 2,
                  lineDashLengths: [10, 20],
                },
              ],
            },
            right: {
              enabled: false,
            },
          },
        },
        zoomXValue: {
          $set: 99999,
        },
      }),
    );
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }

    console.log(event.nativeEvent);
  }

  render() {
    const {isLoading} = this.state;
    return (
      <View style={{flex: 1}}>
        {/* <View style={{height: 80}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View> */}

        <View style={styles.container}>
          {isLoading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
              <Text>Fetching data</Text>
            </View>
          ) : (
            <CandleStickChart
              style={styles.chart}
              data={this.state.data}
              marker={this.state.marker}
              chartDescription={{text: 'CandleStick'}}
              legend={this.state.legend}
              xAxis={this.state.xAxis}
              yAxis={this.state.yAxis}
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
              onSelect={this.handleSelect.bind(this)}
              ref="chart"
              onChange={(event) => console.log(event.nativeEvent)}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            this.setState({isLoading: true}, () => {
              this.loadData();
            })
          }
          style={{
            position: 'absolute',
            bottom: 50,
            right: 50,
            backgroundColor: 'blue',
            padding: 15,
            borderRadius: 15,
          }}>
          <Text style={{color: 'white'}}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});

export default App;
