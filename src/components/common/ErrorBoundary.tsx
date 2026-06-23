import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-950/20 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-950/40 rounded-[40px] shadow-2xl shadow-slate-950/50 border border-white/5 p-10 text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-rose-950/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="w-10 h-10 text-rose-500" />
            </div>

            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              System Interruption
            </h2>
            <p className="text-slate-400 font-medium mb-10 leading-relaxed">
              The clinical engine encountered an unexpected state. This has been logged for
              analysis.
            </p>

            {this.state.error && (
              <div className="mb-10 p-4 bg-slate-950/20 rounded-2xl border border-white/5 text-left overflow-hidden">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Error Trace
                </p>
                <p className="text-[11px] font-mono text-rose-600 break-all leading-tight">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 py-4 bg-slate-950/40 text-white border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-950/20 transition-all"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
