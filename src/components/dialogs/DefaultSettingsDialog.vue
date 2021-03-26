<template>
    <q-dialog ref="dialog">
        <q-card style="width: 600px">
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">Стандартные настройки</div>
            </q-card-section>

            <q-card-section>
                <q-form>
                    <div class="text-subtitle1 text-grey">Рабочие дни</div>
                    <div class="row q-col-gutter-md q-mb-lg">
                        <div class="col" v-for="day in days">
                            <q-btn :label="day.label"
                                   class="full-width"
                                   size="md"
                                   :color="form.days[day.key] && 'green' || 'blue'"
                                   @click="form.days[day.key] = !form.days[day.key]"/>
                        </div>
                    </div>

                    <div class="text-subtitle1 text-grey">Часы приёма</div>
                    <div class="row q-col-gutter-md q-mb-lg">
                        <div class="col-6">
                            <q-input label="От" filled v-model="form.timeFrom" mask="time" :rules="['time']">
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

                        <div class="col-6">
                            <q-input label="До" filled v-model="form.timeTill" mask="time" :rules="['time']">
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

                    <div class="text-subtitle1 text-grey">Перерыв на обед</div>
                    <div class="row q-col-gutter-md q-mb-lg">
                        <div class="col-6">
                            <q-input label="От" filled v-model="form.lunchFrom" mask="time" :rules="['time']">
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="form.lunchFrom">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat/>
                                                </div>
                                            </q-time>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>

                        <div class="col-6">
                            <q-input label="До" filled v-model="form.lunchTill" mask="time" :rules="['time']">
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="form.lunchTill">
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
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn type="submit" label="Сохранить" color="green" :loading="loading" unelevated/>
                <q-btn type="reset" label="Отмена" color="red" :disabled="loading" unelevated v-close-popup/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: "DefaultSettingsDialog",
    data() {
        return {
            loading: false,
            days: [
                {key: 'monday', label: 'Пн',},
                {key: 'tuesday', label: 'Вт',},
                {key: 'wednesday', label: 'Ср',},
                {key: 'thursday', label: 'Чт',},
                {key: 'friday', label: 'Пт',},
                {key: 'saturday', label: 'Сб',},
                {key: 'sunday', label: 'Вс'},
            ],
            form: {
                days: {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                },
                timeFrom: '',
                timeTill: '',
                lunchFrom: '',
                lunchTill: ''
            }
        }
    },
    methods: {
        show(id) {
            this.$refs.dialog.show();
        }
    }

}
</script>
