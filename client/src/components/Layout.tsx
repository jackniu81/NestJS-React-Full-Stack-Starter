import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Layout as AntLayout, Menu, Typography } from 'antd';

const { Header, Content, Footer } = AntLayout;

const menuItems = [
  { key: '/', label: 'Welcome' },
  { key: '/about', label: 'About' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey =
    location.pathname === '/about' ? '/about' : '/';

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          paddingInline: 24,
        }}
      >
        <Typography.Title
          level={4}
          style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap' }}
        >
          NestJS + React
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => navigate(key)}
        />
      </Header>

      <Content style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 768, margin: '0 auto' }}>{children}</div>
      </Content>

      <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,0.45)' }}>
        NestJS + React Full Stack Starter · v{__APP_VERSION__} ·{' '}
        {__BUILD_TIME__}
      </Footer>
    </AntLayout>
  );
}
