const _ = require('lodash')

const sponsors = require('./data/sponsors.json')
const sponsees = require('./data/sponsees.json')

// const nodeName = (name) => name.replace(/'/g, '').replace(/,/g, '_')

// const sponsorNames = _.map(_.map(sponsors, 'name'), nodeName)
// const sponseeNames = _.map(_.map(sponsees, 'name'), nodeName)

// console.log(_.uniq(sponsorNames).join(','))
// console.log(_.uniq(sponseeNames).join(','))

// _.each(_.filter(sponsees, (sponsee) => sponsee.name && sponsee.sponsorName), (sponsee) => {
// 	console.log([nodeName(sponsee.name), '->', nodeName(sponsee.sponsorName)].join(' '))
// })

// console.log(_.map(sponsees, (spnosee) => _.pick(spnosee, 'name')))

const valid = _.filter(sponsees, (sponsee) => sponsee.name && sponsee.sponsorName)

const graph = {
	nodes: _.uniq(_.flatten(_.concat(_.map(valid, (spnosee) => {return {id: spnosee.name}}), 
	_.map(valid, (sponsor) => {return {id: sponsor.sponsorName}})))),
	links: _.map(valid, (sponsee) => {
		return {source: sponsee.name, target: sponsee.sponsorName, value: _.first(_.shuffle(_.range(1, 10)))}
	})
}

console.log(JSON.stringify(graph, null, 2))

// const list = _.filter(sponsees, (sponsee) => {	
// 	return !_.includes(sponsorNames, sponsee.sponsorName)
// })

// const blackHole = 'BLACK_HOLE';

// const data = _.map(_.uniqBy(list, 'sponsorName'), (item) => {
// 	return {
// 		name: item.sponsorName,
// 		id: item.sponsorId,
// 		sponsorName: blackHole,
// 		sponsorId: -1
// 	}
// })

// data.push({
// 	name: blackHole,
// 	id: -1,
// 	sponsorName: null,
// 	sponsorId: -1
// })

// console.log(JSON.stringify(_.uniqBy(_.concat(sponsees, data), 'name', 'sponsorName'), null, 2))

// const result = _.each(_.filter(sponsees, (sponsee) => !_.isEmpty(sponsee.name)), (sponsee) => {
// 	if(_.isEmpty(sponsee.sponsorName)) {
// 		sponsee.sponsorName = 'N/A';
// 		sponsee.sponsorId = -1;
// 	}
// })

// console.log(JSON.stringify(result, null ,2))