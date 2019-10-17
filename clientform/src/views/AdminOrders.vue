<script>
import LayoutAdminConnected from './components/LayoutAdminConnected.vue';

export default {
    name: 'AdminOrders',
    components: {
        LayoutAdminConnected,
    },
    created() {
        console.log('hits admin offers');
    },
};
</script>

<template>
    <layout-admin-connected>
        <div class="container">
            <h2>Orders</h2>
            <div class="card" aria-id="contentIdForA11y3">
                <p class="card-header-title">
                    Component
                </p>
                <div class="card-content">
                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                        <a>#buefy</a>.
                    </div>
                </div>
                <footer class="card-footer">
                    <a class="card-footer-item">Edit</a>
                    <a class="card-footer-item">Delete</a>
                </footer>
            </div>
        </div>
    </layout-admin-connected>
</template>

<style scoped>

</style>
