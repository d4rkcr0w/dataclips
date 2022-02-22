export default [
  {
    path: '/',
    component: '@/layouts/BaseLayout',
    routes: [
      {
        path: '/clips/create',
        component: '@/pages/ClipEdit',
      },
      {
        path: '/clips/:clipId/edit',
        component: '@/pages/ClipEdit',
      },
      {
        path: '/clips/:slug',
        component: '@/pages/ClipPreview',
      },
      {
        path: '/projects/:projectId',
        component: '@/layouts/ProjectLayout',
        routes: [],
      },
    ],
  },
];
