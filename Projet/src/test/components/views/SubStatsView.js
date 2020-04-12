import { h } from 'hyperapp'

import SubStats from '../SubStats'
import SubItemSelected from '../SubItemSelected'

const url  = "https://data.ratp.fr/api/datasets/1.0/search/"
const url2 = 'https://data.ratp.fr/api/records/1.0/search/?dataset=qualite-de-lair-mesuree-dans-la-station-chatelet&facet=dateheure'

export default (state, actions) =>
	h('div', {oncreate: () => { actions.fetchDatas() }}, [
		h('h1',{},'Station Châtelet'),
		SubStats({
			items: state.items
		}),
		SubItemSelected({
			subSelect: actions.selectSub,
			updateDayMonthYear: actions.updateDayMonthYear,
			updateHour: actions.updateHour,
		})
	
	])