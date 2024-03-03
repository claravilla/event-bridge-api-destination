# AWS EventBridge API Destination

This is a POC to send AWS Cloudwatch alarm notification to Slack.
It leverages the API destination functionality of EventBridge and the Cloudwatch direct integration with EventBridge.

## How to use

Clone the repo  
Run `npm install`  
Add a .env file with SLACK_WEBHOOK={your SLACK webhook}  
Run `cdk deploy`

## Built with

- Node.js
- Typescript
- AWS CDK
