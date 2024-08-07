import { setupWorker } from "msw/browser";
import { handlersAccountApi } from "./accountApiMock";
import { handlersProjectsApi } from "./projectsApiMock";

export const worker = setupWorker(...handlersAccountApi
    .concat(handlersProjectsApi)
)