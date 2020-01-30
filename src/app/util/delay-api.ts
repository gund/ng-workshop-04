import { MonoTypeOperatorFunction } from 'rxjs';
import { delay } from 'rxjs/operators';

import { random } from './random';

export function delayApi<T>(max = 2000): MonoTypeOperatorFunction<T> {
  return obs$ => obs$.pipe(delay(random(Math.min(50, max - 1), max)));
}
