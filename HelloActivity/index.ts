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

let counter = 0;

const activityFunction: AzureFunction = async function (context: Context): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  context.log('--> HelloActivity', context.bindings.name);

  // if (context.bindings.name === 'Seattle') {
  //   counter++;
  //
  //   if (counter === 2) {
  //     throw new Error('oh oh');
  //   }
  // }

  return `Hello ${context.bindings.name}!`;
};

export default activityFunction;
