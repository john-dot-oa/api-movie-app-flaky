import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import middy from "middy";
import { cors } from "middy/middlewares";

import movies from "../../movies.json";

const index: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const random = Math.random();

  if (random < 0.15) {
    // error
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  } else if (random < 0.4) {
    // delay 2s
    await new Promise((r) => setTimeout(r, 2000));
  }

  return {
    statusCode: 200,
    body: JSON.stringify(movies, null, 2),
  };
};

export const handler = middy(index).use(cors());
