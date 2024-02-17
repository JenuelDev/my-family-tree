<script setup lang="ts">
import LogoPng from "@/assets/Logo/Logo.png";
const logo = LogoPng;
</script>
<template>
    <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-14 items-center justify-center flex-col">
            <img
                class="lg:w-2/6 md:w-3/6 w-5/6 object-cover object-center rounded"
                alt="hero"
                :src="logo"
            />
            <div class="text-center lg:w-2/3 w-full">
                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    FamTree: Your Family Tree Manager
                </h1>
                <div class="flex justify-center">
                    <button
                        class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg cursor-pointer"
                        @click="$router.push({ name: 'login' })"
                    >
                        Start
                    </button>
                </div>
                <p class="mb-8 leading-relaxed">
                    FamTree is a sophisticated application designed for the meticulous management of familial
                    connections. Leveraging the versatile aspects of 'Kin'—representing a group of individuals with
                    common ancestry or kindred relations—our platform serves as a nexus for connecting kindreds.
                    Seamlessly merging technology with the essence of shared heritage, our intuitive tools empower users
                    to effortlessly navigate and organize their family trees, fostering a sense of connection and
                    belonging among relatives. The application also features a user-friendly sharing functionality,
                    facilitating the seamless exchange of genealogical information among family members and creating a
                    comprehensive network of shared histories.
                </p>
            </div>
        </div>
    </section>
    <footer class="text-gray-600 body-font">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col justify-center gap-4">
            <span> by </span>
            <a
                href="https://www.linkedin.com/in/jenuelganawed/"
                class="text-gray-600 ml-1"
                rel="noopener noreferrer"
                target="_blank"
            >
                BroJenuel
            </a>
            <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <img class="w-20 object-cover object-center rounded" alt="hero" src="@/assets/Logo/Logo.png" />
                <span class="ml-3 text-xl">FamTree</span>
            </a>
            <p class="text-sm text-gray-500">© 2020</p>
        </div>
    </footer>
</template>
