<template>
    <div class="q-px-lg q-pt-lg">
        <q-card>
            <q-card-section>
                <div class="row flex-center">
                    <div class="text-h6">{{ organizationService.name }}</div>
                    <q-space/>

                    <q-btn color="grey"
                           round
                           flat
                           dense
                           :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                           :loading="loading"
                           @click="expand"/>
                </div>
            </q-card-section>

            <q-slide-transition>
                <div v-show="expanded">
                    <q-card-section>
                        <div>
                            <q-btn label="Открыть запись" color="primary" @click="$refs.appointmentDialog.show(null)"/>
                        </div>
                    </q-card-section>

                    <q-card-section class="q-px-xl" v-if="null !== appointments">
                        <q-list v-if="appointments.length > 0">
                            <template v-for="(appointment, index) in appointments">
                                <q-item clickable>
                                    <q-item-section avatar>
                                        <q-icon name="mdi-calendar"/>
                                    </q-item-section>

                                    <q-item-section>
                                        <q-item-label class="text-bold">{{ appointment.date }}</q-item-label>
                                        <q-item-label caption lines="2">
                                            Время приёма: <span class="text-weight-bold">{{ appointment.timeFrom }} - {{ appointment.timeTill }}</span>
                                        </q-item-label>
                                        <q-item-label v-if="appointment.needDinner" caption lines="2">
                                            Перерыв на обед: <span class="text-weight-bold">{{ appointment.dinnerFrom }} - {{ appointment.dinnerTill }}</span>
                                        </q-item-label>
                                    </q-item-section>

                                    <q-item-section side>
                                        <div class="text-grey-8 q-gutter-xs">
                                            <q-btn icon="mdi-dots-vertical" color="black" round flat>
                                                <q-menu>
                                                    <q-list style="min-width: 100px">
                                                        <q-item clickable v-close-popup @click="$refs.appointmentDialog.show(appointment.id)">
                                                            <q-item-section>Редактировать</q-item-section>
                                                        </q-item>
                                                        <q-item clickable v-close-popup>
                                                            <q-item-section>Удалить</q-item-section>
                                                        </q-item>
                                                        <q-separator/>
                                                        <q-item clickable v-close-popup>
                                                            <q-tooltip anchor="top middle">
                                                                Пользователи больше не смогут записываться в этот день. Старые заявки на приём сохранятся.
                                                            </q-tooltip>
                                                            <q-item-section>Закрыть запись</q-item-section>
                                                        </q-item>
                                                    </q-list>
                                                </q-menu>
                                            </q-btn>
                                        </div>
                                    </q-item-section>
                                </q-item>

                                <q-separator v-if="index < appointments.length - 1" inset="item"/>
                            </template>
                        </q-list>

                        <div v-else>
                            <p class="text-body2">
                                <q-icon name="mdi-alert"/>
                                Нет записей
                            </p>
                        </div>
                    </q-card-section>
                </div>
            </q-slide-transition>
        </q-card>

        <AppointmentDialog ref="appointmentDialog" :organizationService="organizationService.id" @save="loadAppointments"/>
    </div>
</template>

<script>
import AppointmentDialog from "./AppointmentDialog";

export default {
    name: "OrganizationService",
    props: ['organizationService'],
    components: {
        AppointmentDialog
    },
    data() {
        return {
            expanded: false,
            loading: false,
            appointments: null
        }
    },
    methods: {
        expand() {
            if (this.loading) return;

            if (null !== this.appointments) {
                this.expanded = !this.expanded;
                return;
            }

            this.loading = true;
            this.loadAppointments().then(() => {
                this.expanded = true;
            }).finally(() => {
                this.loading = false;
            });
        },
        loadAppointments() {
            return this.$api({
                url: '/appointments',
                method: 'get',
                params: {
                    organizationService: this.organizationService.id
                }
            }).then(response => {
                this.appointments = response.data;
                return Promise.resolve();
            });
        },
    }
}
</script>
