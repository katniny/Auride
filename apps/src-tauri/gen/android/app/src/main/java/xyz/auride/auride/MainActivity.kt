package xyz.auride.auride

import android.os.Bundle
import android.view.KeyEvent
import android.webkit.WebView
import androidx.activity.enableEdgeToEdge
import androidx.activity.OnBackPressedCallback

// thanks paoloose, i couldnt be asked otherwise!
// https://github.com/tauri-apps/tauri/issues/8142#issuecomment-3343871967
class MainActivity : TauriActivity() {
  private lateinit var wv: WebView

  override fun onWebViewCreate(webView: WebView) {
    wv = webView
  }

  private fun handleBackPress(): Boolean {
    wv.evaluateJavascript(/* script = */ """
      try {
        window.androidBackCallback()
      } catch (_) {
        true
      }
    """.trimIndent()) { result ->
      if (result == "true") {
        // Allow default back behavior
        finish()
      }
    }
    return true
  }

  override fun dispatchKeyEvent(event: KeyEvent): Boolean {
    if (event.keyCode == KeyEvent.KEYCODE_BACK && event.action == KeyEvent.ACTION_DOWN) {
      return handleBackPress()
    }
    return super.dispatchKeyEvent(event)
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)

    // Modern back button handling
    onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
      override fun handleOnBackPressed() {
        handleBackPress()
      }
    })
  }
}
