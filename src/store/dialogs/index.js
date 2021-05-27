import service            from './service'
import organization       from './organization'
import organizationBranch from './organizationBranch'
import user               from './user'
import appointment        from './appointment'

export default {
    namespaced: true,
    modules: {
        service,
        organization,
        organizationBranch,
        user,
        appointment
    }
}
