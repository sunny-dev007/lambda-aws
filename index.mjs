export const handler = async (event, context) => {
  // Enhanced console logging for better debugging and monitoring
  console.log('='.repeat(60));
  console.log('🚀 Lambda Function Invoked');
  console.log('='.repeat(60));
  
  // Log execution context
  console.log('📋 Execution Context:');
  console.log(`  - Request ID: ${context.requestId}`);
  console.log(`  - Function Name: ${context.functionName}`);
  console.log(`  - Function Version: ${context.functionVersion}`);
  console.log(`  - Remaining Time: ${context.getRemainingTimeInMillis()}ms`);
  console.log(`  - Memory Limit: ${context.memoryLimitInMB}MB`);
  
  // Log request details
  console.log('\n🌐 Request Details:');
  console.log(`  - HTTP Method: ${event.requestContext?.http?.method || 'N/A'}`);
  console.log(`  - Path: ${event.requestContext?.http?.path || 'N/A'}`);
  console.log(`  - Source IP: ${event.requestContext?.http?.sourceIp || 'N/A'}`);
  console.log(`  - User Agent: ${event.headers?.['user-agent'] || 'N/A'}`);
  
  // Log headers
  if (event.headers && Object.keys(event.headers).length > 0) {
    console.log('\n📤 Request Headers:');
    Object.entries(event.headers).forEach(([key, value]) => {
      console.log(`  - ${key}: ${value}`);
    });
  }
  
  // Log query parameters
  if (event.queryStringParameters && Object.keys(event.queryStringParameters).length > 0) {
    console.log('\n🔍 Query Parameters:');
    Object.entries(event.queryStringParameters).forEach(([key, value]) => {
      console.log(`  - ${key}: ${value}`);
    });
  } else {
    console.log('\n🔍 Query Parameters: None');
  }
  
  // Log request body
  if (event.body) {
    console.log('\n📝 Request Body:');
    try {
      const parsedBody = JSON.parse(event.body);
      console.log('  - Type: JSON');
      console.log('  - Content:', JSON.stringify(parsedBody, null, 2));
    } catch (e) {
      console.log('  - Type: Raw Text');
      console.log('  - Content:', event.body);
    }
  } else {
    console.log('\n📝 Request Body: Empty');
  }
  
  // Log the complete event for debugging (can be commented out in production)
  console.log('\n🔧 Complete Event Object:');
  console.log(JSON.stringify(event, null, 2));
  
  console.log('\n' + '='.repeat(60));
  
  // Process the request and create response
  const timestamp = new Date().toISOString();
  const responseData = {
    message: 'Hello from Enhanced Lambda Function!',
    timestamp: timestamp,
    requestInfo: {
      method: event.requestContext?.http?.method || 'Unknown',
      path: event.requestContext?.http?.path || '/',
      sourceIp: event.requestContext?.http?.sourceIp || 'Unknown',
      userAgent: event.headers?.['user-agent'] || 'Unknown'
    },
    queryParams: event.queryStringParameters || {},
    functionInfo: {
      requestId: context.requestId,
      functionName: context.functionName,
      version: context.functionVersion
    }
  };
  
  // Log the response being sent
  console.log('📤 Response Data:');
  console.log(JSON.stringify(responseData, null, 2));
  
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
    },
    body: JSON.stringify(responseData, null, 2)
  };
  
  console.log('✅ Request processed successfully');
  console.log('='.repeat(60));
  
  return response;
}; 