/* eslint-disable react-hooks/exhaustive-deps */
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState, BackHandler } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store';

const storage = new MMKV({
  id: 'inactivty-storage',
});

export const UserInactivityProvider = ({ children }: any) => {
  const status = useSelector((state: RootState) => state.authState.status);

  const appState = useRef(AppState.currentState);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/modals/lock') return;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true; // Ignore back button press
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    if (status === 'signIn') {
      router.push('/(app)/modals/lock');
    }
  }, [router, status]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === 'background') {
      recordStartTime();
    } else if (
      nextAppState === 'active' &&
      appState.current.match(/background/)
    ) {
      const elapsed = Date.now() - (storage.getNumber('startTime') || 0);

      if (elapsed > 120000 && status === 'signIn') {
        router.push('/(app)/modals/lock');
      }
    }
    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set('startTime', Date.now());
  };

  return children;
};
