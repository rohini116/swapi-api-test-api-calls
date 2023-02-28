import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { json } from "stream/consumers";
import Character from "./Character";

const SWAPI_API_URL = "https://swapi.dev/api/people/1";
const server = setupServer(
  rest.get(SWAPI_API_URL, (req, res, ctx) => {
    return res(ctx.json({ name: "Luke Skywalker" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());



test("loads and displays first character", async () => {
  render(<Character url={SWAPI_API_URL} />);

  const luke = await screen.findByText("Luke Skywalker");
  expect(luke).toBeInTheDocument();
});


test("handles server error", async () => {
  
  server.use(
    rest.get(SWAPI_API_URL, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<Character url={SWAPI_API_URL} />);
  const alert = await screen.findByText("Oops, failed to fetch!");
  expect(alert).toBeInTheDocument();
  
});