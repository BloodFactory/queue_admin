<template>
    <q-toolbar :class="(darkMode ? 'bg-grey-10' : 'bg-white') + ' shadow-1 q-py-md'">
        <div class="row items-center q-gutter-x-md full-width">
            <div class="text-h6">Справочник услуг</div>

            <div class="row q-mx-xl q-gutter-x-md" style="width: 100%; flex: 1 0">
                <div style="width: 100%; flex: 1 0">
                    <q-form>
                        <q-input
                            v-model.trim="filter"
                            class="q-px-md no-border-radius bg-grey-3"
                            debounce="300"
                            dense borderless clearable
                        >
                            <template v-slot:prepend>
                                <q-icon name="mdi-magnify"/>
                            </template>
                        </q-input>
                    </q-form>
                </div>
            </div>


            <q-btn
                v-if="$can('add', 'Services')"
                label="Добавить группу услуг"
                icon="mdi-plus"
                color="purple"
                class="no-border-radius"
                unelevated
                @click="$emit('addServicesGroup')"
            />

            <q-btn
                label="Обновить"
                icon="mdi-reload"
                color="primary"
                class="no-border-radius"
                unelevated
            />
        </div>
    </q-toolbar>
</template>

<script>
export default {
    computed: {
        darkMode() {
            return this.$q.dark.isActive
        },
        filter: {
            get() {
                return this.$store.getters['pages/services/getFilter']
            },
            set(filter) {
                this.$store.commit('pages/services/setFilter', filter)
            }
        }
    },
}
</script>
