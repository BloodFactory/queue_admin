import service                     from './service'
import organization                from './organization'
import organizationBranch          from './organizationBranch'
import user                        from './user'
import appointment                 from './appointment'
import appointmentTemplate         from './appointmentTemplate'
import appointmentFillFromTemplate from './applointmentFillFromTemplate'
import serviceGroup                from './serviceGroup'

export default {
    namespaced: true,
    modules: {
        service,
        serviceGroup,
        organization,
        organizationBranch,
        user,
        appointment,
        appointmentTemplate,
        appointmentFillFromTemplate
    }
}
