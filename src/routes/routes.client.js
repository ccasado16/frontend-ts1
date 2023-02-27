import { ClientLayout, BasicLayout } from "../layouts";
import { SelectTable } from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: BasicLayout,
    component: SelectTable,
    exact: true,
  },
];

export default routesClient;
