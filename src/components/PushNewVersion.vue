<template>
    <a-form
        :model="formState"
        name="validate_other"
        v-bind="formItemLayout"
        @finishFailed="onFinishFailed"
        @finish="handleUpload"
    >
        <h2 class="title">发布新版本</h2>

        <a-form-item name="description" label="更新信息">
            <a-textarea
                v-model:value="formState.desc"
                placeholder="Autosize height with minimum and maximum number of lines"
                :auto-size="{ minRows: 2, maxRows: 5, minCols: 20 }"
            />
        </a-form-item>

        <a-form-item label="版本号">
            <a-form-item name="input-number" no-style>
                <a-input v-model:value="formState.version" placeholder />
            </a-form-item>
        </a-form-item>

        <a-form-item name="switch" label="强制更新">
            <a-switch v-model:checked="formState.force" />
        </a-form-item>

        <a-form-item label="上传固件包">
            <a-form-item name="dragger" no-style>
                <a-upload-dragger
                    v-model:file="formState.file"
                    :remove="handleRemove"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                >
                    <p class="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p class="ant-upload-text">Click or drag file to this area to upload</p>
                    <p class="ant-upload-hint">Support for a single or bulk upload.</p>
                </a-upload-dragger>
            </a-form-item>
        </a-form-item>

        <a-form-item>
            <a-button
                :disabled="disabled"
                type="primary"
                html-type="submit"
                block
            >Push</a-button>
        </a-form-item>
    </a-form>
</template>



<script>
import { InboxOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import http from './../axios';
export default {
    name: 'PushNewVersion',
    components: {
        UploadOutlined,
        InboxOutlined,
    },

    setup() {
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14,
            },
        };
        const formState = reactive({
            'force': false,
        });
        const fileList = ref([]);
        const uploading = ref(false);

        const handleRemove = file => {
            const index = fileList.value.indexOf(file);
            const newFileList = fileList.value.slice();
            newFileList.splice(index, 1);
            fileList.value = newFileList;
        };

        const beforeUpload = file => {
            fileList.value = [...fileList.value, file];
            return false;
        };


        const handleUpload = () => {
            const formData = new FormData();
            fileList.value.forEach(file => {
                formData.append('file', file);
            });
            formData.append('desc', formState.desc);
            formData.append('force', formState.force ? 0 : 1);
            formData.append('version', formState.version);
            http.post("/versionFile", formData).then(() => {
                fileList.value = [];
                message.success('upload successfully.');
            }).catch(() => {
                uploading.value = false;
                message.error('upload failed.');
            });

        }



        return {
            fileList,
            uploading,
            handleRemove,
            beforeUpload,
            formState,
            formItemLayout,
            handleUpload,
        };


    },
    data() {
        return {

        }
    },
    methods: {
        onFinish() {
            const formData = new FormData();
            this.fileList.value.forEach(file => {
                formData.append('file', file);
            });
            debugger

            formData.append('desc', this.formState.desc);
            formData.append('force', this.formState.force ? 0 : 1);
            formData.append('version', this.formState.version);
            http.post("/versionFile", formData).then((v) => {
                console.log(v)
            })
        }
    },
}

</script>



<style>
.title {
    padding-left: 200px;
}
</style>