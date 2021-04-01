<template>
    <q-dialog ref="dialog" @before-hide="onBeforeHideDialog">
        <q-card style="width: 600px">
            <q-card-section class="bg-blue text-white">
                <div class="text-h6">Настройки электронной очереди</div>
            </q-card-section>

            <q-card-section>
                <q-form ref="settingsForm" id="settingsForm" @submit.prevent="submit">
                    <div class="row q-col-gutter-md q-mb-lg">
                        <div class="col-12">
                            <q-input label="Название услги" v-model.trim="form.service" :rules="rules.service"/>
                        </div>
                    </div>

                    <div class="q-mb-lg">
                        <div class="text-subtitle1 text-grey">Дни приёма</div>
                        <div class="row q-col-gutter-md">
                            <div class="col" v-for="day in days" :key="day.value">
                                <q-btn :label="day.label"
                                       class="full-width"
                                       size="md"
                                       push
                                       :color="form.days.includes(day.value) && 'green' || 'blue'"
                                       @click="form.days.includes(day.value) ? form.days.splice(form.days.indexOf(day.value), 1) : form.days.push(day.value)"/>
                            </div>

                        </div>
                        <div class="row q-mt-sm" v-if="form.days.length === 0">
                            <div class="col">
                                <div style="color: var(--q-color-negative); font-size: 12px; line-height: 1">Выберите рабочие дни</div>
                            </div>
                        </div>
                    </div>
                    <div class="text-subtitle1 text-grey">Время приёма</div>
                    <div class="row q-col-gutter-md q-mb-lg">
                        <div class="col">
                            <q-input label="Начало" filled v-model="form.receptionTime.from" mask="time" :rules="['time']">
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="form.receptionTime.from">
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
                            <q-input label="Конец" filled v-model="form.receptionTime.till" mask="time" :rules="['time']">
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="form.receptionTime.till">
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

                    <div class="text-subtitle1 text-grey">Перерыв на обед (если есть)</div>
                    <div class="row q-col-gutter-md q-mb-lg">
                        <div class="col">
                            <q-input label="Начало" filled v-model="form.restTime.from" mask="time">
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="form.restTime.from">
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
                            <q-input label="Конец" filled v-model="form.restTime.till" mask="time">
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="form.restTime.till">
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
                    <q-input class="q-mb-md" v-model="form.duration" label="Длительность приёма в минутах" type="number" :rules="rules.duration"/>
                    <q-input class="q-mb-md" v-model="form.break" label="Перерыв между приёмами в минутах (если требуется)" type="number"/>
                    <q-input v-model="form.persons" label="Количество человек" type="number" :rules="rules.persons"/>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn form="settingsForm" type="submit" label="Сохранить" color="green" :loading="loading" unelevated/>
                <q-btn label="Отмена" color="red" :disabled="loading" unelevated v-close-popup/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>

const initForm = () => {
    return {
        id: null,
        service: '',
        days: [],
        receptionTime: {
            from: '',
            till: ''
        },
        restTime: {
            from: '',
            till: ''
        },
        duration: 0,
        break: 0,
        persons: 0
    }
}

const rules = {
    service: [
        v => !!v || 'Введите название услуги'
    ],
    duration: [
        v => v > 0 || 'Длительность приёма не может быть меньше 0'
    ],
    persons: [
        v => v > 0 || 'Количество человек должно быть больше 0'
    ]
}
export default {
    name: "SettingDialog",
    data() {
        return {
            loading: false,
            days: [
                {value: 'monday', label: 'Пн',},
                {value: 'tuesday', label: 'Вт',},
                {value: 'wednesday', label: 'Ср',},
                {value: 'thursday', label: 'Чт',},
                {value: 'friday', label: 'Пт',},
                {value: 'saturday', label: 'Сб',},
                {value: 'sunday', label: 'Вс'},
            ],
            form: initForm(),
            rules: rules
        }
    },
    methods: {
        show(id) {
            if (null !== id) {
                this.$api({
                    url: '/settings/' + id,
                    method: 'get'
                }).then(response => {
                    const {id, name, days, receptionTime, restTime, duration, rest, persons} = response.data;

                    this.form.id            = id;
                    this.form.service       = name;
                    this.form.days          = days;
                    this.form.receptionTime = receptionTime;
                    this.form.restTime      = restTime;
                    this.form.duration      = duration;
                    this.form.break         = rest;
                    this.form.persons       = persons;

                    this.$refs.dialog.show();
                });
            } else {
                this.$refs.dialog.show();
            }
        },
        onBeforeHideDialog() {
            this.form = initForm();
            this.$refs.settingsForm.resetValidation();
        },
        submit() {
            if (this.$refs.settingsForm.validate() && this.days.length > 0) {
                this.loading = true;

                const url = ['/settings'];

                if (this.form.id) {
                    url.push(this.form.id)
                }

                this.$api({
                    url: url.join('/'),
                    method: 'post',
                    data: this.form
                }).then(response => {
                    this.$refs.dialog.hide();
                    this.$emit('save');
                }).catch(error => {
                    this.$q.notify({
                        message: 'Не удалось сохранить',
                        type: 'negative',
                    })
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    }
}
</script>
