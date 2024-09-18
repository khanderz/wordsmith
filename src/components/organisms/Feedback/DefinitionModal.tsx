import { VStack, Modal, Text } from 'native-base'

import { useWordlistContext } from '../../../lib/providers/WordlistContext'
import { Definition, DefinitionInsert } from '../../../types'

interface DefinitionModalProps {
  modalVisible: boolean
}

export const DefinitionModal = ({ modalVisible }: DefinitionModalProps) => {
  const { definition, setModalVisible } = useWordlistContext()
  return (
    <Modal
      aria-label="definition-modal"
      isOpen={modalVisible}
      onClose={() => setModalVisible(false)}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Definition</Modal.Header>
        <Modal.Body>
          <VStack space={2}>
            <Text>
              {(definition as Definition[]).map((item, definitionIndex) =>
                item.meanings?.map((meaning, meaningIndex) =>
                  meaning?.definitions?.map((def, defIndex) => def?.definition),
                ),
              )}
            </Text>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
