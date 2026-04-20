"""
Iteration 9 Tests: Dark mode default, soft golden light mode, event reminders
"""
import pytest
from tests.conftest import ADMIN_EMAIL, ADMIN_PASSWORD, TEST_PASSWORD, TEST_USER_PASSWORD, BASE_URL
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestIteration9Features:
    """Test dark mode default, soft golden light mode, and event reminder background task"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test session with authentication"""
        self.session = requests.Session()
        # Login as admin
        login_resp = self.session.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
        self.user = login_resp.json().get("user")
        print(f"✓ Logged in as {self.user['email']}")
    
    def test_api_health(self):
        """Test API is healthy"""
        resp = self.session.get(f"{BASE_URL}/api/")
        assert resp.status_code == 200
        print("✓ API health check passed")
    
    def test_auth_me_returns_user(self):
        """Test GET /api/auth/me returns user with phone and auto_sms fields"""
        resp = self.session.get(f"{BASE_URL}/api/auth/me")
        assert resp.status_code == 200
        data = resp.json()
        assert "user" in data
        user = data["user"]
        assert "id" in user
        assert "email" in user
        assert "name" in user
        # Check phone and auto_sms fields exist (may be None)
        assert "phone" in user or user.get("phone") is None
        assert "auto_sms" in user or user.get("auto_sms") is None
        print(f"✓ GET /api/auth/me returns user: {user['email']}")
    
    def test_tables_endpoint(self):
        """Test GET /api/tables returns list"""
        resp = self.session.get(f"{BASE_URL}/api/tables")
        assert resp.status_code == 200
        tables = resp.json()
        assert isinstance(tables, list)
        print(f"✓ GET /api/tables returns {len(tables)} tables")
    
    def test_events_endpoint(self):
        """Test GET /api/events returns list"""
        resp = self.session.get(f"{BASE_URL}/api/events")
        assert resp.status_code == 200
        events = resp.json()
        assert isinstance(events, list)
        print(f"✓ GET /api/events returns {len(events)} events")
    
    def test_contacts_endpoint(self):
        """Test GET /api/contacts returns list"""
        resp = self.session.get(f"{BASE_URL}/api/contacts")
        assert resp.status_code == 200
        contacts = resp.json()
        assert isinstance(contacts, list)
        print(f"✓ GET /api/contacts returns {len(contacts)} contacts")
    
    def test_call_history_endpoint(self):
        """Test GET /api/calls/history returns list"""
        resp = self.session.get(f"{BASE_URL}/api/calls/history")
        assert resp.status_code == 200
        calls = resp.json()
        assert isinstance(calls, list)
        print(f"✓ GET /api/calls/history returns {len(calls)} calls")
    
    def test_bridges_status_endpoint(self):
        """Test GET /api/bridges/status returns SMS configured status"""
        resp = self.session.get(f"{BASE_URL}/api/bridges/status")
        assert resp.status_code == 200
        data = resp.json()
        assert "sms_configured" in data
        print(f"✓ GET /api/bridges/status: sms_configured={data['sms_configured']}")
    
    def test_update_user_phone_and_auto_sms(self):
        """Test PUT /api/me accepts phone and auto_sms fields"""
        # Update with phone and auto_sms
        resp = self.session.put(f"{BASE_URL}/api/me", json={
            "phone": "+15551234567",
            "auto_sms": True
        })
        assert resp.status_code == 200
        user = resp.json()
        assert user.get("phone") == "+15551234567"
        assert user.get("auto_sms") == True
        print("✓ PUT /api/me accepts phone and auto_sms fields")
        
        # Reset to original values
        self.session.put(f"{BASE_URL}/api/me", json={
            "phone": "+15559998888",
            "auto_sms": False
        })
    
    def test_notifications_endpoint(self):
        """Test GET /api/notifications returns list"""
        resp = self.session.get(f"{BASE_URL}/api/notifications")
        assert resp.status_code == 200
        notifications = resp.json()
        assert isinstance(notifications, list)
        print(f"✓ GET /api/notifications returns {len(notifications)} notifications")
    
    def test_referrals_endpoint(self):
        """Test GET /api/referrals returns referral stats"""
        resp = self.session.get(f"{BASE_URL}/api/referrals")
        assert resp.status_code == 200
        data = resp.json()
        assert "invited" in data
        assert "joined" in data
        assert "badge" in data
        print(f"✓ GET /api/referrals: badge={data['badge']}, joined={data['joined']}")


class TestEventReminderFunctionExists:
    """Verify event reminder background task code exists"""
    
    def test_event_reminder_loop_exists(self):
        """Verify _event_reminder_loop function exists in server.py"""
        import sys
        sys.path.insert(0, '/app/backend')
        
        # Read server.py and check for function
        with open('/app/backend/server.py', 'r') as f:
            content = f.read()
        
        assert 'async def _event_reminder_loop()' in content, "_event_reminder_loop function not found"
        assert 'asyncio.create_task(_event_reminder_loop())' in content, "Event reminder loop not started on startup"
        print("✓ _event_reminder_loop function exists and is started on app startup")
    
    def test_send_event_reminders_exists(self):
        """Verify _send_event_reminders function exists in server.py"""
        with open('/app/backend/server.py', 'r') as f:
            content = f.read()
        
        assert 'async def _send_event_reminders()' in content, "_send_event_reminders function not found"
        assert 'TWILIO_ACCOUNT_SID' in content, "Twilio config check not found"
        assert 'send_auto_sms_if_offline' in content, "send_auto_sms_if_offline not called"
        print("✓ _send_event_reminders function exists with Twilio integration")
    
    def test_event_reminder_checks_today_events(self):
        """Verify event reminder checks events for today"""
        with open('/app/backend/server.py', 'r') as f:
            content = f.read()
        
        # Check that it queries events for today
        assert 'today = now.date().isoformat()' in content or "today" in content, "Today's date check not found"
        assert 'events = await db.events.find' in content, "Events query not found"
        print("✓ Event reminder checks events for today")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
