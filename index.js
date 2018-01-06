const _ = require('lodash')
const csv=require('csvtojson')

const unify = (str) => {
	return str.replace(/\s+/g,'').toLowerCase().trim();
}

const getJigsawId = (url) => {
	return url.substring(url.lastIndexOf('/')+1, url.length)
}

const sponsors = (path) => {
	// const csvFilePath='./raw/sponsors-xa.csv'

	csv()
	.fromFile(csvFilePath)
	.on('end_parsed',(array) => {
		const info = _.map(array, (item) => {
			return {'name': unify(item['Sponsor Name']), 'id': getJigsawId(item['更多Sponsor信息'])}
		})
		console.log(JSON.stringify(info, null, 2))
	})	
}

const sponsees = (path) => {
	// const csvFilePath='./raw/sponsees-xa.csv'

	csv()
	.fromFile(path)
	.on('end_parsed',(array) => {
		const info = _.map(array, (item) => {
			return {
				'name': unify(item['Common Name']), 
				'id': item['Jigsaw ID'],
				'sponsorName': unify(item['Sponsor Common Name']),
				'sponsorId': item['Sponsor ID']
			}
		})

		const result = _.each(_.filter(info, (sponsee) => {
			return !_.isEmpty(sponsee.name)
		}))

		console.log(JSON.stringify(result, null, 2))
	})	
}

sponsees('./raw/sponsees-cd.csv')
