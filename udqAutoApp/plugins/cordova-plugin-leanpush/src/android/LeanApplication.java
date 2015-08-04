package me.xyzhang.cordova.leanpush;

import android.app.Application;
import android.content.Context;

import com.avos.avoscloud.PushService;
import com.avos.avoscloud.AVInstallation;
import com.avos.avoscloud.AVOSCloud;
import com.avos.avoscloud.AVAnalytics;

import com.udianqu.auto.MainActivity;

public class LeanApplication extends Application
{
    private static LeanApplication instance = new LeanApplication();

    public LeanApplication() {
        instance = this;
    }

    public static Context getContext() {
        return instance;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // register device for leancloud
        AVOSCloud.initialize(this, "so0w0vlsvdiwznl3kjeo5uha9eqxhixat1k1eik4bj2jv3tx", "a4sg6h1gqyfwxj91m6i93amk07i50qgsuqebo0jc4cs01d8u");
        AVInstallation.getCurrentInstallation().saveInBackground();
        PushService.setDefaultPushCallback(this, MainActivity.class);
        AVAnalytics.enableCrashReport(this.getApplicationContext(), true);
        AVOSCloud.setLastModifyEnabled(true);
        AVOSCloud.setDebugLogEnabled(true);
    }
}
