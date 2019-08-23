import graphql from 'graphql.js';


export const userSessionGraph = graphql('http://localhost:6060/session_management_graph', { asJSON: true });

export const clientFormGraph = graphql('http://localhost:6060/client_form_graph', {
  headers: {
    Authorization: () => `Bearer ${localStorage.getItem('user_session_token')}`,
  },
  asJSON: true,
});

/* eslint-disable no-underscore-dangle */
export default {
  install(Vue, url, options) {
    const endpoint = url || 'http://localhost:6060/session_management_graph';
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
