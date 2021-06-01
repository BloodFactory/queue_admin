<template>
    <div class="column full-height">
        <div class="open-template">
            <q-btn
                label="Сформировать шаблон"
                color="primary"
                class="no-border-radius full-width"
                stretch flat
                @click="() => { $store.dispatch('dialogs/appointmentTemplate/show', null) }"
            />
        </div>
        <div style="flex: 1">
            <q-scroll-area class="full-width full-height" :thumb-style="thumbStyle">
                <q-list>
                    <q-expansion-item
                        v-for="organization in list"
                        :key="organization.id"
                        header-class="bg-grey-9 text-white"
                        expand-icon-class="text-white"
                        dense
                    >
                        <template v-slot:header>
                            <q-item-section>
                                <q-item-label>
                                    {{ organization.name }}
                                </q-item-label>
                            </q-item-section>
                        </template>

                        <template v-for="(template, index) in organization.templates">
                            <q-item
                                :active="selected === template.id"
                                active-class="bg-light-blue-2"
                                dense clickable
                                @click="$store.dispatch('pages/appointment/template/setTemplate', template)"
                            >
                                <q-item-section>
                                    <q-item-label>
                                        {{ template.service.name }}
                                    </q-item-label>

                                    <q-item-label caption>
                                        Время приёма: от {{ template.timeFrom }} до {{ template.timeTill }}
                                    </q-item-label>

                                    <q-item-label caption>
                                        Обед: {{ template.needDinner && 'от ' + template.dinnerFrom + ' до ' + template.dinnerTill || 'Нет' }}
                                    </q-item-label>

                                    <q-item-label caption>
                                        Длительность одного приёма (в минутах): {{ template.duration }}
                                    </q-item-label>

                                    <q-item-label caption>
                                        Количество вакантных мест на один приём: {{ template.persons }}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-separator v-if="index < organization.templates.length - 1"/>
                        </template>
                    </q-expansion-item>
                </q-list>
            </q-scroll-area>
        </div>

        <TemplateDialog/>
    </div>
</template>

<script>
export default {
    components: {
        TemplateDialog: () => import('./TemplateDialog')
    },
    data() {
        return {
            thumbStyle: {
                right: '2px',
                borderRadius: '5px',
                backgroundColor: '#027be3',
                width: '5px',
                opacity: 0.75
            }
        }
    },
    computed: {
        list() {
            return this.$store.getters['pages/appointment/templates/getList'] || []
        },
        selected() {
            return this.$store.getters['pages/appointment/template/getId']
        }
    },
    mounted() {
        if (null === this.$store.getters['pages/appointment/templates/getList']) {
            this.$store.dispatch('pages/appointment/templates/fetchList')
        }
    }
}
</script>

<style lang="scss" scoped>
.open-template {
    border-bottom: 1px solid $grey-4;
}
</style>

