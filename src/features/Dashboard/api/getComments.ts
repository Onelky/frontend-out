import type { Comment } from '../Dashboard.types.ts'
import { useInfiniteQuery } from 'react-query'
import { apiService } from '@/lib/axios'
import { API_URL } from '@/config'

const LIMIT = 20

const fetchComments = async ({ pageParam = 0 }) => {
  return await apiService.getAll<Comment[]>(API_URL, {
    _page: pageParam,
    _limit: LIMIT,
  })
}

export const useComments = () => {
  return useInfiniteQuery('comments', fetchComments, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined
    },
  })
}
