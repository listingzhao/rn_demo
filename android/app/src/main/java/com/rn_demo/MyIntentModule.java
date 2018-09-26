package com.rn_demo;

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationCausedNativeException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Activity 与React 交互模块
 */
public class MyIntentModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;

    public MyIntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        return "IntentMoudle";
    }

    @ReactMethod
    public void startActivityFromJs(String name, String params) {
        try {
            Activity currentActivity = getCurrentActivity();
            if(null != currentActivity) {
                Class toActivity = Class.forName(name);
                Intent intent = new Intent(currentActivity, toActivity);
                intent.putExtra("data", params);
                currentActivity.startActivity(intent);
            }
        }catch (Exception e) {
            throw new JSApplicationCausedNativeException("不能打开Activity:" + e.getMessage());
        }
    }

    public void nativeCallRn(String msg) {
        Log.e("nativeCallRn", msg);
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("nativeCallRn", msg);
    }

    @ReactMethod
    public void rnCallNativeFromCallback(String msg, Callback callback) {
        String result = "处理结果：" + msg;
        callback.invoke(result);
    }

    @ReactMethod
    public void rnCallNativeFromPromise(String msg, Promise promise) {
        Log.e("---", msg);
        String result = "处理结果：" + msg;
        promise.resolve(result);
    }

    @ReactMethod
    public void dataToJs(Callback successBack, Callback errorBack) {
        try {
            Activity currentActivity = getCurrentActivity();
            String result = currentActivity.getIntent().getStringExtra("result");
            if(TextUtils.isEmpty(result)) {
                result = "没有数据";
            }
            successBack.invoke(result);
        } catch (Exception e) {
            errorBack.invoke(e.getMessage());
        }
    }
}
