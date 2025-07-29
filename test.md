# Lambda S3 File Processor

This project is a simple AWS Lambda function written in Node.js that demonstrates how to process files uploaded to an Amazon S3 bucket. When a new file is uploaded to the specified S3 bucket, this Lambda function is automatically triggered. It reads the content of the uploaded file and logs it to Amazon CloudWatch Logs.

## Prerequisites

Before you begin, ensure you have the following installed and configured:

*   **Node.js and npm:** [Download and install Node.js](https://nodejs.org/en/download/)
*   **AWS CLI:** [Install and configure the AWS CLI](https://aws.amazon.com/cli/) with your credentials.
*   **An AWS Account:** You will need an AWS account to create S3 buckets and Lambda functions.

## Project Structure

```
.
├── index.js         # The main Lambda function code
├── package.json     # Project dependencies and metadata
├── README.md        # This file
└── test-event.json  # A sample event for testing
```

## Setup

1.  **Clone the repository or download the source code.**

2.  **Install dependencies:**
    Open your terminal, navigate to the project directory, and run the following command to install the required Node.js modules:

    ```bash
    npm install
    ```

## Deployment to AWS Lambda

To deploy this function to AWS, you will need to create a ZIP file containing the function code and its dependencies.

1.  **Create a ZIP file:**
    In your project's root directory, run the following command to create a `lambda-upload.zip` file.

    ```bash
    zip -r lambda-upload.zip .
    ```
    On Windows, you can right-click the files and folder, and choose "Send to" > "Compressed (zipped) folder". Make sure you are zipping the contents of the directory, not the directory itself.

2.  **Create an IAM Role for Lambda:**
    Your Lambda function will need permission to access S3 and CloudWatch Logs.
    *   Go to the IAM console in AWS.
    *   Create a new role.
    *   For the trusted entity, select **AWS service**, and for the use case, choose **Lambda**.
    *   Add the following AWS managed policies:
        *   `AWSLambdaBasicExecutionRole` (for CloudWatch Logs)
        *   `AmazonS3ReadOnlyAccess` (to read from S3)
    *   Give the role a name (e.g., `lambda-s3-role`) and create it.

3.  **Create the Lambda Function:**
    *   Go to the AWS Lambda console and click **Create function**.
    *   Select **Author from scratch**.
    *   **Function name:** Give your function a name (e.g., `s3-file-processor`).
    *   **Runtime:** Choose **Node.js 18.x** or a later version.
    *   **Architecture:** Select **x86_64**.
    *   **Permissions:** Choose **Use an existing role** and select the IAM role you created in the previous step.
    *   Click **Create function**.

4.  **Upload the ZIP file:**
    *   In your function's configuration page, go to the **Code source** section.
    *   Click **Upload from** and select **.zip file**.
    *   Upload the `lambda-upload.zip` file you created.

5.  **Configure the S3 Trigger:**
    *   In the function's designer, click **Add trigger**.
    *   Select **S3** as the trigger source.
    *   Choose the S3 bucket you want to use.
    *   **Event type:** Select **All object create events**.
    *   Acknowledge the recursive invocation warning and click **Add**.

## Testing

1.  **Test with a Sample Event in the Lambda Console:**
    *   In the Lambda function editor, go to the **Test** tab.
    *   Create a new event.
    *   Give the event a name (e.g., `s3-put-event`).
    *   Copy the content of `test-event.json` from this project and paste it into the event JSON.
        *   **Important:** You need to replace `"YOUR_BUCKET_NAME"` and `"YOUR_FILE_KEY"` with the actual name of your S3 bucket and the key of a file you want to test with.
    *   Click **Test**. You should see the execution results, including the logs.

2.  **Test by Uploading a File to S3:**
    *   Go to your S3 bucket in the AWS console.
    *   Upload any text file (e.g., `test.txt`).
    *   The upload will trigger the Lambda function.

## Viewing Logs

You can view the output and logs of your Lambda function in Amazon CloudWatch.

1.  Go to the **CloudWatch** service in the AWS console.
2.  In the navigation pane, choose **Log groups**.
3.  Find the log group for your Lambda function, which will be named `/aws/lambda/YOUR_FUNCTION_NAME`.
4.  Click on the log group to see the log streams and the output from your function.
