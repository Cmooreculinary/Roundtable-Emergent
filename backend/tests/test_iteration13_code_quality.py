"""
Iteration 13 - Code Quality Refactoring Tests
Tests for:
1. Backend server.py compiles and all endpoints work after WebRTC dispatch refactoring
2. Login still works with admin credentials
3. GET /api/calls/active, GET /api/calls/history, GET /api/push/vapid-key work
4. GET /api/bridges/status returns correct structure
5. Core CRUD operations still work (tables, events, messages)
"""
import pytest
from tests.conftest import ADMIN_EMAIL, ADMIN_PASSWORD, TEST_PASSWORD, TEST_USER_PASSWORD, BASE_URL
import requests
import os
from pathlib import Path

# Load test env if available
_env_test = Path(__file__).parent.parent / ".env.test"
if _env_test.exists():
    for line in _env_test.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"'))

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", ADMIN_EMAIL)
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", ADMIN_PASSWORD)


class TestServerCompilation:
    """Verify server.py compiles and imports correctly after refactoring"""
    
    def test_server_module_imports(self):
        """Server module should import without errors"""
        import sys
        sys.path.insert(0, str(Path(__file__).parent.parent))
        try:
            import server
            assert hasattr(server, 'app'), "FastAPI app should exist"
            assert hasattr(server, '_handle_webrtc_message'), "WebRTC dispatch function should exist"
            assert hasattr(server, '_handle_call_start'), "call_start handler should exist"
            assert hasattr(server, '_handle_call_join'), "call_join handler should exist"
            assert hasattr(server, '_handle_call_leave'), "call_leave handler should exist"
            assert hasattr(server, '_handle_sdp_relay'), "sdp_relay handler should exist"
            assert hasattr(server, '_handle_ice_relay'), "ice_relay handler should exist"
            assert hasattr(server, '_handle_walkie_talk_state'), "walkie_talk_state handler should exist"
            assert hasattr(server, '_finalize_call_log'), "finalize_call_log helper should exist"
            print("✓ Server module imports successfully with all WebRTC handlers")
        finally:
            sys.path.pop(0)


class TestAuthEndpoints:
    """Test authentication endpoints still work after refactoring"""
    
    def test_login_success(self):
        """Admin login should work with correct credentials"""
        session = requests.Session()
        response = session.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "user" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"
        print(f"✓ Admin login successful: {data['user']['name']}")
    
    def test_login_invalid_credentials(self):
        """Login should fail with wrong password"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✓ Invalid credentials correctly rejected")
    
    def test_auth_me_requires_auth(self):
        """GET /api/auth/me should require authentication"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401
        print("✓ /api/auth/me correctly requires authentication")


class TestPublicEndpoints:
    """Test public endpoints that don't require authentication"""
    
    def test_vapid_key_endpoint(self):
        """GET /api/push/vapid-key should return public key"""
        response = requests.get(f"{BASE_URL}/api/push/vapid-key")
        assert response.status_code == 200
        data = response.json()
        assert "public_key" in data
        assert len(data["public_key"]) > 0
        print(f"✓ VAPID key endpoint works: {data['public_key'][:20]}...")


class TestAuthenticatedEndpoints:
    """Test authenticated endpoints after WebRTC refactoring"""
    
    @pytest.fixture(autouse=True)
    def setup_session(self):
        """Create authenticated session"""
        self.session = requests.Session()
        response = self.session.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code != 200:
            pytest.skip(f"Admin login failed: {response.status_code}")
    
    def test_bridges_status(self):
        """GET /api/bridges/status should return SMS/email config status"""
        response = self.session.get(f"{BASE_URL}/api/bridges/status")
        assert response.status_code == 200
        data = response.json()
        assert "sms_configured" in data
        assert "email_configured" in data
        assert data["sms_configured"] == True  # Twilio is configured
        assert data["email_configured"] == False  # Resend not configured
        print(f"✓ Bridges status: SMS={data['sms_configured']}, Email={data['email_configured']}")
    
    def test_calls_active(self):
        """GET /api/calls/active should return list of active calls"""
        response = self.session.get(f"{BASE_URL}/api/calls/active")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Active calls endpoint works: {len(data)} active calls")
    
    def test_calls_history(self):
        """GET /api/calls/history should return call history"""
        response = self.session.get(f"{BASE_URL}/api/calls/history")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        # Verify call log structure if there are any
        if data:
            call = data[0]
            assert "call_id" in call
            assert "type" in call
            assert "status" in call
            assert "started_at" in call
        print(f"✓ Call history endpoint works: {len(data)} calls in history")
    
    def test_get_me(self):
        """GET /api/me should return current user"""
        response = self.session.get(f"{BASE_URL}/api/me")
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == ADMIN_EMAIL
        print(f"✓ GET /api/me works: {data['name']}")
    
    def test_list_tables(self):
        """GET /api/tables should return user's tables"""
        response = self.session.get(f"{BASE_URL}/api/tables")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Tables endpoint works: {len(data)} tables")
    
    def test_list_events(self):
        """GET /api/events should return events"""
        response = self.session.get(f"{BASE_URL}/api/events")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Events endpoint works: {len(data)} events")
    
    def test_list_members(self):
        """GET /api/members should return members"""
        response = self.session.get(f"{BASE_URL}/api/members")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Members endpoint works: {len(data)} members")
    
    def test_list_notifications(self):
        """GET /api/notifications should return notifications"""
        response = self.session.get(f"{BASE_URL}/api/notifications")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Notifications endpoint works: {len(data)} notifications")
    
    def test_list_emails(self):
        """GET /api/emails should return emails"""
        response = self.session.get(f"{BASE_URL}/api/emails?folder=inbox")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Emails endpoint works: {len(data)} emails in inbox")
    
    def test_list_texts(self):
        """GET /api/texts should return texts"""
        response = self.session.get(f"{BASE_URL}/api/texts")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Texts endpoint works: {len(data)} texts")
    
    def test_list_contacts(self):
        """GET /api/contacts should return contacts"""
        response = self.session.get(f"{BASE_URL}/api/contacts")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Contacts endpoint works: {len(data)} contacts")
    
    def test_referrals(self):
        """GET /api/referrals should return referral stats"""
        response = self.session.get(f"{BASE_URL}/api/referrals")
        assert response.status_code == 200
        data = response.json()
        assert "invited" in data
        assert "joined" in data
        assert "badge" in data
        print(f"✓ Referrals endpoint works: badge={data['badge']}")


class TestWebRTCDispatchStructure:
    """Verify the WebRTC dispatch pattern is correctly implemented"""
    
    def test_dispatch_handlers_exist(self):
        """All WebRTC handler functions should exist"""
        import sys
        sys.path.insert(0, str(Path(__file__).parent.parent))
        try:
            import server
            import inspect
            
            # Check _handle_webrtc_message exists and is async
            assert hasattr(server, '_handle_webrtc_message')
            assert inspect.iscoroutinefunction(server._handle_webrtc_message)
            
            # Check all individual handlers exist and are async
            handlers = [
                '_handle_call_start',
                '_handle_call_join', 
                '_handle_call_leave',
                '_handle_sdp_relay',
                '_handle_ice_relay',
                '_handle_walkie_talk_state',
                '_finalize_call_log'
            ]
            
            for handler_name in handlers:
                assert hasattr(server, handler_name), f"Missing handler: {handler_name}"
                handler = getattr(server, handler_name)
                assert inspect.iscoroutinefunction(handler), f"{handler_name} should be async"
            
            print("✓ All WebRTC dispatch handlers exist and are async")
        finally:
            sys.path.pop(0)
    
    def test_dispatch_pattern_structure(self):
        """Verify the dispatch dict maps message types to handlers"""
        import sys
        sys.path.insert(0, str(Path(__file__).parent.parent))
        try:
            import server
            import inspect
            
            # Get the source code of _handle_webrtc_message
            source = inspect.getsource(server._handle_webrtc_message)
            
            # Verify dispatch pattern keywords are present
            assert "_dispatch" in source, "Should have _dispatch dict"
            assert "call_start" in source, "Should handle call_start"
            assert "call_join" in source, "Should handle call_join"
            assert "call_leave" in source, "Should handle call_leave"
            assert "webrtc_offer" in source, "Should handle webrtc_offer"
            assert "webrtc_answer" in source, "Should handle webrtc_answer"
            assert "webrtc_ice" in source, "Should handle webrtc_ice"
            assert "walkie_talk_state" in source, "Should handle walkie_talk_state"
            
            print("✓ WebRTC dispatch pattern correctly structured")
        finally:
            sys.path.pop(0)


class TestConfTestSecrets:
    """Verify conftest.py loads secrets from environment"""
    
    def test_conftest_loads_env_test(self):
        """conftest.py should load .env.test file"""
        conftest_path = Path(__file__).parent / "conftest.py"
        content = conftest_path.read_text()
        
        # Check for .env.test loading
        assert ".env.test" in content, "Should reference .env.test file"
        assert "os.environ" in content, "Should use os.environ"
        assert "ADMIN_EMAIL" in content, "Should load ADMIN_EMAIL"
        assert "ADMIN_PASSWORD" in content, "Should load ADMIN_PASSWORD"
        
        print("✓ conftest.py correctly loads secrets from environment")
    
    def test_env_test_file_exists(self):
        """The .env.test file should exist"""
        env_test_path = Path(__file__).parent.parent / ".env.test"
        assert env_test_path.exists(), ".env.test file should exist"
        
        content = env_test_path.read_text()
        assert "ADMIN_EMAIL" in content
        assert "ADMIN_PASSWORD" in content
        
        print("✓ .env.test file exists with required credentials")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
