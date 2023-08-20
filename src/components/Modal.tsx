import { Modal } from 'antd';


export default function ModalComp({children,...modalProps}:any) {
  return (
    <Modal {...modalProps} >
      {children}
    </Modal>
  )
}
