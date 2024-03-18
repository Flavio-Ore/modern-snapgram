import { useEffect, useState } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [validSearch, setValidSearch] = useState(false)

  useEffect(() => {
    const isValid = search.trim().length > 3
    setValidSearch(isValid)
  }, [search])

  return { search, updateSearch, validSearch }
}
