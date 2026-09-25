import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Spin } from 'antd';
import Layout from './components/Layout';

// Route-level code splitting: pages load on demand, shrinking the
// first-screen bundle. Layout stays eager so the shell renders instantly.
const Welcome = lazy(() => import('./pages/Welcome'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

const fallback = (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
    <Spin size="large" />
  </div>
);

export default function App() {
  return (
    <Layout>
      <Suspense fallback={fallback}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
