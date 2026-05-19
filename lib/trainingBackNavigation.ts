import { useCallback } from 'react';
import { Platform } from 'react-native';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import type { Href } from 'expo-router';

const TRAINING_INDEX: Href = '/t360-training';

/** Avoid GO_BACK errors when the screen was opened via deep link (no stack history). */
export function goBackOrReplace(fallbackHref: Href) {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallbackHref);
  }
}

function normalizeReturnTo(value: string | string[] | undefined): string | undefined {
  if (value == null) return undefined;
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || typeof raw !== 'string') return undefined;
  try {
    const decoded = decodeURIComponent(raw.trim());
    if (!decoded.startsWith('/')) return undefined;
    return decoded;
  } catch {
    return undefined;
  }
}

/** Close a KB article: return to the screen that opened it, or training index. */
export function closeTrainingKb(
  returnTo: string | string[] | undefined,
  fallback: Href = TRAINING_INDEX
) {
  const target = normalizeReturnTo(returnTo);
  if (target) {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(target as Href);
    }
    return;
  }
  goBackOrReplace(fallback);
}

/** Open a KB route and remember where to return on back. */
export function pushTrainingKb(kbPath: string, returnTo: string) {
  const pathname = kbPath.split('?')[0];
  const normalizedReturn = returnTo.startsWith('/') ? returnTo : `/${returnTo}`;
  router.push({
    pathname,
    params: { returnTo: normalizedReturn },
  } as Href);
}

export function useTrainingKbBack(fallback: Href = TRAINING_INDEX) {
  const { returnTo } = useLocalSearchParams<{ returnTo?: string | string[] }>();
  return useCallback(() => closeTrainingKb(returnTo, fallback), [returnTo, fallback]);
}

/** Opens KB from the current screen so back returns here (not the training index). */
export function useOpenTrainingKb() {
  const pathname = usePathname();
  return useCallback(
    (kbPath: string, explicitReturn?: string) => {
      openTrainingKbFromCurrentScreen(kbPath, explicitReturn ?? pathname);
    },
    [pathname]
  );
}

/**
 * Open KB and remember the current URL/screen for back navigation.
 * On web, uses `window.location` so it works without passing pathname from hooks.
 */
export function openTrainingKbFromCurrentScreen(kbPath: string, explicitReturn?: string) {
  let returnTo = explicitReturn;
  if (!returnTo && Platform.OS === 'web' && typeof window !== 'undefined') {
    returnTo = `${window.location.pathname}${window.location.search}`;
  }
  if (returnTo) {
    pushTrainingKb(kbPath, returnTo);
    return;
  }
  router.push(kbPath as Href);
}
