<template>
    <!-- <a-card style="width: 500px" v-if="vip == 1">
        <a-upload-dragger
            v-model:fileList="fileList"
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            @change="handleChange"
        >
            <p class="ant-upload-drag-icon">
                <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </a-upload-dragger>
    </a-card>-->
    <a-row>
        <a-col :lg="4">
            <div style="width: 256px;height:100%">
                <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
                </a-button>-->
                <a-menu
                    v-model:openKeys="openKeys"
                    v-model:selectedKeys="selectedKeys"
                    mode="inline"
                    :inline-collapsed="collapsed"
                >
                    <a-menu-item key="1">
                        <template #icon>
                            <user-outlined />
                        </template>
                        <router-link to="/person/profile">个人资料</router-link>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <template #icon>
                            <DesktopOutlined />
                        </template>

                        <router-link to="/person/pushNewVersion">版本发布</router-link>
                    </a-menu-item>
                    <!-- <a-menu-item key="3">
                <template #icon>
                    <InboxOutlined />
                </template>
                <span>Option 3</span>
                    </a-menu-item>-->
                    <!-- <a-sub-menu key="sub1">
                <template #icon>
                    <MailOutlined />
                </template>
                <template #title>Navigation One</template>
                <a-menu-item key="5">Option 5</a-menu-item>
                <a-menu-item key="6">Option 6</a-menu-item>
                <a-menu-item key="7">Option 7</a-menu-item>
                <a-menu-item key="8">Option 8</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <template #icon>
                    <AppstoreOutlined />
                </template>
                <template #title>Navigation Two</template>
                <a-menu-item key="9">Option 9</a-menu-item>
                <a-menu-item key="10">Option 10</a-menu-item>
                <a-sub-menu key="sub3" title="Submenu">
                    <a-menu-item key="11">Option 11</a-menu-item>
                    <a-menu-item key="12">Option 12</a-menu-item>
                </a-sub-menu>
                    </a-sub-menu>-->
                </a-menu>
            </div>
        </a-col>
        <a-col :lg={offset:3,span:16}>
            <router-view></router-view>
        </a-col>
    </a-row>
</template>


<script>

import { AppstoreOutlined, DesktopOutlined, InboxOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { reactive, ref, toRefs, watch } from 'vue';

export default {
    name: "Person",
    components: {
        InboxOutlined, MenuFoldOutlined,
        MenuUnfoldOutlined,
        PieChartOutlined,
        MailOutlined,
        DesktopOutlined,
        InboxOutlined,
        AppstoreOutlined,
    },

    setup() {
        const state = reactive({
            collapsed: false,
            selectedKeys: ['1'],
            openKeys: ['sub1'],
            preOpenKeys: ['sub1'],
        });
        watch(() => state.openKeys, (_val, oldVal) => {
            state.preOpenKeys = oldVal;
        });

        const toggleCollapsed = () => {
            state.collapsed = !state.collapsed;
            state.openKeys = state.collapsed ? [] : state.preOpenKeys;
        };
        const handleChange = info => {
            const status = info.file.status;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        };

        return {
            ...toRefs(state),
            toggleCollapsed,
            handleChange,
            fileList: ref([]),
        };
    },
    data() {
        return {
            vip: this.$store.state.profile.vip,
        }
    },
}
</script>