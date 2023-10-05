// BackgroundTask.js

import * as TaskManager from "expo-task-manager";

export const BACKGROUND_TASK_NAME = "backgroundTask";

export const registerBackgroundTask = () => {
  TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
    console.log("Running background task...");
    // Add your background task logic here

    return TaskManager.TaskManagerExecutionResult.Success;
  });
};

export const startBackgroundTask = () => {
  TaskManager.isTaskDefined(BACKGROUND_TASK_NAME).then((defined) => {
    if (defined) {
      console.log("Starting background task...");
      TaskManager.startTask(BACKGROUND_TASK_NAME);
    } else {
      console.log("Background task not defined.");
    }
  });
};
