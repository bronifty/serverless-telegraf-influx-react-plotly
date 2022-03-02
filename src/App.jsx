import React from 'react';
import { Query } from './components/Query';
import Frontend from './Frontend';

const App = () => {
  return (
    <Query>
      <ErrorBoundary>
        <Frontend />
      </ErrorBoundary>
    </Query>
  );
};

export default App;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>
            The App and Frontend components are dumb; all the logic is in
            PlotlyComponent; Something either is wrong there or in the hooks
            file (/src/hooks/hooks.js) in the fetcher function
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
