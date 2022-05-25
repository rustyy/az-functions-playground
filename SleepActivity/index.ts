/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 *
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

import { AzureFunction, Context } from '@azure/functions';

async function sleep(wait: number) {
  await new Promise((resolve) => setTimeout(resolve, wait));
}

const activityFunction: AzureFunction = async function (context: Context): Promise<string> {
  context.log.info('sleepActivity called');
  await sleep(context.bindings.wait);
  return context.bindings.wait;
};

export default activityFunction;
