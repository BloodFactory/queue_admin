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
                            <q-btn label="Открыть запись" color="primary" @click="openAppointment(null)"/>
                        </div>
                    </q-card-section>

                    <q-card-section class="q-px-xl" v-if="null !== appointments">
                        <q-list v-if="appointments.length > 0">
                            <AppointmentItem v-for="(appointment, index) in appointments"
                                             :key="index"
                                             :appointment="appointment"
                                             :separator="index < appointments.length - 1"
                                             @openAppointment="openAppointment"
                                             @deleteAppointment="loadAppointments"
                                             @deleteRegistration="loadAppointments"/>
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
import AppointmentItem   from "./AppointmentItem";

export default {
    name: "OrganizationService",
    props: ['organizationService'],
    components: {
        AppointmentDialog,
        AppointmentItem
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
        openAppointment(appointmentId) {
            this.$refs.appointmentDialog.show(appointmentId)
        }
    }
}
</script>
