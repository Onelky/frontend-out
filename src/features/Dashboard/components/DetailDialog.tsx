import type { Comment } from '../Dashboard.types.ts'
import { Button, Modal, Stack, Text } from '@mantine/core'
import { capitalize } from '@/utils'
import classes from '../Dashboard.module.css'

const fields: (keyof Comment)[] = ['id', 'name', 'email', 'body']

interface DetailDialogProps {
  opened: boolean
  onClose: () => void
  item: Comment
}
const DetailDialog = ({ opened, onClose, item }: DetailDialogProps) => {
  return (
    <Modal
      size={'lg'}
      withCloseButton={false}
      opened={opened}
      onClose={onClose}
    >
      <Modal.Body className={classes.dialog}>
        <Button color={'red'} onClick={onClose}>Close</Button>
        <Stack gap={10}>
          {fields.map((field) => (
            <Text key={field as string}>
              <b>{capitalize(field)}: </b>
              {item[field]}
            </Text>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default DetailDialog
