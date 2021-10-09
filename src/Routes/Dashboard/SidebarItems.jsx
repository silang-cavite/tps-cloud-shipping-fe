// NPM Packages
import { Icon } from "react-icons-kit"
import { home, folderOpen, list, cubes, unlock } from "react-icons-kit/fa/"

// Sidebar Content Buttons
const SidebarItems = [
    {
        name: "Home",
        icon: <Icon icon={home} />,
        route: "/dashboard/",
        roles: [ "Client", "Delivery Partner" ]
    },
    {
        name: "Transactions",
        icon: <Icon icon={folderOpen} />,
        route: "/dashboard/transaction/",
        roles: [ "Client" ]
    },
    {
        name: "Queue",
        icon: <Icon icon={list} />,
        route: "/dashboard/queue",
        roles: [ "Delivery Partner" ]
    },
    {
        name: "Tasks",
        icon: <Icon icon={cubes} />,
        route: "/dashboard/tasks",
        roles: [ "Delivery Partner" ]
    },
    {
        name: "Logout",
        icon: <Icon icon={unlock} />,
        route: "/dashboard/log-out",
        roles: [ "Client", "Delivery Partner" ],
        class: "mt-auto"
    },
];

export default SidebarItems;