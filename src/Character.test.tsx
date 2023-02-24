import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Character from "./Character";

const SWAPI_API_URL = "https://swapi.dev/api/people/";
const server = setupServer(
  rest.get(SWAPI_API_URL, (req, res, ctx) => {
    return res(ctx.json([{"name": "Luke Skywalker",}]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays first character", async () => {
  render(<Character url={SWAPI_API_URL} />);
  server.use(
    rest.get(SWAPI_API_URL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([{ name: "Luke Skywalker" }]));
    })
  );
  await waitFor(() => screen.getByText("Luke Skywalker"));
  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  
});
