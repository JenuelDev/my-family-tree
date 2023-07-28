<script lang="ts" setup>
import Button from "primevue/button";
import { addFamily, getFamilies } from "@/util/firebase";
import { Icon } from "@iconify/vue";
import AddFamilyTreeModal from "./Partials/AddNewClanModal.vue";
import { onMounted, ref } from "vue";
import { Block, Loading } from "notiflix";
import type { DocumentData } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();
const families = ref<Array<DocumentData>>([]);
const showAddFamilyTreeModal = ref(false);

async function AddFamily(ClanName: string) {
    Loading.hourglass();
    await addFamily(ClanName);
    await getFamilyList(true);
    showAddFamilyTreeModal.value = false;
    Loading.remove();
}

async function getFamilyList(refresh = false) {
    if (refresh) families.value = [];

    Block.hourglass("#list-of-family-trees");
    const data = await getFamilies();
    data?.forEach((doc) => {
        families.value.push({ ...doc.data(), ...{ id: doc.id } });
    });
    
    Block.remove("#list-of-family-trees");
}

onMounted(async () => {
    await getFamilyList();
});
</script>
<template>
    <div class="p-10px max-w-500px mx-auto">
        <div class="flex justify-between items-center">
            <h3>Your List of Family Tree</h3>
            <div>
                <Button label="Add Family Tree" size="small" @click="showAddFamilyTreeModal = true">
                    <template #icon>
                        <Icon icon="mdi:add-bold" />
                    </template>
                </Button>
            </div>
        </div>
        <div id="list-of-family-trees" class="flex flex-col gap-1 min-h-200px">
            <template v-if="families.length">
                <div
                    v-for="family in families"
                    :key="family.id"
                    class="p-3 border border-dark cursor-pointer shadow-none hover:shadow-md transition-all duration-500"
                    @click="router.push({
                    name: 'view-family-tree',
                    params: {
                        id: family.id
                    }
                })"
                >
                    <div>{{ family.name }}</div>
                </div>
            </template>
            <div v-else class="h-300px flex items-center justify-center">
                <div class="flex items-center flex-col">
                    <Icon class="text-size-50px " icon="iconoir:info-empty" />
                    Empty Data
                </div>
            </div>
        </div>
    </div>
    <AddFamilyTreeModal v-model="showAddFamilyTreeModal" @entered-name="(data) => AddFamily(data)" />
</template>
