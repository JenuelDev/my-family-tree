<script setup lang="ts">
import LogoPng from "./../assets/Logo/logo.png";
const logo = LogoPng;
</script>
<template>
    <main
        class="min-h-screen bg-[radial-gradient(circle_at_0%_0%,_#dbeafe_0%,_#eff6ff_28%,_#f8fafc_62%,_#ecfeff_100%)] font-['Manrope',_'Segoe_UI',_sans-serif]"
    >
        <section class="mx-auto max-w-5xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-8">
            <div class="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.09)] backdrop-blur sm:p-8 lg:p-12">
                <div class="flex flex-col items-center gap-6 text-center">
                    <img
                        class="w-36 rounded-2xl border border-white bg-white p-2 object-cover shadow-lg sm:w-44 lg:w-48"
                        alt="FamTree logo"
                        :src="logo"
                    />
                    <span class="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-700 tracking-wide text-cyan-700">
                        Family Tree Management, Reimagined
                    </span>
                    <h1 class="max-w-3xl text-balance text-3xl font-800 leading-tight text-slate-900 sm:text-5xl">
                        Build, organize, and share your family history in one modern workspace.
                    </h1>
                    <p class="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                        FamTree helps you map relationships, preserve memories, and collaborate with relatives through a
                        clean and intuitive family tree experience.
                    </p>

                    <div class="flex flex-wrap justify-center gap-3">
                        <button
                            class="inline-flex cursor-pointer items-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-700 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 sm:text-base"
                            @click="$router.push({ name: 'login' })"
                        >
                            Start
                        </button>
                    </div>

                    <div class="mt-2 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p class="text-xs uppercase tracking-wide text-slate-500">Fast Setup</p>
                            <p class="mt-1 text-sm font-700 text-slate-800">Create your tree in minutes</p>
                        </div>
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p class="text-xs uppercase tracking-wide text-slate-500">Private Sharing</p>
                            <p class="mt-1 text-sm font-700 text-slate-800">Invite only your family members</p>
                        </div>
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p class="text-xs uppercase tracking-wide text-slate-500">Living History</p>
                            <p class="mt-1 text-sm font-700 text-slate-800">Capture stories across generations</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="mt-6 rounded-2xl border border-white/70 bg-white/70 px-4 py-4 text-sm text-slate-600 shadow-sm sm:px-6">
                <div class="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
                    <div class="flex items-center gap-2">
                        <img class="h-8 w-8 rounded-lg object-cover" alt="FamTree logo" :src="logo" />
                        <span class="font-700 text-slate-800">FamTree</span>
                    </div>
                    <a
                        href="https://www.jenuel.dev"
                        class="inline-flex items-center rounded-xl border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm font-800 tracking-wide text-slate-900 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Built by Jenuel.Dev
                    </a>
                    <p class="text-slate-500">© 2026</p>
                </div>
            </footer>
        </section>
    </main>
</template>
