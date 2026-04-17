"""
Shared pytest fixtures for Round Table API tests
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials
ADMIN_EMAIL = "admin@roundtable.app"
ADMIN_PASSWORD = "roundtable2026"
TEST_USER_EMAIL = "demo@roundtable.app"
TEST_USER_PASSWORD = "demo12345"
TEST_USER_NAME = "Demo User"


@pytest.fixture(scope="session")
def api_client():
    """Shared requests session"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture(scope="session")
def admin_session():
    """Session authenticated as admin"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    response = session.post(f"{BASE_URL}/api/auth/login", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    })
    if response.status_code != 200:
        pytest.skip(f"Admin login failed: {response.status_code} - {response.text}")
    return session


@pytest.fixture(scope="function")
def test_user_session(api_client):
    """Session authenticated as test user (creates if not exists)"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    
    # Try to login first
    response = session.post(f"{BASE_URL}/api/auth/login", json={
        "email": TEST_USER_EMAIL,
        "password": TEST_USER_PASSWORD
    })
    
    if response.status_code == 200:
        return session
    
    # If login fails, register the user
    response = session.post(f"{BASE_URL}/api/auth/register", json={
        "email": TEST_USER_EMAIL,
        "password": TEST_USER_PASSWORD,
        "name": TEST_USER_NAME
    })
    
    if response.status_code in [200, 201]:
        return session
    elif response.status_code == 409:
        # User exists but wrong password - skip
        pytest.skip("Test user exists with different password")
    else:
        pytest.skip(f"Could not create test user: {response.status_code}")
    
    return session
