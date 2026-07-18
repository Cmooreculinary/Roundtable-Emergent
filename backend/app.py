"""Production FastAPI entrypoint.

The Render frontend and backend run on separate origins. Some browsers block
cross-origin cookies even when SameSite=None is configured. The existing API
already accepts bearer tokens, so this entrypoint adds the access token to
successful login and registration responses while preserving the HttpOnly
cookie flow for browsers that allow it.
"""

from fastapi import Response

import server


app = server.app


def _remove_route(path: str, method: str) -> None:
    """Remove one already-registered route before installing its replacement."""
    target_method = method.upper()
    app.router.routes = [
        route
        for route in app.router.routes
        if not (
            getattr(route, "path", None) == path
            and target_method in getattr(route, "methods", set())
        )
    ]


def _token_response(result: dict, response: Response) -> dict:
    user = result["user"]
    response.headers["Cache-Control"] = "no-store"
    response.headers["Pragma"] = "no-cache"
    return {
        **result,
        "access_token": server.create_access_token(user["id"], user["email"]),
        "token_type": "bearer",
        "expires_in": 60 * 60 * 24,
    }


_remove_route("/api/auth/register", "POST")
_remove_route("/api/auth/login", "POST")


@app.post("/api/auth/register", tags=["auth"])
async def register_with_token(payload: server.RegisterIn, response: Response):
    result = await server.register(payload, response)
    return _token_response(result, response)


@app.post("/api/auth/login", tags=["auth"])
async def login_with_token(payload: server.LoginIn, response: Response):
    result = await server.login(payload, response)
    return _token_response(result, response)
