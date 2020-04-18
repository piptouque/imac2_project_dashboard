
const datasetIds = {
  chatelet: 'qualite-de-lair-mesuree-dans-la-station-chatelet',
  roosevelt: 'qualite-de-lair-mesuree-dans-la-station-franklin-d-roosevelt',
  auber: 'qualite-de-lair-mesuree-dans-la-station-auber'
}

// todo: replace items implementation with datasets

export const initDataState = {
  datasetIds: datasetIds,
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
