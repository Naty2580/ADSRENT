import { ref, computed, provide, inject } from 'vue'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

export type SidebarState = 'expanded' | 'collapsed'

export const useSidebarProvider = () => {
  const open = ref(true)
  const openMobile = ref(false)
  const isMobile = ref(false) // Replace with actual mobile detection logic

  const state = computed<SidebarState>(() => (open.value ? 'expanded' : 'collapsed'))

  const setOpen = (value: boolean) => {
    open.value = value
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }

  const toggleSidebar = () => {
    isMobile.value ? (openMobile.value = !openMobile.value) : setOpen(!open.value)
  }

  provide('sidebar', {
    open,
    openMobile,
    isMobile,
    state,
    setOpen,
    toggleSidebar,
  })
}

export const useSidebar = () => {
  const context = inject('sidebar')
  if (!context) throw new Error('useSidebar must be used within SidebarProvider')
  return context
}