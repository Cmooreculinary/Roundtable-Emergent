import React, { act } from "react";
import { createRoot } from "react-dom/client";
import Dock from "./Dock";

describe("Dock", () => {
  let container;
  let root;

  beforeAll(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
  });

  test("routes the Email shortcut to Communications", async () => {
    const onNav = jest.fn();
    await act(async () => {
      root.render(<Dock currentPath="/messages" onNav={onNav} unreadCount={2} />);
    });

    const email = container.querySelector('[data-testid="dock-email"]');
    expect(email.tagName).toBe("BUTTON");
    expect(email.getAttribute("aria-label")).toBe("Email");

    await act(async () => email.click());
    expect(onNav).toHaveBeenCalledWith("/communications");
  });

  test("marks the current shortcut and exposes the unread count", async () => {
    await act(async () => {
      root.render(<Dock currentPath="/notifications" onNav={jest.fn()} unreadCount={4} />);
    });

    const alerts = container.querySelector('[data-testid="dock-alerts"]');
    expect(alerts.getAttribute("aria-current")).toBe("page");
    expect(alerts.textContent).toContain("4");
  });
});
