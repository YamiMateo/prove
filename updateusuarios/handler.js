const aws = require("aws-sdk")

let dynamoDBClientParams = {}

if(process.env.IS_OFFLINE){
  dynamoDBClientParams = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams)

const updateUsuarios = async (event, context) => {

  let userId = event.pathParameters.id

  const body = JSON.parse(event.body)

  var params = {
    TableName: 'usersTable',
    Key: { pk: userId },
    UpdateExpression: 'set #name = :name, #telefono = :telefono',
    ExpressionAttributeNames: {'#name': 'name', '#telefono':'telefono'},
    ExpressionAttributeValues: 
        {':name': body.name, ':telefono':body.telefono},
    ReturnValues: 'ALL_NEW'
    
  };

return dynamodb.update(params).promise().then(res => {
   console.log(res)
   return {
       "statusCode": 200,
       "body": JSON.stringify({ 'user': res.Attributes})
   }
 })
}

module.exports = {
  updateUsuarios
}
