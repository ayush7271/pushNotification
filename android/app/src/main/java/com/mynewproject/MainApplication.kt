package com.mynewproject

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.soloader.SoLoader
import io.invertase.firebase.app.ReactNativeFirebaseApp
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage



class MainApplication : Application(), ReactApplication {

    private val mReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            return PackageList(this).packages.apply {
                // Add any packages manually here
                add(ReactNativeFirebaseMessagingPackage())
                ReactNativePushNotificationPackage() 
            }
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, /* native exopackage */ false)
        ReactNativeFirebaseApp.initialize(this)
    }
}
