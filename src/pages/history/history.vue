<template>
  <view class="history-container">
    <text class="title">历史比赛</text>

    <view class="history-list">
      <view class="history-item" v-for="(item, index) in historyItems" :key="index" @click="viewDetail(item)">
        <view class="history-info">
          <text class="history-title">{{ item.title }}</text>
          <text class="history-date">{{ formatDate(item.date) }}</text>
        </view>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
    </view>

    <view class="empty-list" v-if="historyItems.length === 0">
      <uni-icons type="info" size="50" color="#cccccc"></uni-icons>
      <text>暂无历史记录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 历史比赛数据
const historyItems = ref([
  { id: 1, title: '篮球友谊赛', date: new Date('2023-11-05'), status: 'participated' },
  { id: 2, title: '足球联赛', date: new Date('2023-10-15'), status: 'not-participated' },
  { id: 3, title: '乒乓球比赛', date: new Date('2023-09-20'), status: 'participated' }
]);

// 格式化日期
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 查看详情
const viewDetail = (item: any) => {
  uni.navigateTo({
    url: `/pages/history/detail?id=${item.id}`
  });
};
</script>

<style lang="scss">
.history-container {
  padding: 30rpx;
  min-height: 100vh;
  background-color: #f5f5f5;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
  }

  .history-list {
    background-color: #ffffff;
    border-radius: 12rpx;
    overflow: hidden;

    .history-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #eaeaea;

      &:last-child {
        border-bottom: none;
      }

      .history-info {
        flex: 1;

        .history-title {
          font-size: 32rpx;
          color: #333;
          margin-bottom: 10rpx;
          display: block;
        }

        .history-date {
          font-size: 26rpx;
          color: #999;
        }
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
</style>