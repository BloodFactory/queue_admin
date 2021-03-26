<template>
    <q-dialog ref="dialog">
        <q-card style="width: 600px">
            <q-card-section class="bg-blue text-white">
                <div class="text-h6">Настройки электронной очереди</div>
            </q-card-section>

            <q-card-section>
                <q-form id="settingsForm" @reset="onReset">
                    <div class="row q-col-gutter-md q-mb-lg">
                        <div class="col-12">
                            <q-input label="Название услги" v-model="form.service"/>
                        </div>
                    </div>
                    
                    <div class="text-subtitle1 text-grey">Дни приёма</div>
                    <div class="row q-col-gutter-md q-mb-lg">
                        <div class="col" v-for="day in days" :key="day.value">
                            <q-btn :label="day.label"
                                   class="full-width"
                                   size="md"
                                   push
                                   :color="form.days[day.value] && 'green' || 'blue'"
                                   @click="form.days[day.value] = !form.days[day.value]"/>
                        </div>
                    </div>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn form="settingsForm" type="submit" label="Сохранить" color="green" :loading="loading" unelevated/>
                <q-btn form="settingsForm" type="reset" label="Отмена" color="red" :disabled="loading" unelevated v-close-popup/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
const initForm = () => {
    return {
        service: '',
        days: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        },
    }
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
            form: initForm()
        }
    },
    methods: {
        show(id) {
            this.$refs.dialog.show();
        },
        onReset() {
            this.form = initForm();
        }
    }
}
</script>
