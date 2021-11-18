#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkStack } from "../lib/cdk-stack";

const app = new cdk.App();

const demoStack = {
  account: "", // here need to put in ur account
  region: "", // and ur region
};

new CdkStack(app, "CdkStack", { env: demoStack });
