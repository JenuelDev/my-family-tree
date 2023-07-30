<script lang="ts" setup>
import FamilyTree from "@balkangraph/familytree.js";
import dayjs from "dayjs";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getFamily, setFamily } from "@/util/firestore/families";
import { Loading, Notify } from "notiflix";
import SnapStorage from "snap-storage";

const defaultFemaleImage = `https://cdn2.iconfinder.com/data/icons/peppyicons/512/women_blue-512.png`;
const defaultMaleImage = `https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/user_man_male_profile_account-512.png`;
const docName = ref("");
const route = useRoute();
const treeRef = ref(null);
const familyData = ref<Array<any>>([
    {
        id: 3,
        gender: "male",
        photo: "https://cdn.balkan.app/shared/w60/1.jpg",
        name: "Click Me to Edit",
        born: "1943-01-13",
        email: "laura.shepherd@gmail.com",
        phone: "+44 845 5752 547",
        city: "Moscow",
    },
]);

function generateFamilyTree(domEl: HTMLElement, x: Array<any>) {
    FamilyTree.templates.john_male.size = [120, 180];
    FamilyTree.templates.john_female.size = [120, 180];

    FamilyTree.templates.john_male.ripple = {
        radius: 0,
        color: "none",
        // rect: null,
    };

    FamilyTree.templates.john_female.ripple = {
        radius: 0,
        color: "none",
        // rect: null,
    };

    FamilyTree.templates.john_male.field_0 =
        '<text class="field_0" style="font-size: 20px;text-align:center; width:500px" fill="#ffffff" y="160" x="60" text-anchor="middle">{val}</text>';
    FamilyTree.templates.john_female.field_0 =
        '<text class="field_0" style="font-size: 20px;text-align:center; width:500px" fill="#ffffff" y="160" x="60" text-anchor="middle">{val}</text>';

    FamilyTree.templates.john_male.field_1 =
        '<text class="field_0" style="font-size: 16px;text-align:center; width:500px" fill="#ffffff" y="180" x="60" text-anchor="middle">{val}</text>';
    FamilyTree.templates.john_female.field_1 =
        '<text class="field_0" style="font-size: 16px;text-align:center; width:500px" fill="#ffffff" y="180" x="60" text-anchor="middle">{val}</text>';

    FamilyTree.templates.john_male.field_2 =
        '<text class="field_0" style="font-size: 16px;text-align:center; width:500px" fill="#ffffff" y="197" x="60" text-anchor="middle">To {val}</text>';

    FamilyTree.templates.john_female.field_2 =
        '<text class="field_0" style="font-size: 16px;text-align:center; width:500px" fill="#ffffff" y="197" x="60" text-anchor="middle">To {val}</text>';

    FamilyTree.templates.hugo_male.field_1 =
        '<text class="field_0" style="font-size: 16px;text-align:center; width:500px" fill="#ffffff" y="110" x="65" text-anchor="middle">{val}</text>';
    FamilyTree.templates.hugo_female.field_1 =
        '<text class="field_0" style="font-size: 16px;text-align:center; width:500px" fill="#ffffff" y="110" x="65" text-anchor="middle">{val}</text>';

    FamilyTree.templates.hugo_male.field_2 =
        '<text class="field_0" style="font-size: 16px;text-align:center; width:500px" fill="#ffffff" y="110" x="170" text-anchor="middle"> - {val}</text>';
    FamilyTree.templates.hugo_female.field_2 =
        '<text class="field_0" style="font-size: 16px;text-align:center; width:500px" fill="#ffffff" y="110" x="170" text-anchor="middle"> - {val}</text>';

    const family = new FamilyTree(domEl, {
        mouseScrool: FamilyTree.action.ctrlZoom,
        showXScroll: true,
        showYScroll: true,
        mode: "dark",
        template: "john",
        levelSeparation: 80,
        mixedHierarchyNodesSeparation: 100,
        siblingSeparation: 80,
        minPartnerSeparation: 80,
        toolbar: {
            layout: false,
            zoom: true,
            fit: true,
            expandAll: true,
        },
        menu: {
            pdf: {
                text: "Export PDF",
                onClick: function (nodeId: any) {
                    family.exportPDF({
                        padding: 50,
                    });
                },
            },
            png: {
                text: "Export PNG",
                onClick: function (nodeId: any) {
                    family.exportPNG({
                        padding: 50,
                    });
                },
            },
            svg: {
                text: "Export SVG",
                onClick: function (nodeId: any) {
                    family.exportSVG({
                        padding: 50,
                    });
                },
            },
            csv: { text: "Export CSV" },
            json: { text: "Export JSON" },
        },
        roots: [3],
        // nodeMenu: {
        //     edit: { text: "Edit" },
        //     details: { text: "Details" }
        // },
        nodeTreeMenu: true,
        nodeBinding: {
            field_0: "name",
            field_1: "born",
            field_2: "death",
            img_0: "photo",
        },
        editForm: {
            titleBinding: "name",
            photoBinding: "photo",
            addMoreBtn: "Add element",
            addMore: "Add more elements",
            addMoreFieldName: "Element name",
            generateElementsFromFields: false,
            elements: [
                {
                    type: "textbox",
                    label: "Full Name",
                    binding: "name",
                    vlidators: {
                        required: "Is required",
                    },
                },
                {
                    type: "textbox",
                    label: "Email Address",
                    binding: "email",
                },
                { type: "textbox", label: "Phone", binding: "phone" },
                [
                    {
                        type: "date",
                        label: "Date Of Birth",
                        binding: "born",
                        vlidators: {
                            required: "Is Required",
                        },
                    },
                    { type: "date", label: "Date Of Birth", binding: "death" },
                ],
                {
                    type: "textbox",
                    label: "Address",
                    binding: "address",
                    vlidators: {
                        required: "Is Required",
                    },
                },
                { type: "textbox", label: "Photo Url", binding: "photo", btn: "Upload" },
            ],
        },
    });

    family.on("field", function (sender, args) {
        if (args.name == "born") {
            args.value = args.value ? dayjs(new Date(args.value)).format("MMM DD, YYYY") : "Birth Date Not Set";
        }
        if (args.name == "death") {
            args.value = args.value ? dayjs(new Date(args.value)).format("MMM DD, YYYY") : "Present";
        }

        if (args.name == "photo") {
            args.value = args.value
                ? args.value
                : args.data.gender == "male"
                ? defaultMaleImage
                : args.data.gender == "female"
                ? defaultFemaleImage
                : null;
        }

        if (args.name == "name") {
            args.value = args.value ? args.value : "Please Set Name";
        }
    });

    family.on("updated", () => {
        const id = route.params.id as string;
        clearTimeout(window.familyTreeUpdateTimeOut);

        window.familyTreeUpdateTimeOut = setTimeout(() => {
            const data = {
                name: docName.value,
                data: familyData.value,
            };

            SnapStorage.set(id, data);

            setFamily(id, data);
        }, 1000);
    });

    family.on("render-link", function (sender, args) {
        args.html = args.html.replace("path", "path stroke-dasharray='3, 3' stroke-width='2px'");
    });

    family.load(x);
}

function loadFamily() {
    Loading.hourglass("Loading...");
    const id = route.params.id as string;
    getFamily(id)
        .then((docData: any) => {
            docName.value = docData.name;
            familyData.value = docData.data;

            // populate the familyData
            if (treeRef.value) generateFamilyTree(treeRef.value, familyData.value);
        })
        .catch(() => {
            Notify.failure("Cannot Load family");
        })
        .finally(() => {
            Loading.remove();
        });
}

watch(
    () => docName.value,
    (val) => {
        if (val) {
            const id = route.params.id as string;
            clearTimeout(window.familyTreeUpdateTimeOut);

            window.familyTreeUpdateTimeOut = setTimeout(() => {
                setFamily(id, {
                    name: val,
                    data: familyData.value,
                });
            }, 1000);
        }
    }
);

onMounted(async () => {
    loadFamily();
});
</script>
<template>
    <div class="fixed w-300px top-5px left-[calc(50%-125px)] flex gap-3 items-center">
        <small style="white-space: nowrap">Fam Name:</small>
        <input v-model="docName" class="w-full" type="text" />
    </div>
    <div
        id="tree"
        ref="treeRef"
        class="view-family-tree"
        style="height: 100% !important; width: 100% !important; background-color: rgb(32, 32, 32)"
    ></div>
</template>
