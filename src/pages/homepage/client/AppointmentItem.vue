<template>
    <div>
        <q-expansion-item expand-icon-toggle>
            <template v-slot:header>
                <q-item-section avatar>
                    <q-icon name="mdi-calendar"/>
                </q-item-section>

                <q-item-section>
                    <q-item-label class="text-bold text-primary text-body2" @click="registrationsExpanded = !registrationsExpanded">{{ appointment.date }}</q-item-label>
                    <q-item-label caption lines="2">
                        Время приёма: <span class="text-weight-bold">{{ appointment.timeFrom }} - {{ appointment.timeTill }}</span>
                    </q-item-label>
                    <q-item-label v-if="appointment.needDinner" caption lines="2">
                        Перерыв на обед: <span class="text-weight-bold">{{ appointment.dinnerFrom }} - {{ appointment.dinnerTill }}</span>
                    </q-item-label>
                </q-item-section>

                <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn icon="mdi-dots-vertical" color="black" round flat :loading="loading">
                            <q-menu>
                                <q-list style="min-width: 100px">
                                    <q-item :disable="hasRegistrations" clickable v-close-popup @click="$emit('openAppointment', appointment.id)">
                                        <q-item-section>Редактировать</q-item-section>
                                    </q-item>
                                    <q-item :disable="hasRegistrations" clickable v-close-popup @click="deleteAppointment">
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
            </template>

            <div style="margin-left: 72px;" class="q-pb-lg q-pt-lg">
                <q-table :columns="registrationsColumns"
                         title="Записи кандидатов"
                         :data="registrations"
                         no-data-label="Нет записей">
                    <template v-slot:body="props">
                        <RegistrationItem :props="props" @delete="$emit('deleteRegistration')"/>
                    </template>
                </q-table>
            </div>
        </q-expansion-item>

        <q-separator v-if="separator" inset="item"/>
    </div>
</template>

<script>
import RegistrationItem from "./RegistrationItem";

export default {
    name: "AppointmentItem",
    components: {
        RegistrationItem
    },
    props: [
        'appointment',
        'separator'
    ],
    data() {
        return {
            loading: false,
            registrationsExpanded: false,
            registrationsColumns: [
                {
                    name: 'time',
                    field: 'time',
                    label: 'Время',
                    headerStyle: 'width: 50px',
                },
                {
                    name: 'lastName',
                    label: 'Фамилия',
                    align: 'left'
                },
                {
                    name: 'firstName',
                    label: 'Имя',
                    align: 'left'
                },
                {
                    name: 'middleName',
                    label: 'Отчество',
                    align: 'left'
                },
                {
                    name: 'birthday',
                    label: 'Дата рождения',
                    align: 'right',
                    headerStyle: 'width: 125px'
                },
                {
                    name: 'phone',
                    label: 'Телефон',
                    align: 'left',
                    headerStyle: 'width: 150px'
                },
                {
                    name: 'email',
                    label: 'Электронная почта',
                    align: 'left',
                    headerStyle: 'width: 250px'
                },
                {
                    name: 'confirm',
                    headerStyle: 'width: 165px'
                }
            ]
        }
    },
    computed: {
        registrations() {
            return this.appointment.registrations;
        },
        hasRegistrations() {
            return this.appointment.hasOwnProperty('registrations') && this.appointment.registrations.length > 0;
        }
    },
    methods: {
        deleteAppointment() {
            if (this.loading) return;

            this.$q.dialog({
                title: 'Подтвердите действие',
                message: 'Удалить выбраную запись?',
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.loading = true;

                this.$api({
                    url: '/appointments/' + this.appointment.id,
                    method: 'delete'
                }).then(() => {
                    this.$q.dialog({
                        title: 'Успех',
                        message: 'Заявка успешно удалена',
                        persistent: true,
                        cancel: false,
                    }).onOk(() => {
                        this.$emit('deleteAppointment');
                    });
                }).catch(error => {
                    this.$q.notify({
                        message: error.response.data,
                        type: 'negative',
                        position: 'top'
                    })
                }).finally(() => {
                    this.loading = false;
                });
            });
        }
    }
}
</script>
