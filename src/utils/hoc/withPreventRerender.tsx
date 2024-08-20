import { memo, ComponentType } from 'react';

// Универсальный HOC для предотвращения излишних ререндеров
const withPreventRerender = <P extends object>(
    WrappedComponent: ComponentType<P>,
    areEqual?: (prevProps: P, nextProps: P) => boolean
) => {
    return memo(WrappedComponent, areEqual);
};

export default withPreventRerender;

// Функция кэширования функции сравнения
const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
    const cache = new Map<string, ReturnType<T>>();

    return ((...args: any[]) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key) as ReturnType<T>;
        }

        const result = fn(...args);
        cache.set(key, result);

        return result;
    }) as T;
};

// Функция глубокого сравнения для мемоизации
const deepEqual = (a: any, b: any): boolean => {
    if (a === b) return true;

    if (a == null || b == null) return a === b;

    if (typeof a !== typeof b) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }

    if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        for (let key of keysA) {
            if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
        }
        return true;
    }
    return false;
};

const memoizedDeepEqual = memoize(deepEqual);
