export const handler = async (event, context) => {
  // Concise production logging
  const timestamp = new Date().toISOString();
  const method = event.requestContext?.http?.method || 'Unknown';
  const path = event.requestContext?.http?.path || '/';
  const sourceIp = event.requestContext?.http?.sourceIp || 'Unknown';
  
  console.log(`[${timestamp}] ${method} ${path} - IP: ${sourceIp} - RequestID: ${context.requestId}`);
  
  // Log query parameters if present
  if (event.queryStringParameters && Object.keys(event.queryStringParameters).length > 0) {
    console.log('Query params:', JSON.stringify(event.queryStringParameters));
  }
  
  // Log body if present
  if (event.body) {
    console.log('Request body length:', event.body.length, 'chars');
  }
  
  // Process the request
  const responseData = {
    message: 'Hello from Production Lambda Function!',
    timestamp: timestamp,
    requestId: context.requestId,
    method: method,
    path: path
  };
  
  console.log('Response:', JSON.stringify(responseData));
  
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
    },
    body: JSON.stringify(responseData)
  };
  
  console.log(`[${timestamp}] Response sent - Status: ${response.statusCode}`);
  return response;
}; 