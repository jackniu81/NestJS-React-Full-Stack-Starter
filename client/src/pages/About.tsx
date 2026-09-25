import { useEffect, useState } from 'react';
import { Alert, Button, Descriptions, Spin, Typography } from 'antd';
import { fetchVersion, type ApiVersion } from '../lib/api';

const { Title, Paragraph, Text } = Typography;

type Status = 'loading' | 'ok' | 'error';

export default function About() {
  const [status, setStatus] = useState<Status>('loading');
  const [data, setData] = useState<ApiVersion | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setStatus('loading');
    setError(null);
    try {
      const v = await fetchVersion();
      setData(v);
      setStatus('ok');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStatus('error');
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <Title level={2}>About</Title>
      <Paragraph type="secondary">
        This data comes from the live API: <Text code>GET /api/version</Text>
      </Paragraph>

      <div
        style={{
          background: '#fff',
          border: '1px solid #f0f0f0',
          borderRadius: 8,
          padding: 24,
        }}
      >
        {status === 'loading' && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}

        {status === 'error' && (
          <Alert
            type="error"
            showIcon
            message="Failed to load"
            description={error}
            action={
              <Button size="small" onClick={() => void load()}>
                Retry
              </Button>
            }
          />
        )}

        {status === 'ok' && data && (
          <Descriptions
            column={{ xs: 1, sm: 2 }}
            items={[
              { key: 'name', label: 'API name', children: data.name },
              { key: 'version', label: 'API version', children: data.version },
              { key: 'node', label: 'Node runtime', children: data.node },
              {
                key: 'timestamp',
                label: 'Server time',
                children: data.timestamp,
              },
              {
                key: 'ui',
                label: 'UI version',
                children: `v${__APP_VERSION__}`,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}
