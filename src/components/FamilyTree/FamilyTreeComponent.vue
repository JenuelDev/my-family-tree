<script setup lang="ts">
import FamilyTree from "@balkangraph/familytree.js";
import { onMounted, ref, watch } from "vue";

const treeRef = ref(null);
const data = ref([
    {
        id: 1,
        pids: [2],
        name: "King George VI",
        img: "https://cdn.balkan.app/shared/f1.png",
        gender: "male",
    },
    {
        id: 2,
        pids: [1],
        name: "Queen Elizabeth",
        title: "The Queen Mother",
        img: "https://cdn.balkan.app/shared/f2.png",
        gender: "female",
    },

    {
        id: 3,
        pids: [4],
        mid: 2,
        fid: 1,
        name: "Queen Elizabeth II",
        img: "https://cdn.balkan.app/shared/f5.png",
        gender: "female",
    },
    {
        id: 4,
        pids: [3],
        name: "Prince Philip",
        title: "Duke of Edinburgh",
        img: "https://cdn.balkan.app/shared/f3.png",
        gender: "male",
    },

    {
        id: 5,
        mid: 2,
        fid: 1,
        name: "Princess Margaret",
        img: "https://cdn.balkan.app/shared/f6.png",
        gender: "male",
    },

    {
        id: 6,
        mid: 3,
        fid: 4,
        pids: [7, 8],
        name: "Charles",
        title: "Prince of Wales",
        img: "https://cdn.balkan.app/shared/f8.png",
        gender: "male",
    },
    {
        id: 7,
        pids: [6],
        name: "Diana",
        title: "Princess of Wales",
        img: "https://cdn.balkan.app/shared/f9.png",
        gender: "female",
    },
    {
        id: 8,
        pids: [6],
        name: "Camila",
        title: "Duchess of Cornwall",
        img: "https://cdn.balkan.app/shared/f7.png",
        gender: "female",
    },

    {
        id: 9,
        mid: 3,
        fid: 4,
        name: "Anne",
        title: "Princess Royal",
        img: "https://cdn.balkan.app/shared/f10.png",
        gender: "female",
    },
    {
        id: 10,
        mid: 3,
        fid: 4,
        name: "Prince Andrew",
        title: "Duke of York",
        img: "https://cdn.balkan.app/shared/f11.png",
        gender: "male",
    },
    {
        id: 11,
        mid: 3,
        fid: 4,
        name: "Prince Edward",
        title: "Earl of Wessex",
        img: "https://cdn.balkan.app/shared/f12.png",
        gender: "male",
    },

    {
        id: 12,
        fid: 6,
        mid: 7,
        pids: [14],
        name: "Prince William",
        title: "Duch of Cambridge",
        img: "https://cdn.balkan.app/shared/f14.png",
        gender: "male",
    },
    {
        id: 13,
        fid: 6,
        mid: 7,
        pids: [15],
        name: "Prince Harry",
        img: "https://cdn.balkan.app/shared/f15.png",
        gender: "male",
    },
    {
        id: 14,
        pids: [12],
        name: "Catherine",
        title: "Duchess of Cambridge",
        img: "https://cdn.balkan.app/shared/f13.png",
        gender: "female",
    },
    {
        id: 15,
        pids: [13],
        name: "Meghan Markle",
        img: "https://cdn.balkan.app/shared/f16.png",
        gender: "female",
    },
    {
        id: 16,
        fid: 12,
        mid: 14,
        name: "Prince George",
        img: "https://cdn.balkan.app/shared/f17.png",
        gender: "male",
    },
    {
        id: 17,
        fid: 12,
        mid: 14,
        name: "Prince Charlotte",
        img: "https://cdn.balkan.app/shared/f18.png",
        gender: "female",
    },
    {
        id: 18,
        fid: 12,
        mid: 14,
        name: "Prince Louis",
        img: "https://cdn.balkan.app/shared/f19.png",
        gender: "male",
    },
]);

watch(
    () => data.value,
    (val) => {
        console.log(val);
    }
);

function myMenuItemTest(e: any) {
    console.log(e);
}

function myTree(domEl: HTMLElement, x: Array<any>) {
    const family = new FamilyTree(domEl, {
        menu: {
            pdf: { text: "Export PDF" },
            png: { text: "Export PNG" },
            svg: { text: "Export SVG" },
            csv: { text: "Export CSV" },
            json: { text: "Export JSON" },
        },
        nodeMenu: {
            myMenuItem: { text: `My node menu Item`, onClick: myMenuItemTest },
            // edit: { text: "Edit" },
            // details: { text: "Details" },
            // pdf: { text: "Export PDF" },
            png: { text: "Export PNG" },
            // svg: { text: "Export SVG" },
        },
        // mouseScrool: FamilyTree.action.ctrlZoom,
        showXScroll: true,
        showYScroll: true,
        nodes: x,
        // template: "john",
        // nodeMouseClick: FamilyTree.action.pan,
        // nodeMouseDbClick: FamilyTree.action.edit,
        nodeBinding: {
            field_0: "name",
            field_1: "title",
            img_0: "img",
        },
        toolbar: {
            layout: false,
            zoom: true,
            fit: true,
            expandAll: true,
            fullScreen: true,
        },
    });
    family.on("click", (sender: any, /*{ id, fid, mid, name, img, gender } */ args) => {
        console.log("click");
        return false; //to cansel the click event
    });
}

onMounted(() => {
    if (treeRef.value) myTree(treeRef.value, data.value);
});
</script>
<template>
    <div
        id="tree"
        ref="treeRef"
        class="view-family-tree"
        style="height: 100% !important; width: 100% !important; background-color: rgb(32, 32, 32)"
    ></div>
</template>
<style lang="scss">
.view-family-tree {
    user-select: none;

    svg.tommy .node.male > rect {
        fill: #039be5;
    }

    svg.tommy .node.female > rect {
        fill: #ff46a3;
    }
}

#tree > svg {
    background-color: #2e2e2e !important;
}

/* border color */
.view-family-tree.bft-light .bft-input > input {
    border-color: #3d3d3d;
    background-color: #3d3d3d;
}

/* input field on focus */
.view-family-tree.bft-light .bft-input > input:focus {
    border-color: #3d3d3d;
    background-color: #3d3d3d;
}

/* the search label on focus */
.bft-light .bft-input > label.focused,
.bft-dark .bft-input > label.focused {
    color: rgb(199, 199, 199) !important;
}

/* the hovered search result */
.bft-light .bft-search [data-search-item-id]:hover,
.bft-light .bft-search [data-selected="yes"] {
    background-color: rgb(199, 199, 199) !important;
}
</style>
