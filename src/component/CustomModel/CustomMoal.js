import React, { useEffect, useState } from 'react'
import styles from './custommodal.module.scss'
import { useGetAllContactsFilterMutation, useLazyGetAllContactsQuery } from '../../store/contacts/contactsApi.slice'
import { Scrollbars } from 'react-custom-scrollbars'; // Import Scrollbars

const CustomModel = ({ modalTitle, handleShow, handleClose, modalData }) => {
  console.log('call custom', modalData)
  //initial state
  const [selectedData, setSelectedData] = useState()
  const [contactsData, setContactsData] = useState([])
  const [getAllContactsFilter] = useGetAllContactsFilterMutation()
  const [getAllContacts] = useLazyGetAllContactsQuery()
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false);

  //effect
  useEffect(() => {
    if (modalData && modalData.length > 0) {
      setContactsData(modalData)
    }
  }, [modalData])


  //functions
  const handleCheckChanged = async (e) => {
    if (e.target.checked) {
      let filterdData
      filterdData = contactsData && contactsData.length > 0 && contactsData.filter((item) => item.id % 2 === 0)
      setContactsData(filterdData)
    } else {
      setContactsData(modalData)
    }
  }
  const handleFilter = async (e) => {
    if (e.key === "Enter") {
      await getAllContactsFilter(e.target.value).unwrap().then((res) => { setContactsData(Object.values(res.data.contacts)) }).catch((err) => { setContactsData(modalData) })
    }
    else {
      setTimeout(await getAllContactsFilter(e.target.value).then((res) => {
        setContactsData(Object.values(res.data.contacts))
      }).catch((err) => { setContactsData(modalData) }), 200);
    }
  }


  const loadMoreData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await getAllContacts(page + 1); // Replace with your API call
      const newData = Object.values(response.data.contacts);
      setContactsData((prevData) => [...prevData, ...newData]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle scroll event to trigger loading more data
  const handleScroll = (values) => {
    if (values.top >= 1 && !loading) {
      loadMoreData();
    }
  };
  return (
    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" >
          <div className="modal-header" style={{
            backgroundColor: modalTitle === "A" ? "#a48ccf"
              : "#efa997",
            color: "white"
          }}>
            <h5 className="modal-title">MODAL {modalTitle}</h5>
          </div>
          <div className="modal-body"
            style={{
              "height": "400px",
              "overflow-y": "scroll"
            }}
          >
            <Scrollbars autoHide onScroll={handleScroll}>
              < div className={styles.btnContainer}>
                <button className={styles.btnModalA} onClick={() => {
                  handleShow("A")
                }
                }> All Contacts</button>
                <button className={styles.btnModalB} onClick={() => {
                  handleShow("B")
                }
                }> US Contacts</button>
                <button className={styles.btnModalC} onClick={() => {
                  handleClose()
                }
                }> CLOSE</button>
              </div>
              <div className={styles.searchBox}>
                <input type="text" class="form-control" aria-label="Large" onChange={(e) => { handleFilter(e) }} aria-describedby="inputGroup-sizing-sm" />

              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Country</th>
                  </tr>
                </thead>
                <tbody>
                  {modalTitle !== "C" ?


                    contactsData && contactsData.length > 0 && contactsData.map((item) =>
                    (
                      < tr onClick={() => {
                        handleShow("C")
                        setSelectedData(item)
                      }
                      }>
                        <td>{item.first_name || "-"} </td>
                        <td>{item.last_name || "-"}</td>
                        <td>{item.country.iso || "-"}</td>

                      </tr>)
                    )
                    : < tr>
                      <td>{selectedData.first_name || "-"}</td>
                      <td>{selectedData.last_name || "-"}</td>
                      <td>{selectedData.country.iso || "-"}</td>
                    </tr>
                  }

                </tbody>
              </table>
              {loading && <div>Loading...</div>}

            </Scrollbars>
          </div>

          <div className="modal-footer" style={{ "justify-content": "flex-start" }}>
            <div className="checked">
              <label className="">
                Only even
              </label>
              <input className="" onChange={(e) => { handleCheckChanged(e) }} type="checkbox" style={{
                "transform": "scale(1.5)",
                "margin-left": "20px"
              }} id="defaultCheck1" />

            </div>
          </div>
        </div>
      </div>
    </div >

  )
}

export default CustomModel