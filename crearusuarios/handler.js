const aws = require("aws-sdk")
const { randomUUID } = require("crypto")

let dynamoDBClientParams = {}

if(process.env.IS_OFFLINE){
  dynamoDBClientParams = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams)

const crearUsuarios = async (event, context) => {

  const id = randomUUID();

  let userBody = JSON.parse(event.body)

  userBody.pk = id

  var params = {
    TableName: 'usersTable',
    Item: userBody
  };

  console.log(params.Item)

return dynamodb.put(params).promise().then(res => {
   console.log(res)
   return {
       "statusCode": 200,
       "body": JSON.stringify({ 'user': params.Item})
   }
 })
}

module.exports = {
  crearUsuarios
}
