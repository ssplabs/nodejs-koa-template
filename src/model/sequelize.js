const { Sequelize } = require('sequelize')
const config = require('config')
const options = config.get('sequelize')
const logger = require('../lib/logger')

/**
 * @type {import('sequelize').Options}
 * 环境无关的 options
 */
const customOptions = {
  dialect: 'mysql',
  timezone: '+08:00',
  logging: logger.debug
}

const sequelize = new Sequelize(Object.assign(customOptions, options))

// 测试数据库连接是否成功
sequelize.authenticate().then(() => {
  logger.info('Mysql connection has been established successfully.')
  return sequelize.sync()
}).catch(error => {
  logger.error('Unable to connect to the database.')
  logger.error(error)
})

module.exports = sequelize
