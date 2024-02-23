import { useCallback, useEffect } from 'react'

function usePageTitle(title?: string) {
  const setPageTitle = useCallback((newTitle?: string) => {
    document.title = newTitle ? `Hostfully | ${newTitle}` : 'Hostfully'
  }, [])

  useEffect(() => {
    setPageTitle(title)
  }, [setPageTitle, title])

  return setPageTitle
}

export default usePageTitle
