import { useNavigate } from 'react-router';
import { Button, Card, Space, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={1}>Welcome 👋 !</Title>
        <Paragraph type="secondary">
          A full-stack starter: a <Text strong>NestJS</Text> API that also
          hosts this <Text strong>React</Text> client (built with{' '}
          <Text strong>Vite</Text> and styled with <Text strong>Ant Design</Text>
          ).
        </Paragraph>
      </div>

      <Card title="What's inside" bordered>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>
            Sample API: <Text code>GET /api/version</Text>
          </li>
          <li>Two pages wired with React Router</li>
          <li>Dev proxy so the client can hit the API server easily</li>
        </ul>
      </Card>

      <Button type="primary" onClick={() => navigate('/about')}>
        View API version →
      </Button>
    </Space>
  );
}
