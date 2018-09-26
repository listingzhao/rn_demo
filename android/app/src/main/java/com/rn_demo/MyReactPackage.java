package com.rn_demo;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MyReactPackage implements ReactPackage {

    public MyIntentModule mModule;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        mModule = new MyIntentModule(reactContext);
        return Arrays.<NativeModule>asList(mModule);
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new PullLayout());
    }
}
