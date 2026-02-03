import React from "react";

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error("UI ERROR:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-white p-6">
          Something went wrong. Please refresh.
        </div>
      );
    }

    return this.props.children;
  }
}
