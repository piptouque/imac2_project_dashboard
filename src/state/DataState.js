
const datasetIds = {
  auber: 'qualite-de-lair-mesuree-dans-la-station-auber',
  chatelet: 'qualite-de-lair-mesuree-dans-la-station-chatelet',
  roosevelt: 'qualite-de-lair-mesuree-dans-la-station-franklin-d-roosevelt'
}

const datasetLabels = datasetId => {
  const date = 'dateheure'
  switch (datasetId) {
    case datasetIds.auber:
      return {
        date,
        no: 'noauba',
        no2: 'b2auba',
        pm10: '10auba',
        pm25: '25auba',
        co2: 'c2auba',
        temp: 'tauba',
        humi: 'hyauba'
      }
    case datasetIds.chatelet:
      return {
        date,
        no: 'nocha4',
        no2: 'n2cha4',
        pm10: '10cha4',
        pm25: null,
        co2: 'c2cha4',
        temp: 'tcha4',
        humi: 'hycha4'
      }
    case datasetIds.roosevelt:
      return {
        date,
        no: 'nofra1',
        no2: 'n2fra1',
        pm10: '10fra1',
        pm25: null,
        co2: 'c2fra1',
        temp: 'tfra1',
        humi: 'hyfra1'
      }
  }
}

// todo: replace items implementation with datasets

export const initDataState = {
  datasetIds: datasetIds,
  datasetLabels: datasetLabels,
  items: [
    {
      /*
       *
       *
       *
       *
       *
       *
       *
       */
    }
  ],
  datasets: [
    {
      /* example */
      id: datasetIds.chatelet,
      labels: ['no2', 'humidite'],
      data: [
        [0, 2, 4, 2, 0],
        [99, 33, 666, 42, 88]
      ]
    }
  ]
}
