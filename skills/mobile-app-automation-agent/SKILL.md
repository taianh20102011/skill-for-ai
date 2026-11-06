---
name: mobile-app-automation-agent
description: Build autonomous mobile agents for automated UI testing, element interaction, crash log diagnostics, and end-to-end flows using Appium and LaVague.
---

# Mobile Application Automation & Testing Agent Skill

This skill guides the construction of autonomous testing agents for mobile applications (Android via UIAutomator2, iOS via XCUITest, and Flutter integration).

## 1. Core Architecture
- **Protocol**: W3C WebDriver specification via Appium 2.x server.
- **Large Action Models (LAM)**: LaVague integration converting multimodal screenshots and accessibility hierarchies into deterministic mobile gestures (tap, scroll, swipe, pinch).
- **Crash Recovery**: Inspect `adb logcat` (Android) or `syslog` (iOS) automatically upon unexpected activity termination.

## 2. Standard Appium Python Scripting Pattern
```python
from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy

def run_mobile_test():
    options = UiAutomator2Options()
    options.platform_name = "Android"
    options.device_name = "Android Emulator"
    options.app = "/path/to/app.apk"
    options.automation_name = "UiAutomator2"

    driver = webdriver.Remote("http://127.0.0.1:4723", options=options)
    
    try:
        # Locate elements by accessibility ID or XPath
        login_btn = driver.find_element(AppiumBy.ACCESSIBILITY_ID, "login_button")
        login_btn.click()
        
        # Take screenshot for visual verification
        driver.save_screenshot("login_screen.png")
    finally:
        driver.quit()
```

## 3. Best Practices
- Never hardcode fixed sleep timers (`time.sleep`); use explicit dynamic waits (`WebDriverWait`).
- Prioritize Accessibility IDs over brittle XPaths for cross-platform selector stability.
- Feed UI snapshots to vision models for automated visual regression detection (layout overflow, unrendered fonts).
