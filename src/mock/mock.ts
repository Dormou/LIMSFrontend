import { setupWorker } from "msw/browser";
import { handlers } from "./accountApiMock";

export const worker = setupWorker(...handlers)