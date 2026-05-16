import { useMemo } from 'react';

type User = {
  teacherType?: string;
};

type AuthState = {
  user: User;
  isAdmin: boolean;
};

const authState: AuthState = {
  user: {
    teacherType: 'advisor',
  },
  isAdmin: true,
};

function useAuthStore<T>(selector: (state: AuthState) => T): T {
  return selector(authState);
}

function getEffectiveRoles({
  teacherType,
  isAdmin,
}: {
  teacherType?: string;
  isAdmin: boolean;
}) {
  return [teacherType, isAdmin ? 'admin' : 'user'].filter(Boolean);
}

const App = () => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  const roles = useMemo(
    () =>
      getEffectiveRoles({
        teacherType: user?.teacherType,
        isAdmin,
      }),
    [user?.teacherType, isAdmin],
  );

  return <pre>{roles.join(', ')}</pre>;
};

export default App;
