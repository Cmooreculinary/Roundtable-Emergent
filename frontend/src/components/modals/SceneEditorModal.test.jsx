import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { DEFAULT_SCENE } from "../../lib/scenes";
import SceneEditorModal, { SceneEditor } from "./SceneEditorModal";

describe("SceneEditor", () => {
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

  test("preserves scene IDs while updating every selector group", async () => {
    const onChange = jest.fn();
    await act(async () => {
      root.render(<SceneEditor value={DEFAULT_SCENE} onChange={onChange} />);
    });

    await act(async () => container.querySelector('[data-testid="scene-room-terrace"]').click());
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ room: "terrace" }));

    await act(async () => container.querySelector('[data-testid="scene-table-strategy"]').click());
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ table: "strategy" }));

    await act(async () => container.querySelector('[data-testid="scene-tabletop-chef"]').click());
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ tabletop: "chef" }));

    await act(async () => container.querySelector('[data-testid="scene-food-dinner"]').click());
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ food: "dinner" }));

    await act(async () => container.querySelector('[data-testid="scene-ambiance-jazz"]').click());
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ ambiance: "jazz" }));

    await act(async () => container.querySelector('[data-testid="scene-music-acoustic"]').click());
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ music: "acoustic" }));
  });

  test("reset returns the exact backend-compatible default scene", async () => {
    const onChange = jest.fn();
    await act(async () => {
      root.render(<SceneEditor value={{ ...DEFAULT_SCENE, room: "terrace" }} onChange={onChange} />);
    });

    await act(async () => container.querySelector('[data-testid="scene-reset"]').click());
    expect(onChange).toHaveBeenCalledWith(DEFAULT_SCENE);
  });

  test("modal keeps header and footer outside the controlled scroll body", async () => {
    await act(async () => {
      root.render(<SceneEditorModal initial={DEFAULT_SCENE} onClose={jest.fn()} onSave={jest.fn()} />);
    });

    const modal = container.querySelector('[data-testid="scene-editor-modal"] .scene-modal');
    expect(modal.querySelector(":scope > .scene-modal__header")).not.toBeNull();
    expect(modal.querySelector(":scope > .scene-modal__body")).not.toBeNull();
    expect(modal.querySelector(":scope > .scene-modal__footer")).not.toBeNull();
  });
});
