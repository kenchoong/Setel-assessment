import { rest } from "msw";
import { setupServer } from "msw/node";
import { handlers, API_URL } from "./server-handler";

const server = setupServer(...handlers);

export { server, rest, API_URL };
