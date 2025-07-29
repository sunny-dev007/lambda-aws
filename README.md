# Enhanced Lambda Function with Better Console Logging

This repository contains improved Lambda function implementations with enhanced console logging for better debugging and monitoring when using Lambda Function URLs.

> **Note**: Files use the `.mjs` extension to support ES6 module syntax (`export const handler`) in AWS Lambda. This is required when using ES6 import/export statements.

## Files

- **`index.mjs`** - Development/Debug version with comprehensive logging
- **`index-production.mjs`** - Production version with concise logging

## Features

### Development Version (`index.mjs`)
- 🔍 **Detailed Request Analysis**: Logs HTTP method, path, source IP, and user agent
- 📤 **Complete Headers Logging**: Shows all incoming request headers
- 🔗 **Query Parameters**: Displays all query string parameters
- 📝 **Request Body Parsing**: Handles both JSON and raw text bodies
- 📋 **Execution Context**: Shows Lambda context information (request ID, function name, memory, etc.)
- 🔧 **Full Event Object**: Complete event logging for debugging
- ⏱️ **Timestamps**: All logs include execution timestamps
- ✅ **Response Logging**: Shows the complete response being sent

### Production Version (`index-production.mjs`)
- 📊 **Concise Logging**: Essential information without verbosity
- 🎯 **Performance Focused**: Minimal logging overhead
- 📈 **Structured Format**: Easy to parse logs for monitoring tools
- 🔍 **Key Metrics**: Request ID, method, path, IP, and response status

## Sample Console Output

### Development Version Output
```
============================================================
🚀 Lambda Function Invoked
============================================================
📋 Execution Context:
  - Request ID: 12345678-1234-1234-1234-123456789012
  - Function Name: my-lambda-function
  - Function Version: $LATEST
  - Remaining Time: 29987ms
  - Memory Limit: 128MB

🌐 Request Details:
  - HTTP Method: GET
  - Path: /api/hello
  - Source IP: 203.0.113.1
  - User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)

🔍 Query Parameters:
  - name: John
  - age: 25

📝 Request Body: Empty

📤 Response Data:
{
  "message": "Hello from Enhanced Lambda Function!",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "requestInfo": {
    "method": "GET",
    "path": "/api/hello",
    "sourceIp": "203.0.113.1",
    "userAgent": "Mozilla/5.0..."
  }
}
✅ Request processed successfully
============================================================
```

### Production Version Output
```
[2024-01-15T10:30:45.123Z] GET /api/hello - IP: 203.0.113.1 - RequestID: 12345678-1234-1234-1234-123456789012
Query params: {"name":"John","age":"25"}
Response: {"message":"Hello from Production Lambda Function!","timestamp":"2024-01-15T10:30:45.123Z"}
[2024-01-15T10:30:45.123Z] Response sent - Status: 200
```

## Usage

1. **For Development/Testing**: Use `index.mjs` for detailed debugging information
2. **For Production**: Use `index-production.mjs` for efficient logging

## Testing with Function URL

When you set up a Lambda Function URL, you can test it with:

### Browser/GET Request
```
https://your-function-url.lambda-url.region.on.aws/?name=John&age=25
```

### POST Request with curl
```bash
curl -X POST https://your-function-url.lambda-url.region.on.aws/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Lambda!"}'
```

## CloudWatch Logs

All console.log statements will appear in CloudWatch Logs under:
- Log Group: `/aws/lambda/your-function-name`
- Log Stream: Individual execution streams

## CORS Support

Both versions include CORS headers for web application integration:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Headers: Content-Type`
- `Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS`

## Customization

You can customize the logging by:
- Modifying the emoji icons for different log categories
- Adjusting the verbosity level
- Adding custom metrics or business logic logging
- Implementing structured logging for better parsing

## Performance Considerations

- **Development Version**: More detailed logging may impact cold start times
- **Production Version**: Optimized for performance with minimal logging overhead
- Consider using environment variables to switch between logging levels 