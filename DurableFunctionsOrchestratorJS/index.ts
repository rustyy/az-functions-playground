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
  context.log.info('------------------------> ORCHESTRATOR START');
  let x = yield context.df.callActivity('SleepActivity', 8000);
  context.log.info(`1 waited ${x}`);
  x = yield context.df.callActivity('SleepActivity', 8000);
  context.log.info(`2 waited ${x}`);
  context.log.info('------------------------> ORCHESTRATOR END');

  return 'out';
});

export default orchestrator;
