const _ = require('lodash')

const sponsees_xa = require('./data/sponsees-xa.json')
const sponsees_bj = require('./data/sponsees-bj.json')
const sponsees_cd = require('./data/sponsees-cd.json')

const sponsees = _.union(sponsees_xa, sponsees_bj, sponsees_cd)

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

const graph = {
	nodes: _.uniqBy(_.flatten(_.concat(_.map(valid, (spnosee) => {
		return {id: spnosee.name, value: sponseeCount[spnosee.name] || 1}
	}), 
	_.map(valid, (sponsor) => {
		return {id: sponsor.sponsorName, value: sponseeCount[sponsor.sponsorName] || 1}
	}))), 'id'),
	links: _.map(valid, (sponsee) => {
		return {source: sponsee.name, target: sponsee.sponsorName, value: 1}
	})
}

console.log(JSON.stringify(graph, null, 2))