import React, { useEffect, useState } from 'react'
import styles from './test-task.module.scss'
import CustomModel from '../../component/CustomModel/CustomMoal'
import { useLazyGetAllContactsQuery } from '../../store/contacts/contactsApi.slice'


function TestTask() {
    //states
    const [Modal, setModal] = useState({
        modalTtile: "",
        modalData: []
    })
    const [showModal, setShowModal] = useState(false);

    //Get contacts data
    const [getAllContacts, { data: AllContacts, isLoading: AllContactsLoading, isSuccess: AllContactsSuccess }] = useLazyGetAllContactsQuery()

    //effects
    useEffect(() => {
        getAllContacts(1)
    }, [])

    //functions
    const handleClose = () => {
        setShowModal(false);
        let newURL = "/";
        window.history.pushState({}, '', newURL);
    }
    const handleShow = (title) => {
        let newURL = title;
        window.history.pushState({}, '', newURL);
        setShowModal(true);
        setModal({ modalTtile: title, modalData: title === "A" ? Object.values(AllContacts.contacts) : Object.values(AllContacts.contacts).filter((item) => item.country.id === 226) })
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.buttoncontainer}>
                    {!AllContactsLoading && AllContactsSuccess ? (
                        <>
                            <button className={styles.btnModalA} onClick={() => {
                                handleShow("A")
                            }
                            }> BUTTON A</button>
                            <button className={styles.btnModalB} onClick={() => {
                                handleShow("B")
                            }
                            }> BUTTON B</button></>
                    ) : <h1>LOADING</h1>}
                </div>

                {showModal &&
                    (
                        <CustomModel modalData={Modal.modalData} handleClose={handleClose} handleShow={handleShow} modalTitle={Modal.modalTtile} />
                    )}
            </div>
        </div >
    )
}
export default TestTask
