import { logout } from "@/util/auth";
import { Loading } from "notiflix";
import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { useRouter } from "vue-router";

export const useUserStore = defineStore('userStore', () => {
    const router = useRouter()
    const user = ref<null | { displayName: string, email: string }>(null)

    async function signOut() {
        Loading.hourglass();
        logout().then(() => {
            user.value = null;
            router.push('/');
        }).catch(() => {
            alert("Their is an Error Logging out.");
        }).finally(() => {
            Loading.remove();
        })
    }

    return {
        user,
        signOut,
        userDisplayName: computed(() => user.value?.displayName)
    }
})