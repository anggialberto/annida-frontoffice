import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';


const SuccessModal = (props) => {

    return (
        <Modal
            title='Status'
            width={'30%'}
            visible={props?.visible}
            onOk={{}}
            onCancel={props?.onClose}
            footer={null}
            >

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CheckCircleOutlined style={{ color: 'green', fontSize: 60, marginBottom: 30 }} />
                    <p style={{fontWeight: 'bold', fontSize: 20}}>SUCCESS</p>
                    {props?.message && props?.message}
                    <Button style={{marginTop: 10}} onClick={props?.onClose}>OK</Button>
                </div>


        </Modal>
    )

}

export default SuccessModal;