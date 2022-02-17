import { AzureFunction, Context } from '@azure/functions';
import * as df from 'durable-functions';

const isNotExistingInstance = (instance) => {
  return (
    !instance ||
    instance.runtimeStatus == 'Completed' ||
    instance.runtimeStatus == 'Failed' ||
    instance.runtimeStatus == 'Terminated'
  );
};

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const client = df.getClient(context);
  const instanceId = 'run';
  const functionName = 'DurableFunctionsOrchestratorJS';

  const shouldStart = isNotExistingInstance(await client.getStatus(instanceId));

  if (shouldStart) {
    await client.startNew(functionName, instanceId);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
  } else {
    context.log('--> already running');
  }
};

export default timerTrigger;
