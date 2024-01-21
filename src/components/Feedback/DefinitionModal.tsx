import { VStack, Modal, Text } from 'native-base'

import { DefinitionInsert, Definition } from '../../types'

interface DefinitionModalProps {
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  definition: Definition[] | Definition | DefinitionInsert
  IsWordInDb: boolean
}

export const DefinitionModal = ({
  modalVisible,
  setModalVisible,
  definition,
  IsWordInDb,
}: DefinitionModalProps) => {
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
              {IsWordInDb
                ? (definition as DefinitionInsert)?.word_meanings?.map(
                    (meaning, meaningIndex) =>
                      meaning?.meanings_definitions?.map(
                        (def, defIndex) => def?.definition,
                      ),
                  )
                : definition &&
                  (definition as Definition[])?.map((item, definitionIndex) =>
                    item.meanings?.map((meaning, meaningIndex) =>
                      meaning?.definitions?.map(
                        (def, defIndex) => def?.definition,
                      ),
                    ),
                  )}
            </Text>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
