import { App, SecretValue, Stack, StackProps } from "aws-cdk-lib";
import {
  ApiDestination,
  Authorization,
  Connection,
  EventField,
  Rule,
  RuleTargetInput,
} from "aws-cdk-lib/aws-events";
import { ApiDestination as ApiTarget } from "aws-cdk-lib/aws-events-targets";

export default class ApiDestinationStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const { SLACK_WEBHOOK: webhook } = process.env;

    if (webhook === undefined) {
      throw new Error("The webhook url is undefinded");
    }

    const authorisation = Authorization.basic(
      "Slack",
      new SecretValue("Secret password")
    );

    const connection = new Connection(this, "apiConnection", {
      authorization: authorisation,
      description: "Connection for Slack Webhook",
    });

    const apiDestination = new ApiDestination(this, "SlackWebhookDestination", {
      connection: connection,
      endpoint: webhook,
      description: "Api destination for Slack Webhook",
    });

    const alarmRule = new Rule(this, "alarmRule", {
      ruleName: "test-alarm-rule",
      eventPattern: {
        source: ["aws.cloudwatch"],
        detail: {
          alarmName: ["TestAlarm"],
          state: {
            value: ["ALARM"],
          },
        },
      },
    });

    alarmRule.addTarget(
      new ApiTarget(apiDestination, {
        event: RuleTargetInput.fromObject({
          text: `🔥 ${EventField.fromPath(
            "$.detail.alarmName"
          )} has just been triggered 🔥`,
        }),
      })
    );
  }
}
