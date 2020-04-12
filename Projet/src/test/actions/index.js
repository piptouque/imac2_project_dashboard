import axios from 'axios'


export default {
  selectSub: () => (state) => {
    const date = state.selectedDayMonthYear + state.selectedHour
    console.log(date)
    const myItemShown = state.items.find(item => item.shown === true)
    const myItemDate = state.items.find(item => item.date === date)

    if (myItemDate === undefined) {
      console.log(`Datas at date ${date} were not found in the state`)
      return state
    }

    return {
      ...state,
      items: state.items
        .filter(item => item.date !== date && item.shown === false)
        .concat({ ...myItemShown, shown: false})
        .concat({ ...myItemDate, shown: true }),
        // selectedDayMonthYear: '',
        selectedHour: ''
    }
  },
  updateDayMonthYear: (event) => (state) => {
    const input = event.target.value

    return {
      ...state,
      selectedDayMonthYear: input
    }
  },
  updateHour: (event) => (state) => {
    const input = event.target.value
    return {
      ...state,
      selectedHour: 'T'+ input+":00+00:00"
    }
  },

  fetchDatas: () => (state,actions) => {
    console.log("eee")
    axios.get('https://data.ratp.fr/api/records/1.0/search/?dataset=qualite-de-lair-mesuree-dans-la-station-chatelet&rows=10000')
      .then(response => {
        actions.setDatas(response.data.records.map(item => ({
          co2: item.fields.c2cha4,
          temperature: item.fields.tcha4,
          humidite: item.fields.hycha4,
          date: item.fields.dateheure,
          // pm10: item.10ch4,
          no2: item.fields.n2cha4,
          no: item.fields.nocha4,
          shown: false
        }
        )))
      })
    return state
  },
  
  setDatas: (datas) => (state) => {
    return { ...state, items: datas}
  }


}
