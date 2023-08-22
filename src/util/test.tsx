import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const Wrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: Wrapper, ...options})

export * from '@testing-library/react'
export {customRender as render}