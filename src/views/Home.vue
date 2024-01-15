<template>
    <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <img
                class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                alt="hero"
                src="https://dummyimage.com/720x600"
            />
            <div class="text-center lg:w-2/3 w-full">
                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    KinConnect: Your Family Tree Manager
                </h1>
                <p class="mb-8 leading-relaxed">
                    KinConnect is a sophisticated application designed for the meticulous management of familial
                    connections. Leveraging the versatile aspects of 'Kin'—representing a group of individuals with
                    common ancestry or kindred relations—our platform serves as a nexus for connecting kindreds.
                    Seamlessly merging technology with the essence of shared heritage, our intuitive tools empower users
                    to effortlessly navigate and organize their family trees, fostering a sense of connection and
                    belonging among relatives. The application also features a user-friendly sharing functionality,
                    facilitating the seamless exchange of genealogical information among family members and creating a
                    comprehensive network of shared histories.
                </p>
                <div class="flex justify-center">
                    <button
                        class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg cursor-pointer"
                        @click="$router.push({ name: 'login' })"
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    </section>
    <footer class="text-gray-600 body-font">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col justify-center gap-4">
            <a
                href="https://www.linkedin.com/in/jenuelganawed/"
                class="text-gray-600 ml-1"
                rel="noopener noreferrer"
                target="_blank"
            >
                @BroJenuel
            </a>
            <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span class="ml-3 text-xl">Tailblocks</span>
            </a>
            <p class="text-sm text-gray-500">
                © 2020 Tailblocks
            </p>
        </div>
    </footer>
</template>
