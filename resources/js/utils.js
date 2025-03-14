import _ from 'lodash';

export default {
    methods: {
        asset(path) {
            if (_.isNil(path)) {
                return null;
            }
            
            const base_path = window.ASSET_PATH || '';
            if (_.endsWith(base_path, "/") && _.startsWith(path, "/")) {
                return base_path + path.substring(1);
            } else if (!_.endsWith(base_path, "/") && !_.startsWith(path, "/")) {
                    return base_path + "/"+path;
            }
            return base_path + path;
        },

        private_asset(path) {
            if (_.isNil(path)) {
                return null;
            }
            
            const base_path = window.PRIVATE_ASSET_PATH || '';
            if (_.endsWith(base_path, "/") && _.startsWith(path, "/")) {
                return base_path + path.substring(1);
            } else if (!_.endsWith(base_path, "/") && !_.startsWith(path, "/")) {
                    return base_path + "/"+path;
            }
            return base_path + path;
        },

        error_handler(vm, fnName) {
            return (error) => {
                console.log("ERROR", error)
                const response = error.response
                const message = "("+response.status+") ["+fnName+"]: " + (response?.data?.message || response?.data?.error)
    
                console.error("Error", error)
                console.error("Error Response", error.response)
                vm.$toast.error(message);
            }
        },
        
    }
}