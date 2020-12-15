// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import GiveAway from "@/pages/Dashboard/GiveAway";
import Tellor from "@/pages/Dashboard/Tellor";

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/dashboard',
        component: DashboardLayout,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                components: {default: Dashboard}
            },
            {
                path: 'giveaway',
                name: 'giveaway',
                components: {default: GiveAway}
            },
            {
                path: 'tellor',
                name: 'tellor',
                components: {default: Tellor}
            }
        ]
    },
    {path: "*", component: NotFound},
];

export default routes;
