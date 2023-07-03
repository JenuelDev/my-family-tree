import { defineStore } from "pinia";
import { computed, ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
    const user = ref<null | { displayName: string, email: string }>(null)

    return {
        user,
        userDisplayName: computed(() => user.value?.displayName)
    }
})