'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import Button from '@/src/components/Button'
import { YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <YStack
            gap={4}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <TextDisplay size="bigger">문제가 발생했습니다</TextDisplay>
            <p className="text-gray-600">{this.state.error?.message}</p>
            <Button
              variant="primary"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              다시 시도하기
            </Button>
          </YStack>
        )
      )
    }

    return this.props.children
  }
}
