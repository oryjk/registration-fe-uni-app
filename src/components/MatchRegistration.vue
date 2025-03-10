<script setup lang="ts">
import { defineProps } from 'vue';
import type { Match } from '@/models/Match';
import MatchDetails from '@/components/MatchDetails.vue';

defineProps<{ match: Match }>();
</script>

<template>
  <view class="match-registration-container">
    <h2 class="registration-title">比赛注册详情</h2>
    <MatchDetails :match="match" />
  </view>
</template>

<style scoped>
.match-registration-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
.registration-title {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}
</style>