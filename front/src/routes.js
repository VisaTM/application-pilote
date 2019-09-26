import App from './components/App.jsx';
import Istex from './components/Istex/Istex.jsx';
import MainContent from './components/MainContent/MainContent.jsx';
import GalaxyFileManager from './components/GalaxyFileManager/GalaxyFileManager.jsx';
import ClusteringWorkflowLauncher from './components/ClusteringWorkflowLauncher/ClusteringWorkflowLauncher.jsx';
import ExtractionWorkflowLauncher from './components/ExtractionWorkflowLauncher/ExtractionWorkflowLauncher.jsx';
import GalaxyWorkflowResult from './components/GalaxyWorkflowResult/GalaxyWorkflowResult.jsx';
import GalaxyJobs from './components/GalaxyJobs/GalaxyJobs.jsx';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: MainContent
      },
      /* ECharts */
      /*{
        path: '/graph',
        exact: true,
        component: Echarts
      },*/
      /* Galaxy Files */
      {
        path: '/files',
        exact: true,
        component: GalaxyFileManager
      },
      /* Galaxy extraction */
      {
        path: '/extraction',
        exact: true,
        component: ExtractionWorkflowLauncher
      },
      /* Galaxy clustering */
      {
        path: '/clustering',
        exact: true,
        component: ClusteringWorkflowLauncher
      },
      /* Galaxy Jobs */
      {
        path: '/jobs',
        exact: true,
        component: GalaxyJobs
      },
      /* Galaxy Result */
      {
        path: '/results/:resultId',
        exact: true,
        component: GalaxyWorkflowResult
      },
      {
        path: '/istex',
        exact: true,
        component: Istex
      }
    ]
  }
];

export default routes;

