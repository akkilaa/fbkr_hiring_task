import { ComponentType } from 'react'

export function withSkeleton<P extends object>(
  Component: ComponentType<P>,
  Skeleton: ComponentType,
) {
  return function Skeletonized({ loading, ...rest }: Partial<P> & { loading?: boolean }) {
    return loading ? <Skeleton /> : <Component {...(rest as P)} />
  }
}
