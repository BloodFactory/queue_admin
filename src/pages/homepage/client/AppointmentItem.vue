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
                    <q-item-label v-if="appointment.needDinner" caption lines="2">
                        Необработанных заявок: <span class="text-weight-bold">{{ unprocessedRequests(appointment) }}</span>
                    </q-item-label>
                </q-item-section>

                <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn icon="mdi-dots-vertical" color="black" round flat>
                            <q-menu>
                                <q-list style="min-width: 100px">
                                    <q-item clickable v-close-popup @click="$emit('openAppointment', appointment.id)">
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
            </template>

            <div style="margin-left: 72px;" class="q-pb-lg">
                <q-table :columns="registrationsColumns" :data="registrations" no-data-label="Нет записей">
                    <template v-slot:body="props">
                        <RegistrationItem :props="props"/>
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
                    label: 'Подтверждение заявки',
                    headerStyle: 'width: 165px'
                }
            ]
        }
    },
    computed: {
        registrations() {
            console.log(this.appointment);

            return this.appointment.registrations;
        }
    },
    methods: {
        unprocessedRequests(appointment) {
            return appointment.registrations ? appointment.registrations.filter((item) => {
                console.log(item)
                return item.status === null;
            }).length : 0;
        }
    }
}
</script>
