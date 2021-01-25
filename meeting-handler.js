const { apiResponseHeader, genericErrorHandler } = require('./util/httpResponse')
const _ = require('lodash')
const Meeting = require('./Meeting')

function addDays(theDate, days) {
  return new Date(theDate.getTime() + days*24*60*60*1000);
}

const createMeeting = async (event) => {
  try {
    const authenticatedUser = _.get(event, 'requestContext.authorizer') || {firstName: 'sss', lastName: 'bbb'}
    const {time, callLink, candidate} = JSON.parse(event.body)
    const createdMeeting = new Meeting(authenticatedUser, time, callLink, candidate)
    return {
      statusCode: 200,
      body: JSON.stringify(createdMeeting),
      headers: apiResponseHeader
    }
  } catch (error) {
    return genericErrorHandler(error)
  }
}

const listMeetingsByUser = async (event) => {
  try {
    const authenticatedUser = _.get(event, 'requestContext.authorizer') || {firstName: 'sss', lastName: 'bbb'}
    const result = [
      new Meeting(authenticatedUser, addDays(new Date(), 1).toISOString(), 'https://stubcalllink.com/1', {firstName: 'Bob', lastName: 'Wilson'}),
      new Meeting(authenticatedUser, addDays(new Date(), 2).toISOString(), 'https://stubcalllink.com/2', {firstName: 'David', lastName: 'Fish'}),
      new Meeting(authenticatedUser, addDays(new Date(), 3).toISOString(), 'https://stubcalllink.com/3', {firstName: 'Jane', lastName: 'Daisy'})
    ]
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: apiResponseHeader
    }
  } catch (error) {
    return genericErrorHandler(error)
  }
}

module.exports = {
  createMeeting,
  listMeetingsByUser
}
