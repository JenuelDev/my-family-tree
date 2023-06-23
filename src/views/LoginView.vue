<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = reactive({
    email: null,
    password: null,
});

function login() {
    router.push("/main");
}
</script>

<template>
    <form @submit.prevent="login" class="w-300px flex flex-col mx-auto mt-5 shadow p-10px gap-15px">
        <div class="w-full">
            <div>Email Address</div>
            <input
                type="text"
                v-model="form.email"
                placeholder="ex. example@gmail.com"
                class="w-full p-2 rounded-md border-none"
            />
        </div>
        <div>
            <div>Password</div>
            <input
                type="password"
                v-model="form.password"
                placeholder="enter your password"
                class="w-full p-2 rounded-md border-none"
            />
        </div>
        <button
            type="submit"
            class="rounded-md border-none p-2 cursor-pointer transform scale-100 active:scale-95 transition-all"
        >
            Login
        </button>
    </form>
</template>
