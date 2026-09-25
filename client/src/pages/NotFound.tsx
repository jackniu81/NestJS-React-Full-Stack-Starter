import { useNavigate } from 'react-router';
import { Button, Result } from 'antd';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="That page doesn't exist."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          ← Back home
        </Button>
      }
    />
  );
}
