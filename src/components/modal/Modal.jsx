
'use client';

import { Modal } from 'flowbite-react';
import { clsx } from 'clsx'
export function ModalCustom(props) {
    const { openModal, onClose, children, className } = props

    return (
        <>
            {
                openModal ?
                    <>
                        <div className='fixed bg-black opacity-60 top-0 right-0 left-0 bottom-0 rounded-none w-full h-full z-[100]'></div>
                        <Modal className="top-1/4 left-0 right-0 z-[101] m-auto w-96" show={true} size="md" popup onClose={() => onClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                {children}
                            </Modal.Body>
                        </Modal>
                    </>
                    :
                    <></>
            }
        </>
    );
}
