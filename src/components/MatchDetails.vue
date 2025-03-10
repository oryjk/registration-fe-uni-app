<template>
  <view class="match-item">
    <h3 class="match-header">{{ match.date }} - {{ match.opponent }}</h3>
    <view class="player-section">
      <h4 class="section-title">报名参加的球员</h4>
      <uni-list>
        <uni-list-item v-for="player in match.registeredPlayers" :key="player.id">
          <template v-slot:header>
            <image :src="player.avatar || defaultAvatar" class="player-avatar" mode="aspectFill"/>
          </template>
          <template v-slot:body>
            <text class="player-name">{{ player.nickname || player.name }}</text>
          </template>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="player-section">
      <h4 class="section-title">报名不参加的球员</h4>
      <uni-list>
        <uni-list-item v-for="player in match.unregisteredPlayers" :key="player.id">
          <template v-slot:header>
            <image :src="player.avatar || defaultAvatar" class="player-avatar" mode="aspectFill"/>
          </template>
          <template v-slot:body>
            <text class="player-name">{{ player.nickname || player.name }}</text>
          </template>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="player-section">
      <h4 class="section-title">未表态的球员</h4>
      <uni-list>
        <uni-list-item v-for="player in match.undecidedPlayers" :key="player.id">
          <template v-slot:header>
            <image :src="player.avatar || defaultAvatar" class="player-avatar" mode="aspectFill"/>
          </template>
          <template v-slot:body>
            <text class="player-name">{{ player.nickname || player.name }}</text>
          </template>
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<script setup lang="ts">
import {defineProps, ref} from 'vue';
import type {Match} from '@/models/Match';
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';

defineProps<{ match: Match }>();

// 默认头像，可以替换成你的默认头像资源
const defaultAvatar = ref('/static/default-avatar.png');
</script>

<style lang="scss" scoped>
@import "@/uni.scss"; /* 引入 uni-ui 默认样式 */

.match-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: $uni-bg-color;
  border-radius: $uni-border-radius-base;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.match-header {
  font-size: $uni-font-size-lg + 4px; // 稍大一些
  color: $uni-text-color;
  margin-bottom: 10px;
  text-align: center;
}

.player-section {
  margin-bottom: 15px;
}

.section-title {
  font-size: $uni-font-size-lg;
  color: $uni-text-color-grey;
  margin-bottom: 10px;
  border-bottom: 1px solid $uni-border-color;
  padding-bottom: 5px;
}

/* 使用 uni-list 和 uni-list-item 的默认样式 */
.uni-list {
  background-color: transparent; /* 移除默认背景色 */
}

.uni-list-item {
  padding: $uni-spacing-col-base $uni-spacing-row-base;
  border-bottom: 1px solid $uni-border-color;

  &:last-child {
    border-bottom: none; /* 移除最后一个 item 的分割线 */
  }

  &__content {
    display: flex;
    align-items: center;
  }
}

.uni-list-item__content-title {
  color: $uni-text-color;
}

.player-avatar {
  width: $uni-img-size-base;
  height: $uni-img-size-base;
  border-radius: $uni-border-radius-circle;
  margin-right: $uni-spacing-col-base;
  object-fit: cover;
}

.player-name {
  font-size: $uni-font-size-base;
  color: $uni-text-color;
}
</style>

