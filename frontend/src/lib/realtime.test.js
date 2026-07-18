import { buildWebSocketUrl } from "./realtime";

describe("WebSocket URL authentication", () => {
  test("uses the secure websocket scheme for an HTTPS backend", () => {
    expect(buildWebSocketUrl("https://roundtable.example.com", ""))
      .toBe("wss://roundtable.example.com/api/ws");
  });

  test("adds an encoded session bearer token for cross-origin browsers", () => {
    expect(buildWebSocketUrl("https://roundtable.example.com", "token with spaces/+"))
      .toBe("wss://roundtable.example.com/api/ws?token=token%20with%20spaces%2F%2B");
  });

  test("keeps local development on ws", () => {
    expect(buildWebSocketUrl("http://localhost:8001", "local-token"))
      .toBe("ws://localhost:8001/api/ws?token=local-token");
  });
});
