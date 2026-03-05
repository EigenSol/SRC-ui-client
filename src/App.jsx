import { appRoutes } from './routes/routes';

function App() {
  const route = appRoutes[0];
  const PageComponent = route.component;

  return <PageComponent />;
}

export default App;
