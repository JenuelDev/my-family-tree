<script setup>
import FamilyTree from "@balkangraph/familytree.js";
import { onMounted, ref } from "vue";

const treeRef = ref(null);
const data = [
    { id: 1, pids: [2], name: "King George VI", img: "https://cdn.balkan.app/shared/f1.png", gender: "male" },
    { id: 2, pids: [1], name: "Queen Elizabeth", title: "The Queen Mother", img: "https://cdn.balkan.app/shared/f2.png", gender: "female" },

    { id: 3, pids: [4], mid: 2, fid: 1, name: "Queen Elizabeth II", img: "https://cdn.balkan.app/shared/f5.png", gender: "female" },
    { id: 4, pids: [3], name: "Prince Philip", title: "Duke of Edinburgh", img: "https://cdn.balkan.app/shared/f3.png", gender: "male" },

    { id: 5, mid: 2, fid: 1, name: "Princess Margaret", img: "https://cdn.balkan.app/shared/f6.png", gender: "male" },

    { id: 6, mid: 3, fid: 4, pids: [7, 8], name: "Charles", title: "Prince of Wales", img: "https://cdn.balkan.app/shared/f8.png", gender: "male" },
    { id: 7, pids: [6], name: "Diana", title: "Princess of Wales", img: "https://cdn.balkan.app/shared/f9.png", gender: "female" },
    { id: 8, pids: [6], name: "Camila", title: "Duchess of Cornwall", img: "https://cdn.balkan.app/shared/f7.png", gender: "female" },

    { id: 9, mid: 3, fid: 4, name: "Anne", title: "Princess Royal", img: "https://cdn.balkan.app/shared/f10.png", gender: "female" },
    { id: 10, mid: 3, fid: 4, name: "Prince Andrew", title: "Duke of York", img: "https://cdn.balkan.app/shared/f11.png", gender: "male" },
    { id: 11, mid: 3, fid: 4, name: "Prince Edward", title: "Earl of Wessex", img: "https://cdn.balkan.app/shared/f12.png", gender: "male" },

    { id: 12, fid: 6, mid: 7, pids: [14], name: "Prince William", title: "Duch of Cambridge", img: "https://cdn.balkan.app/shared/f14.png", gender: "male" },
    { id: 13, fid: 6, mid: 7, pids: [15], name: "Prince Harry", img: "https://cdn.balkan.app/shared/f15.png", gender: "male" },
    { id: 14, pids: [12], name: "Catherine", title: "Duchess of Cambridge", img: "https://cdn.balkan.app/shared/f13.png", gender: "female" },
    { id: 15, pids: [13], name: "Meghan Markle", img: "https://cdn.balkan.app/shared/f16.png", gender: "female" },
    { id: 16, fid: 12, mid: 14, name: "Prince George", img: "https://cdn.balkan.app/shared/f17.png", gender: "male" },
    { id: 17, fid: 12, mid: 14, name: "Prince Charlotte", img: "https://cdn.balkan.app/shared/f18.png", gender: "female" },
    { id: 18, fid: 12, mid: 14, name: "Prince Louis", img: "https://cdn.balkan.app/shared/f19.png", gender: "male" },
];

function myTree(domEl, x) {
    const family = new FamilyTree(domEl, {
        mouseScrool: FamilyTree.action.ctrlZoom,
        showXScroll: true,
        showYScroll: true,
        nodes: x,
        template: "john",
        // nodeMouseClick: FamilyTree.action.pan,
        nodeMouseDbClick: FamilyTree.action.edit,
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

    family.on("click", function (sender, args) {
        console.log(args);
        // sender.editUI.show(args.node.id, false);
        // sender.editUI.show(args.node.id, true);  details mode
        return false; //to cansel the click event
    });
}

onMounted(() => {
    if (treeRef.value) myTree(treeRef.value, data);
});
</script>
<template>
    <div id="tree" ref="treeRef" style="height: 100vh !important; width: 100vw !important"></div>
</template>
<style>
html,
body {
    margin: 0px;
    padding: 0px;
}

#tree {
    width: 100%;
    height: 100%;
}
</style>
