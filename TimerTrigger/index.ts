import { AzureFunction, Context } from '@azure/functions';
import * as df from 'durable-functions';
import { DurableOrchestrationClient } from 'durable-functions/lib/src/durableorchestrationclient';

// Instance id to be used (as singleton)
const INSTANCE_ID = 'run';
// The function to be executed
const FUNCTION_NAME = 'DurableFunctionsOrchestratorJS';

/**
 * Determine whether a given instance already exists.
 *
 * @param client
 * @param id
 */
async function isNewInstance(client: DurableOrchestrationClient, id: string) {
  const instance = await client.getStatus(id);

  return (
    !instance ||
    instance.runtimeStatus == 'Completed' ||
    instance.runtimeStatus == 'Failed' ||
    instance.runtimeStatus == 'Terminated'
  );
}

/**
 * Timer trigger function invoking a single orchestrator.
 * @link https://docs.microsoft.com/de-de/azure/azure-functions/durable/durable-functions-singletons?tabs=javascript
 */
const timerTrigger: AzureFunction = async function (context: Context): Promise<void> {
  try {
    const client = df.getClient(context);

    if (await isNewInstance(client, INSTANCE_ID)) {
      await client.startNew(FUNCTION_NAME, INSTANCE_ID);
      context.log(`Started orchestration with ID = '${INSTANCE_ID}'.`);
    } else {
      context.log(`${INSTANCE_ID} already running`);
    }
  } catch (e) {
    context.log.error(e);
  }
};

export default timerTrigger;
