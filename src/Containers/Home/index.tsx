import React, {useEffect} from 'react';
import {StyleSheet, View, processColor} from 'react-native';
import update from 'immutability-helper';
import _ from 'lodash';
import Chart from '../../Components/Home/Chart';
import RefreshButton from '../../Components/Home/RefreshButton';
import {getData} from '../../Utils/GetDataChart';
import {legends,dataSets,marker} from '../../Constants'
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      legend: legends,
      data:dataSets,
      marker: marker,
      zoomXValue: 0,
    };
    this.x = 0;
  }
  async componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const myData = await getData();
    this.setState({
      data: {
        dataSets: [
          {
            ...this.state.data.dataSets[0],
            values: myData,
          },
        ],
      },
      isLoading: false,
    });
    this.setState(
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
    // console.log(event.nativeEvent);
  }

  render() {
    const {isLoading, data, marker, legend, yAxis, xAxis} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Chart
            data={data}
            marker={marker}
            legend={legend}
            xAxis={xAxis}
            yAxis={yAxis}
            onSelect={this.handleSelect.bind(this)}
          />
        </View>
        <RefreshButton
          disabled={isLoading}
          isLoading={isLoading}
          onPress={() =>
            this.setState({isLoading: true}, () => {
              this.loadData();
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default Home;
