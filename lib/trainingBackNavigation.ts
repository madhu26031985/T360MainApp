import { router } from 'expo-router';
import type { Href } from 'expo-router';

/** Avoid GO_BACK errors when the screen was opened via deep link (no stack history). */
export function goBackOrReplace(fallbackHref: Href) {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallbackHref);
  }
}
