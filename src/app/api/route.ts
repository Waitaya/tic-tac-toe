import { makeBotMove } from "@/utils/botLogic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.squares) {
      return new Response("Missing squares data", { status: 400 });
    }

    const botMove = makeBotMove(body.squares);
    return new Response(JSON.stringify({ botMove }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing bot move:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
