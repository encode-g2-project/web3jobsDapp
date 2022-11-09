import Cors from "cors";
import { Client, Identity, ThreadID, UserAuth } from "@textile/hub";

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST", "HEAD"]
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === "GET") { // or GET, PUT, DELETE ...

    try {
      
    /* const thread: ThreadID = await client.newDB();
    console.log("thread", {thread});
      return res.status(200).json({
        thread
      }); */

    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }

  return res.status(404).json({
    error: {
      code: "not_found",
      message: "The requested endpoint was not found or doesn't support this method."
    }
  });

}

export default handler;