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
