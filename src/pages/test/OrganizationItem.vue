<template>
    <div class="q-px-lg q-pt-lg">
        <q-card class="no-border-radius">
            <q-card-section>
                <div class="flex flex-center">
                    <div>{{ organization.label }}</div>
                    <q-space/>
                    <q-btn color="grey"
                           round
                           flat
                           dense
                           :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                           @click="toggle"/>
                </div>
            </q-card-section>

            <q-slide-transition>
                <div v-show="expanded">
                    <q-card-section>
                        <div>
                            <q-btn-group unelevated>
                                <q-btn v-if="!branch"
                                       label="Добавить филиал"
                                       color="primary"
                                       class="no-border-radius"/>
                                <q-btn label="Добавить отдел"
                                       color="primary"
                                       class="no-border-radius"/>
                            </q-btn-group>
                        </div>
                    </q-card-section>

                    <q-card-section v-if="!branch">
                        <q-card class="bg-grey-2">
                            <q-card-section>
                                <div class="text-h6">Филиалы</div>
                            </q-card-section>
                            <q-card-section>
                                <OrganizationItem v-for="(organization, index) in organization.branches"
                                                  :key="index"
                                                  :organization="organization"
                                                  branch/>
                            </q-card-section>
                        </q-card>
                    </q-card-section>
                </div>
            </q-slide-transition>
        </q-card>
    </div>
</template>

<script>
export default {
    name: 'OrganizationItem',
    props: {
        organization: {
            type: Object,
            default: null
        },
        branch: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            expanded: false
        }
    },
    methods: {
        toggle() {
            this.expanded = !this.expanded;
        }
    }
}
</script>
