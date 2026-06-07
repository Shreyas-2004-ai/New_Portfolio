import { Component, type ReactNode } from 'react';

interface State { error: Error | null }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ background: '#0a160f', color: '#4ade80', fontFamily: 'monospace', padding: 40, minHeight: '100vh' }}>
          <h1 style={{ color: '#f87171' }}>RUNTIME ERROR</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#fde68a', fontSize: 13 }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
