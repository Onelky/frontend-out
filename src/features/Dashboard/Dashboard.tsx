import {
  ActionIcon,
  Button,
  Group,
  List,
  Loader,
  Stack,
  Title,
  Tooltip,
} from '@mantine/core'
import { useAuth } from '@/providers/authProvider.tsx'
import { Comment } from './Dashboard.types.ts'
import { IconEye } from '@tabler/icons-react'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import DetailDialog from './DetailDialog'
import { useComments } from './api/getComments.ts'
import style from './Dashboard.module.css'

export const Dashboard = () => {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const { logout } = useAuth()
  const query = useComments()

  const [ref, inView] = useInView()
  const {
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    isError,
    data,
  } = query

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage().catch()
  }, [inView])

  const handleItemClick = (comment: Comment) => setSelectedComment(comment)

  const onClose = () => setSelectedComment(null)

  const comments = useMemo(() => {
    return data?.pages?.flatMap((page) =>
      page.map((comment, index) => (
        <List.Item
          ref={index === page.length - 3 ? ref : undefined}
          key={comment.id}
        >
          {comment.id} | {comment.name} | {comment.email}
          <Tooltip label={'View detail'}>
            <ActionIcon
              variant={'transparent'}
              onClick={() => handleItemClick(comment)}
            >
              <IconEye aria-label={'View detail'} />
            </ActionIcon>
          </Tooltip>
        </List.Item>
      )),
    )
  }, [data])

  if (isLoading) return <Loader />

  if (isError) return <p>Something went wrong</p>

  return (
    <>
      {selectedComment && (
        <DetailDialog
          opened={!!selectedComment}
          onClose={onClose}
          item={selectedComment}
        />
      )}
      <Stack align={'center'}>
        <Group justify={'space-between'}>
          <Title>ProDashboard</Title>
          <Button color={'red'} onClick={logout} variant={'outline'}>
            Logout
          </Button>
        </Group>
        <List className={style.commentsContainer}>{comments}</List>
        {isFetchingNextPage && <Loader type={'dots'} />}
      </Stack>
    </>
  )
}
