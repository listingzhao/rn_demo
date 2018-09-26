package com.rn_demo.view;

import android.support.annotation.NonNull;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.facebook.react.bridge.ReactContext;
import com.rn_demo.R;
import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshKernel;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.constant.RefreshState;
import com.scwang.smartrefresh.layout.constant.SpinnerStyle;
import com.scwang.smartrefresh.layout.internal.ProgressDrawable;
import com.scwang.smartrefresh.layout.internal.pathview.PathsView;
import com.scwang.smartrefresh.layout.util.DensityUtil;

public class Header extends LinearLayout implements RefreshHeader {
    static final String TAG = "HeaderLayout";
    ImageView pulling;
    ImageView pullrelease;
    ImageView pullok;
    LinearLayout header;
    private ReactContext reactContext;

    public Header(ReactContext context) {
        super(context);
        initView(context);
    }
    public Header(ReactContext context, AttributeSet attrs) {
        super(context, attrs);
        this.initView(context);
    }
    public Header(ReactContext context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.initView(context);
    }

    private void initView(ReactContext context) {
        this.reactContext = context;
        header = (LinearLayout) LayoutInflater.from(context).inflate(R.layout.header,null);
        pulling = header.findViewById(R.id.pulling);
        pullok = header.findViewById(R.id.pullok);
        pullrelease = header.findViewById(R.id.pullrelease);

        Glide.with(context).asGif().load(R.mipmap.pulling).into(pulling);//本地gif图片
        Glide.with(context).asGif().load(R.mipmap.pullrelease).into(pullrelease);
        pullok.setImageResource(R.mipmap.pullok);

        LayoutParams params = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
        params.gravity = Gravity.CENTER;
        this.addView(header,params);
        setMinimumHeight(DensityUtil.dp2px(60));
    }

    @Override
    public void onPullingDown(float percent, int offset, int headerHeight, int extendHeight) {
        Log.i(TAG,"onPullingDown");
    }

    @Override
    public void onReleasing(float percent, int offset, int headerHeight, int extendHeight) {
        Log.i(TAG,"onReleasing");
    }

    @Override
    public void onRefreshReleased(RefreshLayout layout, int headerHeight, int extendHeight) {

    }

    @NonNull
    @Override
    public View getView() {
        return this;
    }

    @NonNull
    @Override
    public SpinnerStyle getSpinnerStyle() {
        return SpinnerStyle.Translate;
    }

    @Override
    public void setPrimaryColors(int... colors) {
    }

    @Override
    public void onInitialized(@NonNull RefreshKernel kernel, int height, int extendHeight) {

    }

    @Override
    public void onHorizontalDrag(float percentX, int offsetX, int offsetMax) {

    }

    @Override
    public void onStartAnimator(@NonNull RefreshLayout layout, int height, int extendHeight) {

    }

    @Override
    public int onFinish(@NonNull RefreshLayout layout, boolean success) {
        if (success){
            this.pulling.setVisibility(GONE);
            this.pullok.setVisibility(VISIBLE);
            this.pullrelease.setVisibility(GONE);
        }
        return 500;//延迟500毫秒之后再弹回
    }

    @Override
    public boolean isSupportHorizontalDrag() {
        return false;
    }

    @Override
    public void onStateChanged(RefreshLayout refreshLayout, RefreshState oldState, RefreshState newState) {
        switch (newState) {
            case None:
            case PullDownToRefresh:
                Log.i(TAG,"PullDownToRefresh");
                this.pulling.setVisibility(VISIBLE);
                this.pullok.setVisibility(GONE);
                this.pullrelease.setVisibility(GONE);
                break;
            case Refreshing:
                Log.i(TAG,"Refreshing");
                this.pulling.setVisibility(VISIBLE);
                this.pullok.setVisibility(GONE);
                this.pullrelease.setVisibility(GONE);
                break;
            case ReleaseToRefresh:
                Log.i(TAG,"ReleaseToRefresh");
                this.pulling.setVisibility(VISIBLE);
                this.pullok.setVisibility(GONE);
                this.pullrelease.setVisibility(GONE);
                break;
        }
    }
}
