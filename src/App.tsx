import { useMemo } from 'react';

const App = () => {
  const isAdmin = true;

  const value = useMemo(() => ({ isAdmin }), [isAdmin]);

  return <pre>{String(value.isAdmin)}</pre>;
};

export default App;
