<template>
  <div class="p-3" :class="className">
    <VueCal
      :selected-date="selectedDate"
      :show-outside-days="showOutsideDays"
      :class-names="mergedClassNames"
      :hide-view-selector="true"
      :disable-views="['years', 'week', 'day']"
      :on-cell-click="onDateSelect"
    >
      <template #prev>
        <ChevronLeft class="size-4 opacity-50 hover:opacity-100" />
      </template>
      <template #next>
        <ChevronRight class="size-4 opacity-50 hover:opacity-100" />
      </template>
    </VueCal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

import {ChevronLeft,ChevronRight} from "lucide-vue-next"

const props = defineProps({
  className: String,
  classNames: Object,
  showOutsideDays: {
    type: Boolean,
    default: true,
  },
})

const selectedDate = ref(null)

function onDateSelect(date) {
  selectedDate.value = date
}

const defaultClassNames = {
  months: 'flex flex-col sm:flex-row gap-2',
  month: 'flex flex-col gap-4',
  caption: 'flex justify-center pt-1 relative items-center w-full',
  caption_label: 'text-sm font-medium',
  nav: 'flex items-center gap-1',
  nav_button: 'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
  nav_button_previous: 'absolute left-1',
  nav_button_next: 'absolute right-1',
  table: 'w-full border-collapse space-x-1',
  head_row: 'flex',
  head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
  row: 'flex w-full mt-2',
  cell: 'relative p-0 text-center text-sm',
  day: 'size-8 p-0 font-normal aria-selected:opacity-100',
  day_selected:
    'bg-primary text-primary-foreground hover:bg-primary focus:bg-primary',
  day_today: 'bg-accent text-accent-foreground',
  day_outside: 'text-muted-foreground opacity-50',
  day_disabled: 'text-muted-foreground opacity-50',
  day_hidden: 'invisible',
}

const mergedClassNames = computed(() => ({
  ...defaultClassNames,
  ...props.classNames,
}))
</script>