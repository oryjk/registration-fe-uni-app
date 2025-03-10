<template>
  <!-- signup-container 设置为固定定位 -->
  <view class="signup-container" :style="{ 'padding-top': windowTop + 'px', 'height': contentHeight + 'px' }">
    <!-- 假设默认header高度为100rpx，可根据实际情况调整 -->
    <view class="match-info">
      <view class="header" style="display: flex; flex-direction: column;"> <!-- 增加 margin-top 以避免被 stat-overview 挡住 -->
        <uni-title :title="currentCompetition.title" level="3" color="#333" size="36rpx"></uni-title>
        <text class="info">比赛时间: {{ formatDate(currentCompetition.deadline) }}</text>
        <text class="info">比赛地点: {{ currentCompetition.location || '暂无' }}</text>
        <text class="info">对手: {{ currentCompetition.opponent || '暂无' }}</text>
        <text class="info">比赛球服颜色: {{ currentCompetition.uniformColor || '暂无' }}</text>
        <text class="date">截止日期: {{ formatDate(currentCompetition.deadline) }}</text>
      </view>

      <!-- 报名统计概览 -->
      <view class="stat-overview">
        <view class="stat-item">
          <text class="stat-number">{{ participantsList.length }}</text>

        </view>
        <view class="stat-item">
          <text class="stat-number">{{ notParticipatingList.length }}</text>

        </view>
        <view class="stat-item">
          <text class="stat-number">{{ undecidedList.length }}</text>

        </view>
      </view>
    </view>
    <!-- 为内容区域添加一个容器，设置合适的外边距 -->
    <view class="content-container">
      <!-- 报名选项卡 -->
      <uni-segmented-control :current="currentTab" :values="tabValues" @clickItem="onTabChange" style-type="text"
        active-color="#007AFF" />

      <!-- 参与人员列表 -->
      <view class="member-list-container">
        <template v-if="currentTab === 0">
          <view class="members-list" v-if="participantsList.length > 0">
            <view class="member-item" v-for="( member, index ) in  participantsList " :key="index">
              <image class="avatar" :src="member.avatar" mode="aspectFill"></image>
              <text class="nickname">{{ member.nickname }}</text>
            </view>
          </view>
          <view class="empty-list" v-else>
            <uni-icons type="info" size="50" color="#cccccc"></uni-icons>
            <text>暂无人员报名参加</text>
          </view>
        </template>

        <template v-if="currentTab === 1">
          <view class="members-list" v-if="notParticipatingList.length > 0">
            <view class="member-item" v-for="( member, index ) in  notParticipatingList " :key="index">
              <image class="avatar" :src="member.avatar" mode="aspectFill"></image>
              <text class="nickname">{{ member.nickname }}</text>
            </view>
          </view>
          <view class="empty-list" v-else>
            <uni-icons type="info" size="50" color="#cccccc"></uni-icons>
            <text>暂无人员不参加</text>
          </view>
        </template>

        <template v-if="currentTab === 2">
          <view class="members-list" v-if="undecidedList.length > 0">
            <view class="member-item" v-for="( member, index ) in  undecidedList " :key="index">
              <image class="avatar" :src="member.avatar" mode="aspectFill"></image>
              <text class="nickname">{{ member.nickname }}</text>
            </view>
          </view>
          <view class="empty-list" v-else>
            <uni-icons type="info" size="50" color="#cccccc"></uni-icons>
            <text>没有未表态的人员</text>
          </view>
        </template>
      </view>
    </view>
    <!-- 底部报名按钮 -->
    <view class="footer" :style="bottomStyle">
      <view v-if="isLoggedIn" class="signup-buttons">
        <button class="btn participate" :class="{ active: userStatus === 'participate' }"
          @click="handleSignup('participate')">报名参加</button>
        <button class="btn not-participate" :class="{ active: userStatus === 'not-participate' }"
          @click="handleSignup('not-participate')">不参加</button>
      </view>
      <view v-else class="login-prompt" @click="navigateToLogin">
        <text>未登录，点击登录</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.signup-container {
  // 修改为固定定位
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
  z-index: 100; // 设置 z-index 确保在最上层
}

.match-info {
  position: fixed;
  top: 40rpx; // 根据实际情况调整
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  // padding: 30rpx 0 0;
  background-color: #ffffff;
  // margin-bottom: 20rpx;
  z-index: 100; // 设置 z-index 确保在最上层
  height: 25%;

  .header {
    background-color: #ffffff;
    padding: 30rpx;
    border-bottom: 1rpx solid #eaeaea;
    height: 260rpx;


    .title {
      font-size: 36rpx;
      font-weight: bold;
      display: block;
      margin-bottom: 10rpx;
    }

    .date {
      font-size: 28rpx;
      color: #666;
    }
  }

  .stat-overview {
    display: flex;
    justify-content: space-around;
    height: 80rpx;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .stat-number {
        font-size: 48rpx;
        font-weight: bold;
        color: #007AFF;
      }

      .stat-label {
        font-size: 28rpx;
        color: #666;
        margin-top: 10rpx;
      }
    }
  }
}

// 新增内容容器样式
.content-container {
  margin-top: 370rpx; // 根据实际情况调整，确保内容不被遮住
  min-height: calc(100vh - 200rpx); // 调整高度
  height: 68%;

  .member-list-container {
    flex: 1;
    background-color: #ffffff;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 12rpx;
    height: 60%;

    .members-list {
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;
      /* 开启垂直滚动 */
      height: 100%;

      .member-item {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30rpx;

        .avatar {
          width: 120rpx;
          height: 120rpx;
          border-radius: 60rpx;
          background-color: #eeeeee;
        }

        .nickname {
          font-size: 26rpx;
          margin-top: 10rpx;
          color: #333;
          text-align: center;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .empty-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 100rpx 0;
      color: #999;
      font-size: 28rpx;

      text {
        margin-top: 20rpx;
      }
    }
  }
}

.footer {
  position: fixed;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  z-index: 100;
  height: 7%;

  .signup-buttons {
    display: flex;
    justify-content: space-between;

    .btn {
      width: 48%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 40rpx;
      font-size: 30rpx;
      color: #ffffff;

      &.participate {
        background-color: #007AFF;

        &.active {
          background-color: #005bb5;
        }
      }

      &.not-participate {
        background-color: #FF3B30;

        &.active {
          background-color: #d9302b;
        }
      }
    }
  }

  .login-prompt {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background-color: #f1f1f1;
    border-radius: 40rpx;
    color: #666;
    font-size: 30rpx;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import UniSegmentedControl from '@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue';
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import UniTitle from '@dcloudio/uni-ui/lib/uni-title/uni-title.vue';



// 当前用户信息
const userInfo = ref<any>(null);
const isLoggedIn = ref(false);
const userStatus = ref('');

const tabBarHeight = ref(0);
const windowTop = ref(0);
const contentHeight = ref(0);

const bottomStyle = computed(() => {
  return {
    bottom: `${tabBarHeight.value}px`
  };
});

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync();
  tabBarHeight.value = systemInfo.windowBottom;
  windowTop.value = systemInfo.windowTop;
  contentHeight.value = systemInfo.screenHeight - systemInfo.windowBottom - systemInfo.windowTop;
});

// 比赛信息
const currentCompetition = ref({
  id: 1,
  title: '周四友谊赛',
  deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3天后截止
  description: '校内篮球友谊赛',
  location: '学校篮球场', // 新增属性
  opponent: '隔壁学校队', // 新增属性
  uniformColor: '蓝色' // 新增属性
});

// 选项卡设置
const currentTab = ref(0);
const tabValues = ['已参加', '不参加', '未表态'];

// 人员列表数据
const membersList = ref([
  { id: 1, nickname: '张三', avatar: '/static/avatar/avatar1.png', status: 'participate' },
  { id: 2, nickname: '李四', avatar: '/static/avatar/avatar2.png', status: 'participate' },
  { id: 8, nickname: '吴十', avatar: '/static/avatar/avatar8.png', status: 'participate' },
  { id: 9, nickname: '郑十一', avatar: '/static/avatar/avatar9.png', status: 'participate' },
  { id: 10, nickname: '王十二', avatar: '/static/avatar/avatar10.png', status: 'participate' },
  { id: 11, nickname: '冯十三', avatar: '/static/avatar/avatar11.png', status: 'participate' },
  { id: 12, nickname: '陈十四', avatar: '/static/avatar/avatar12.png', status: 'participate' },
  { id: 13, nickname: '褚十五', avatar: '/static/avatar/avatar13.png', status: 'participate' },
  { id: 14, nickname: '卫十六', avatar: '/static/avatar/avatar14.png', status: 'participate' },
  { id: 15, nickname: '蒋十七', avatar: '/static/avatar/avatar15.png', status: 'participate' },
  { id: 16, nickname: '沈十八', avatar: '/static/avatar/avatar16.png', status: 'participate' },
  { id: 17, nickname: '韩十九', avatar: '/static/avatar/avatar17.png', status: 'participate' },
  { id: 18, nickname: '杨二十', avatar: '/static/avatar/avatar18.png', status: 'participate' },
  { id: 19, nickname: '朱二十一', avatar: '/static/avatar/avatar19.png', status: 'participate' },
  { id: 20, nickname: '秦二十二', avatar: '/static/avatar/avatar20.png', status: 'participate' },
  { id: 21, nickname: '尤二十三', avatar: '/static/avatar/avatar21.png', status: 'participate' },
  { id: 22, nickname: '许二十四', avatar: '/static/avatar/avatar22.png', status: 'participate' },
  { id: 23, nickname: '何二十五', avatar: '/static/avatar/avatar23.png', status: 'participate' },
  { id: 24, nickname: '吕二十六', avatar: '/static/avatar/avatar24.png', status: 'participate' },
  { id: 25, nickname: '施二十七', avatar: '/static/avatar/avatar25.png', status: 'participate' },
  { id: 26, nickname: '张二十八', avatar: '/static/avatar/avatar26.png', status: 'participate' },
  { id: 27, nickname: '孔二十九', avatar: '/static/avatar/avatar27.png', status: 'participate' },
  { id: 28, nickname: '曹三十', avatar: '/static/avatar/avatar28.png', status: 'participate' },
  { id: 29, nickname: '严三十一', avatar: '/static/avatar/avatar29.png', status: 'participate' },
  { id: 30, nickname: '华三十二', avatar: '/static/avatar/avatar30.png', status: 'participate' },
  { id: 31, nickname: '金三十三', avatar: '/static/avatar/avatar31.png', status: 'participate' },
  { id: 32, nickname: '魏三十四', avatar: '/static/avatar/avatar32.png', status: 'participate' },
  { id: 33, nickname: '陶三十五', avatar: '/static/avatar/avatar33.png', status: 'participate' },
  { id: 34, nickname: '姜三十六', avatar: '/static/avatar/avatar34.png', status: 'participate' },
  { id: 35, nickname: '戚三十七', avatar: '/static/avatar/avatar35.png', status: 'participate' },
  { id: 36, nickname: '谢三十八', avatar: '/static/avatar/avatar36.png', status: 'participate' },
  { id: 37, nickname: '邹三十九', avatar: '/static/avatar/avatar37.png', status: 'participate' },
  { id: 3, nickname: '王五', avatar: '/static/avatar/avatar3.png', status: 'not-participate' },
  { id: 4, nickname: '赵六', avatar: '/static/avatar/avatar4.png', status: 'not-participate' },
  { id: 5, nickname: '钱七', avatar: '/static/avatar/avatar5.png', status: 'undecided' },
  { id: 6, nickname: '孙八', avatar: '/static/avatar/avatar6.png', status: 'undecided' },
  { id: 7, nickname: '杨九', avatar: '/static/avatar/avatar7.png', status: 'undecided' },
]);

// 根据状态分类的列表
const participantsList = computed(() => {
  return membersList.value.filter(member => member.status === 'participate');
});

const notParticipatingList = computed(() => {
  return membersList.value.filter(member => member.status === 'not-participate');
});

const undecidedList = computed(() => {
  return membersList.value.filter(member => member.status === 'undecided');
});

// 格式化日期
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 选项卡切换
const onTabChange = (e: any) => {
  currentTab.value = e.currentIndex;
};

// 处理报名
const handleSignup = (status: string) => {
  if (!isLoggedIn.value) {
    navigateToLogin();
    return;
  }

  userStatus.value = status;

  // 这里模拟API请求更新用户状态
  // 实际开发中需要替换为真实API调用
  setTimeout(() => {
    uni.showToast({
      title: status === 'participate' ? '报名成功' : '已取消报名',
      icon: 'success'
    });

    // 更新当前用户在列表中的状态
    if (userInfo.value) {
      const userIndex = membersList.value.findIndex(member => member.id === userInfo.value.id);
      if (userIndex !== -1) {
        membersList.value[userIndex].status = status;
      }
    }
  }, 500);
};

// 导航到登录页面
const navigateToLogin = () => {
  uni.navigateTo({
    url: '/pages/my/my'
  });
};

// 检查登录状态
const checkLoginStatus = () => {
  // 实际开发中应从storage或后端获取用户信息
  try {
    const loginInfo = uni.getStorageSync('loginInfo');
    if (loginInfo) {
      userInfo.value = JSON.parse(loginInfo);
      isLoggedIn.value = true;

      // 找到当前用户的报名状态
      const currentUser = membersList.value.find(member => member.id === userInfo.value.id);
      if (currentUser) {
        userStatus.value = currentUser.status;
      }
    }
  } catch (e) {
    console.error('获取登录信息失败', e);
  }
};

onMounted(() => {
  checkLoginStatus();
});
</script>
