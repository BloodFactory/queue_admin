<template>
    <q-dialog ref="dialog" persistent>
        <q-card style="width: 600px">
            <q-card-section class="bg-blue text-white">
                <div class="text-h6">Открытие заявок на приём</div>
            </q-card-section>
            <q-card-section>
                <q-form id="appointmentForm" ref="appointmentForm" @submit.prevent="save">
                    <div class="row q-mb-sm">
                        <div class="col">
                            <q-input label="Дата" v-model="form.date" mask="##.##.####" :rules="rules.date" :disable="null !== id" outlined>
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                            <q-date v-model="form.date" mask="DD.MM.YYYY" :locale="calendarLocale" :first-day-of-week="1">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Закрыть" color="primary" flat/>
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                    </div>

                    <div class="text-subtitle2">Время приёма:</div>
                    <div class="row q-col-gutter-x-lg">
                        <div class="col">
                            <q-input label="От" v-model="form.timeFrom" mask="time" :rules="rules.timeFrom" outlined>
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="form.timeFrom">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat/>
                                                </div>
                                            </q-time>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col">
                            <q-input label="До" v-model="form.timeTill" mask="time" :rules="rules.timeTill" outlined>
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="form.timeTill">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat/>
                                                </div>
                                            </q-time>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                    </div>

                    <q-checkbox v-model="form.needDinner" label="Перерыв на обед:"/>
                    <div class="row q-col-gutter-x-lg">
                        <div class="col">
                            <q-input label="От" v-model="form.dinnerFrom" mask="time" :rules="rules.dinnerFrom" outlined :disable="!form.needDinner">
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="form.dinnerFrom">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat/>
                                                </div>
                                            </q-time>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col">
                            <q-input label="До" v-model="form.dinnerTill" mask="time" :rules="rules.dinnerTill" outlined :disable="!form.needDinner">
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="form.dinnerTill">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat/>
                                                </div>
                                            </q-time>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                    </div>

                    <div class="row q-col-gutter-x-lg">
                        <div class="col">
                            <q-input label="Длительность приёма (в минутах)" v-model="form.duration" type="number" :rules="rules.duration"/>
                        </div>

                        <div class="col">
                            <q-input label="Количество человек" v-model="form.persons" type="number" :rules="rules.persons"/>
                        </div>
                    </div>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="appointmentForm" unelevated/>
                <q-btn label="Отмена" color="negative" unelevated v-close-popup/>
            </q-card-actions>

            <q-inner-loading :showing="loading">
                <q-spinner-hourglass size="50px" color="primary"/>
            </q-inner-loading>
        </q-card>
    </q-dialog>
</template>

<script>
import {calendar} from 'src/helpers/locale';

const getEmptyForm = () => {
    return {
        date: '',
        timeFrom: '',
        timeTill: '',
        needDinner: true,
        dinnerFrom: '',
        dinnerTill: '',
        duration: 0,
        persons: 0
    }
}

export default {
    name: "AppointmentDialog",
    props: ['organizationService'],
    data() {
        return {
            id: null,
            loading: false,
            form: getEmptyForm(),
            rules: {
                date: [
                    v => /^[0-3]\d\.[0-1]\d\.[\d]+$/.test(v) || 'Введите корректную дату'
                ],
                timeFrom: [
                    v => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v) || 'Введите коррктное время',
                ],
                timeTill: [
                    v => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v) || 'Введите коррктное время',
                ],
                dinnerFrom: [
                    v => this.form.needDinner && /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v) || 'Введите коррктное время',
                ],
                dinnerTill: [
                    v => this.form.needDinner && /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v) || 'Введите коррктное время',
                ],
                duration: [
                    v => {
                        return (!isNaN(v) && v > 0) || 'Укажите целое положительное число';
                    }
                ],
                persons: [
                    v => {
                        return (!isNaN(v) && v > 0) || 'Укажите целое положительное число';
                    }
                ]
            },
            calendarLocale: calendar
        }
    },
    methods: {
        show(id) {
            this.id = id;

            if (null !== id) {
                this.loading = true;
                this.$api({
                    url: '/appointments/' + id,
                    method: 'get'
                }).then(response => {
                    this.form = response.data;
                    this.$refs.dialog.show();
                }).catch(error => {
                    this.$q.notify({
                        message: error.response.data,
                        type: 'negative',
                        position: 'top'
                    })
                }).finally(() => {
                    this.loading = false;
                });
            } else {
                this.form = getEmptyForm();
                this.$refs.dialog.show();
            }
        },
        save() {
            if (this.$refs.appointmentForm.validate() && !this.loading) {
                this.loading = true;

                const form = {};

                Object.assign(form, this.form, {organizationService: this.organizationService});

                const url = ['/appointments'];

                if (this.id) {
                    url.push(this.id);
                }

                this.$api({
                    url: url.join('/'),
                    method: 'post',
                    data: form
                }).then(() => {
                    this.$refs.dialog.hide();
                    this.$emit('save');
                }).catch(error => {
                    this.$q.notify({
                        message: error.response.data,
                        type: 'negative',
                        position: 'top'
                    });
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    }
}
</script>
