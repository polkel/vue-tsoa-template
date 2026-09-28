<script setup lang="ts">
import { api, useAsyncCaller } from "@/lib/api"
import type { UserDTO } from "@polkel/shared/dist/client"
import Button from "primevue/button"
import Column from "primevue/column"
import DataTable from "primevue/datatable"
import Dialog from "primevue/dialog"
import FloatLabel from "primevue/floatlabel"
import InputText from "primevue/inputtext"
import Paginator from "primevue/paginator"
import { computed, ref, watch } from "vue"
import { useToast } from "primevue/usetoast"

const toast = useToast()

const page = ref<number>(1)
const count = ref<number>(5)
const first = ref<number>(0)

watch(first, () => {
    page.value = Math.floor(first.value / count.value) + 1
    getUsersCall.execute()
})

watch(count, () => {
    if (first.value === 0) {
        getUsersCall.execute()
    }
    first.value = 0
})

const getUsersCall = useAsyncCaller(
    async () => {
        return api.user.getUsers({ page: page.value, count: count.value })
    },
    { page: 1, count: 5, total: 0, users: [] },
    { immediate: true }
)

const deleteUsersCall = useAsyncCaller(async () => {
    if (!toDelete.value) {
        throw new Error("No user to delete.")
    }
    return api.user.deleteUser({ id: toDelete.value.id })
}, undefined)

const toDelete = ref<UserDTO | null>(null)
const isDeleting = ref<boolean>(false)
const deleteError = ref<string | null>(null)

function stageDelete(user: UserDTO) {
    toDelete.value = user
    isDeleting.value = true
}
async function deleteUser() {
    await deleteUsersCall.execute()
    if (deleteUsersCall.error) {
        deleteError.value = deleteUsersCall.error.message
        return
    }
    toast.add({
        severity: "success",
        closable: false,
        life: 3000,
        summary: "Delete success!",
        detail: `Successfully deleted ${toDelete.value?.name}!`
    })
    isDeleting.value = false
    if (first.value === 0) {
        getUsersCall.execute()
    } else {
        first.value = 0
    }
}
function resetDelete() {
    toDelete.value = null
    deleteError.value = null
}

const addEditUserCall = useAsyncCaller(
    async () => {
        if (!nameField.value || !emailField.value) {
            throw new Error("Fields must not be empty.")
        }

        if (editing.value) {
            if (!toEdit.value) {
                throw new Error("User id is missing.")
            }
            return api.user.updateUser({
                id: toEdit.value.id,
                updateUserBody: { name: nameField.value, email: emailField.value }
            })
        }

        return api.user.createUser({
            createUserBody: { name: nameField.value, email: emailField.value }
        })
    },
    { id: "", name: "", email: "" }
)

const isAddEditing = ref<boolean>(false)
const toEdit = ref<UserDTO | null>(null)
const editing = computed<boolean>(() => {
    return !!toEdit.value
})
const addEditError = ref<string | null>(null)

const nameField = ref<string | null>(null)
const emailField = ref<string | null>(null)

// Work on editing and deleting next
function stageEdit(user: UserDTO) {
    toEdit.value = user
    nameField.value = user.name
    emailField.value = user.email
    isAddEditing.value = true
}
async function addEditUser() {
    await addEditUserCall.execute()
    if (addEditUserCall.error) {
        addEditError.value = addEditUserCall.error.message
        return
    }
    toast.add({
        severity: "success",
        life: 3000,
        closable: false,
        summary: editing.value ? "Edit success!" : "Add success!",
        detail: `Sucessfully ${editing.value ? "edited" : "added"} ${nameField.value}!`
    })
    isAddEditing.value = false
    if (first.value === 0) {
        getUsersCall.execute()
    } else {
        first.value = 0
    }
}
function resetAddEdit() {
    toEdit.value = null
    nameField.value = null
    emailField.value = null
    addEditError.value = null
}

// Then adding
</script>

<template>
    <main class="py-8 flex flex-col gap-8">
        <Dialog
            v-model:visible="isAddEditing"
            :header="editing ? 'Edit user' : 'Add user'"
            modal
            @hide="resetAddEdit"
            :draggable="false"
        >
            <div class="py-2 flex flex-col gap-4">
                <p v-if="editing">
                    Currently editing <strong>{{ `${toEdit?.name} (${toEdit?.email})` }}</strong>
                </p>
                <FloatLabel variant="on">
                    <InputText
                        fluid
                        id="nameInput"
                        v-model="nameField"
                        :invalid="!!addEditError"
                        @keypress.enter="addEditUser"
                    />
                    <label for="nameInput">name</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText
                        fluid
                        id="emailInput"
                        v-model="emailField"
                        :invalid="!!addEditError"
                        @keypress.enter="addEditUser"
                    />
                    <label for="emailInput">email</label>
                </FloatLabel>
                <p v-if="addEditError" class="text-red-500">
                    {{ addEditError }}
                </p>
            </div>
            <template #footer>
                <div class="w-full flex flex-row justify-between items-center">
                    <Button
                        label="cancel"
                        icon="pi pi-times"
                        @click="isAddEditing = false"
                        severity="secondary"
                    />
                    <Button
                        :label="editing ? 'update' : 'add'"
                        severity="success"
                        :icon="editing ? 'pi pi-pencil' : 'pi pi-plus'"
                        @click="addEditUser"
                    />
                </div>
            </template>
        </Dialog>
        <Dialog
            v-model:visible="isDeleting"
            header="Delete user"
            modal
            @hide="resetDelete"
            :draggable="false"
        >
            <div class="flex flex-col gap-4">
                <p>
                    Are you sure you want to delete <strong>{{ toDelete?.name }}</strong
                    >?
                </p>
                <div v-if="deleteError" class="text-red-500">{{ deleteError }}</div>
            </div>
            <template #footer>
                <div class="flex flex-row justify-between items-center w-full">
                    <Button
                        icon="pi pi-times"
                        label="cancel"
                        severity="secondary"
                        @click="isDeleting = false"
                    />
                    <Button
                        icon="pi pi-trash"
                        label="delete"
                        severity="danger"
                        @click="deleteUser"
                    />
                </div>
            </template>
        </Dialog>
        <p class="text-xl">
            Here's a simple CRUD example of how the API/postgres schema work together.
        </p>
        <DataTable :value="getUsersCall.state.users" :loading="getUsersCall.isLoading" stripedRows>
            <template #header>
                <div class="flex flex-row justify-between items-center">
                    <div class="text-xl font-bold">Users</div>
                    <Button icon="pi pi-plus" @click="isAddEditing = true" />
                </div>
            </template>
            <Column field="name" header="Name" />
            <Column field="email" header="Email" />
            <Column>
                <template #body="{ data }">
                    <div class="flex flex-row gap-4 justify-end">
                        <Button severity="secondary" icon="pi pi-pencil" @click="stageEdit(data)" />
                        <Button severity="danger" icon="pi pi-trash" @click="stageDelete(data)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <p v-if="getUsersCall.error" class="text-red-500">{{ getUsersCall.error.message }}</p>
        <Paginator
            v-model:first="first"
            v-model:rows="count"
            :totalRecords="getUsersCall.state.total"
            :rowsPerPageOptions="[5, 10, 25]"
        />
    </main>
</template>
