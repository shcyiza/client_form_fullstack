import graphql from 'graphql.js';

const host = process.env.VUE_APP_API_HOST;

export const userSessionGraph = graphql(`${host}/session_management_graph`, { asJSON: true });

export const clientFormGraph = graphql(`${host}/client_form_graph`, {
    headers: {
        Authorization: () => `Bearer ${localStorage.getItem('user_session_token')}`,
    },
    asJSON: true,
});

export const adminGraph = graphql(`${host}/admin_graph`, {
    headers: {
        Authorization: () => `Bearer ${localStorage.getItem('admin_session_token')}`,
    },
    asJSON: true,
});

/* eslint-disable no-underscore-dangle */
export default {
    install(Vue, url, options) {
        const endpoint = url || `${host}/session_management_graph`;
        Vue.mixin({
            created() {
                this._graph = graphql(endpoint, options);
            },
        });
        Object.defineProperty(Vue.prototype, '$graph', {
            get() {
                return this._graph;
            },
        });
    },
};
