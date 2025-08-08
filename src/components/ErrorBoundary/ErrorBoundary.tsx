import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error: ', error, errorInfo)
  }

   public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f9d423, #ff4e50)',
            color: '#fff',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '40px',
              borderRadius: '16px',
              backdropFilter: 'blur(6px)',
              maxWidth: '500px',
              width: '100%',
            }}
          >
            <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>🚨 Oops! Có lỗi rồi</h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              Đừng lo, bạn có thể tải lại trang hoặc quay lại trang chủ.
            </p>
            <button
              style={{
                background: '#fff',
                color: '#ff4e50',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: '0.3s',
              }}
              onClick={() => window.location.reload()}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#ffd6d6')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
            >
              🔄 Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}