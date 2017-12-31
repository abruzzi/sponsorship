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

const sponseeCount = _.reduce(_.map(valid, (sponsee) => {
	return {name: sponsee.sponsorName, count: 1}
}), (result, item) => {
	if(result[item.name]) {
		result[item.name] += 1
	} else {
		result[item.name] = 1
	}

	return result
}, {});

// console.log(_.uniqBy(_.flatten(_.concat(_.map(valid, (spnosee) => {return {id: spnosee.name, value: sponseeCount[spnosee.name] || 0}}), 
// 	_.map(valid, (sponsor) => {return {id: sponsor.sponsorName, value: sponseeCount[sponsor.sponsorName] || 0}}))), 'id'))

const graph = {
	nodes: _.uniqBy(_.flatten(_.concat(_.map(valid, (spnosee) => {
		return {id: spnosee.name, value: sponseeCount[spnosee.name] || 0}
	}), 
	_.map(valid, (sponsor) => {
		return {id: sponsor.sponsorName, value: sponseeCount[sponsor.sponsorName] || 0}
	}))), 'id'),
	links: _.map(valid, (sponsee) => {
		return {source: sponsee.name, target: sponsee.sponsorName, value: 1}
	})
}

console.log(JSON.stringify(graph, null, 2))

// console.log(JSON.stringify(sponseeCount, null, 2))

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