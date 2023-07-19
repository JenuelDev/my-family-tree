import { defineStore } from "pinia";
import { ref } from "vue";

export const useFamilyTreeStore = defineStore('useFamilyTreeStore', () => {
    const familyTree = ref<Array<any>>([]);

    return {
        familyTree
    }
});