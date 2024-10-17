import type { FC } from 'react'
import {Divider, Group, Text, useMantineTheme} from '@mantine/core'
import { Comment } from '../Dashboard.types'

const fields: (keyof Comment)[] = ['id', 'name', 'email']

interface DashboardItemProps {
  comment: Comment
  onClick: (comment: Comment) => void
}
const DashboardItem: FC<DashboardItemProps> = ({ comment }) => {
  const theme = useMantineTheme()
  return (
    <Group>
      {fields.map((field, i) => (
        <Group key={field}>
          <Text c={'primary.9'}>{comment[field]}</Text>
          {i < fields.length - 1 && (
            <Divider color={theme.other.colors.secondary} variant={'solid'} orientation={'vertical'} />
          )}
        </Group>
      ))}
    </Group>
  )
}

export default DashboardItem
