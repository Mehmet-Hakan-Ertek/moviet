<script setup>
  const props = defineProps(['searchedItem']);
  const { name } = props.searchedItem;
</script>

<template>
  <div class="w-full border-b pl-[30px] pt-[3px] pb-[3px] text-left cursor-pointer hover:bg-[#eee]">
    <div class="text-black">{{ name }}</div>
  </div>
</template>