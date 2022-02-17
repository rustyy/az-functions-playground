/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 *
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *    function app in Kudu
 */

import * as df from 'durable-functions';

const orchestrator = df.orchestrator(function* (context) {
  const outputs = [];

  context.log('------------------------> ORCHESTRATOR START');

  outputs.push(yield context.df.callActivity('HelloActivity', 'Tokyo'));
  outputs.push(yield context.df.callActivity('HelloActivity', 'Seattle'));
  outputs.push(yield context.df.callActivity('HelloActivity', 'London'));

  context.log('------------------------> ORCHESTRATOR END');

  // returns ["Hello Tokyo!", "Hello Seattle!", "Hello London!"]
  return outputs;
});

export default orchestrator;
