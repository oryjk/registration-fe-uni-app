<template>
  <view>
    <h2>比赛历史详情</h2>
    <MatchDetails v-for="match in matchHistory" :key="match.id" :match="match" />
  </view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { MatchHistory } from '@/models/MatchHistory';
import MatchDetails from '@/components/MatchDetails.vue';

defineProps<{ matchHistory: MatchHistory[] }>();
</script>