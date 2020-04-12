import { h } from 'hyperapp'

export default (props) => h('div', null, [
    // h('datetime-local', {onchange: (event) => props.subSelect(event.target.value)}, [
    //     h('option',{value: '2020'},['2020']),
    //     h('option',{value: '2019'},['2019']),
    //     h('option',{value: '2018'},['2018']),
    //     h('option',{value: '2017'},['2017']),
    //     h('option',{value: '2016'},['2016']),
    //     h('option',{value: '2015'},['2015']),
    //     h('option',{value: '2014'},['2014'])
    // ])
    // h('div',{onclick: (event) => props.subSelect(event.target.value)},[
        h('input',{type: 'date', oninput: (event) => props.updateDayMonthYear(event)},[]),
        h('input',{type: 'time', oninput: (event) => props.updateHour(event)},[]),
        h('input',{type: 'button',value: 'Allons-y',onclick: props.subSelect},[])
    // ])    
])
