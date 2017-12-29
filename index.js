const _ = require('lodash')
const csv=require('csvtojson')

const unify = (str) => {
	return str.replace(/\s+/g,'').toLowerCase()
}

const getJigsawId = (url) => {
	return url.substring(url.lastIndexOf('/')+1, url.length)
}

const sponsors = () => {

	const csvFilePath='./raw/sponsors-xa.csv'

	csv()
	.fromFile(csvFilePath)
	.on('end_parsed',(array) => {
		const info = _.map(array, (item) => {
			return {'name': unify(item['Sponsor Name']), 'id': getJigsawId(item['更多Sponsor信息'])}
		})
		console.log(JSON.stringify(info, null, 2))
	})	
}

const sponsees = () => {
	const csvFilePath='./raw/sponsees-xa.csv'

	csv()
	.fromFile(csvFilePath)
	.on('end_parsed',(array) => {
		const info = _.map(array, (item) => {
			return {
				'name': unify(item['Common Name']), 
				'id': item['field1'],
				'sponsorName': unify(item['Sponsor Common Name']),
				'sponsorId': item['Sponsor ID']
			}
		})
		console.log(JSON.stringify(info, null, 2))
	})	
}
