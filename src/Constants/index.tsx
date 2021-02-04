import {processColor} from 'react-native';
export const legends = {
  legends: {
    enabled: true,
    textSize: 14,
    form: 'CIRCLE',
    wordWrapEnabled: true,
    isLoading: true,
  },
};

export const dataSets = {
  dataSets: [
    {
      values: [{shadowH: 0, shadowL: 0, open: 0, close: 0}],
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
};


export const marker = {
    enabled: true,
    markerColor: processColor('#2c3e50'),
    textColor: processColor('white'),
  }