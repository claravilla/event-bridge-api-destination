import { App } from "aws-cdk-lib";
import ApiDestinationStack from "./ApiDestinationStack";

const app = new App();

new ApiDestinationStack(app, "ApiDestinationStack");
