<template>
  <view class="my-container">
    <!-- 未登录状态 -->
    <view class="login-section" v-if="!isLoggedIn">
      <view class="avatar-placeholder">
        <uni-icons type="person" size="50" color="#cccccc"></uni-icons>
      </view>
      <button class="login-btn" @click="login">点击登录</button>
    </view>

    <!-- 已登录状态 -->
    <view class="user-info" v-else>
      <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
      <text class="nickname">{{ userInfo.nickname }}</text>
    </view>

    <!-- 功能列表 -->
    <view class="function-list">
      <view class="function-item" @click="gotoMySignups">
        <view class="function-content">
          <uni-icons type="calendar" size="20" color="#007AFF"></uni-icons>
          <text class="function-text">我的报名</text>
        </view>
        <uni-icons type="right" size="16"></uni-icons>
      </view>

      <view class="function-item" @click="gotoSettings">
        <view class="function-content">
          <uni-icons type="gear" size="20" color="#007AFF"></uni-icons>
          <text class="function-text">设置</text>
        </view>
        <uni-icons type="right" size="16"></uni-icons>
      </view>

      <view class="function-item" v-if="isLoggedIn" @click="logout">
        <view class="function-content">
          <uni-icons type="compose" size="20" color="#FF3B30"></uni-icons>
          <text class="function-text logout">退出登录</text>
        </view>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 登录状态和用户信息
const isLoggedIn = ref(false);
const userInfo = ref({
  id: 0,
  nickname: '',
  avatar: ''
});

// 检查登录状态
const checkLoginStatus = () => {
  try {
    const loginInfo = uni.getStorageSync('loginInfo');
    if (loginInfo) {
      userInfo.value = JSON.parse(loginInfo);
      isLoggedIn.value = true;
    }
  } catch (e) {
    console.error('获取登录信息失败', e);
  }
};

// 登录方法
const login = () => {
  // 实际项目中应跳转到登录页面或弹出登录窗口
  // 这里简单模拟登录过程
  const mockUser = {
    id: 1,
    nickname: '测试用户',
    avatar: '/static/avatar/default.png'
  };

  userInfo.value = mockUser;
  isLoggedIn.value = true;

  // 保存登录信息
  uni.setStorageSync('loginInfo', JSON.stringify(mockUser));

  uni.showToast({
    title: '登录成功',
    icon: 'success'
  });
};

// 退出登录
const logout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('loginInfo');
        isLoggedIn.value = false;
        userInfo.value = { id: 0, nickname: '', avatar: '' };

        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        });
      }
    }
  });
};

// 导航到我的报名页面
const gotoMySignups = () => {
  if (!isLoggedIn.value) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
    return;
  }

  uni.navigateTo({
    url: '/pages/my/signups'
  });
};

// 导航到设置页面
const gotoSettings = () => {
  uni.navigateTo({
    url: '/pages/my/settings'
  });
};

onMounted(() => {
  checkLoginStatus();
});
</script>

<style lang="scss">
.my-container {
  min-height: 100vh;
  background-color: #f5f5f5;

  .login-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 0;
    background-color: #ffffff;

    .avatar-placeholder {
      width: 160rpx;
      height: 160rpx;
      border-radius: 80rpx;
      background-color: #f1f1f1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30rpx;
    }

    .login-btn {
      background-color: #007AFF;
      color: #ffffff;
      width: 60%;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 30rpx;
      border-radius: 40rpx;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 0;
    background-color: #ffffff;

    .avatar {
      width: 160rpx;
      height: 160rpx;
      border-radius: 80rpx;
      margin-bottom: 20rpx;
    }

    .nickname {
      font-size: 36rpx;
      font-weight: bold;
    }
  }

  .function-list {
    margin-top: 20rpx;
    background-color: #ffffff;

    .function-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #eaeaea;

      &:last-child {
        border-bottom: none;
      }

      .function-content {
        display: flex;
        align-items: center;

        .function-text {
          margin-left: 20rpx;
          font-size: 30rpx;
          color: #333;

          &.logout {
            color: #FF3B30;
          }
        }
      }
    }
  }
}
</style>