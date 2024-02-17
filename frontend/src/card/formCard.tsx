import { Label, TextInput, Card, Button, Modal, Select, FileInput } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import Creatable from "react-select/creatable";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export default function FormCard({selectedMember, handleSave, handleSaveToDb,openModal,setOpenModal}) {
  const { control } = useForm();
return(
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Member Form</Modal.Header>
          <Modal.Body><form className=" flex gap-2 flex-wrap justify-center" onSubmit={handleSaveToDb(selectedMember)}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0">
              <div className="w-[259px]">
                <Label htmlFor="email" className="mb-1">
                  Member Number
                </Label>
                <TextInput
                  type="number"
                  id="cluster"
                  disabled
                  value={selectedMember.member_no}
                  onChange={(e) =>
                    handleSave({
                      ...selectedMember,
                      member_no: e.target.value,
                    })
                  }
                  />
              </div>
              <div>
                <Label htmlFor="first_name" className="mb-1">
                  Name
                </Label>
                <TextInput
                  type="text"
                  id="name"
                  value={selectedMember.name}
                  onChange={(e) =>
                    handleSave({
                      ...selectedMember,
                      name: e.target.value,
                    })
                  }
                  />
              </div>
              <div>
                <Label htmlFor="email" className="mb-1">
                  Member Id
                </Label>
                <TextInput
                  type="number"
                  id="member_id"
                  value={selectedMember.id}
                  onChange={(e) =>
                    handleSave({
                      ...selectedMember,
                      id: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="text" className="mb-1">
                  Town
                </Label>
                <TextInput
                  type="text"
                  id="town"
                  value={selectedMember.district}
                  onChange={(e) =>
                    handleSave({
                      ...selectedMember,
                      district: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <div >
                  <Label htmlFor="cluster" className="mb-1">Cluster:</Label>
                </div>
                <TextInput 
                type="tel"
                id="tel"
                value={selectedMember.cluster} onChange={(e)=> handleSave({
                  ...selectedMember, cluster: e.target.value
                })}
                
                />
              </div>

              <div>
                <Label htmlFor="telephone" className="mb-1">
                  Member Telephone
                </Label>
                <TextInput
                  type="tel"
                  id="tel"
                  value={selectedMember.telephone} onChange={(e)=> handleSave({
                    ...selectedMember, telephone: e.target.value
                  })}
                  />
              </div>
              
              <div>
                <Label htmlFor="email" className="mb-1">
                  Cluster Leader
                </Label>
                <TextInput
                  type="text"
                  id="cluster"
                  value={selectedMember.cluster_leader}
                  required
                  onChange={(e) =>
                    handleSave({
                      ...selectedMember,
                      cluster_leader: e.target.value,
                    })
                  }
                />
              </div>
                 
              <div>
                <Label htmlFor="email" className="mb-1">
                  join_date
                </Label>
                <TextInput
                  type="text"
                  id="cluster"
                  disabled
                  value={selectedMember.join_date}
                  readOnly
                  required
                  onChange={(e) =>
                    handleSave({
                      ...selectedMember,
                      cluster_leader: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-2 mt-3">
            
            <Card className="max-w-sm p-3 w-[25rem] "
        imgAlt={selectedMember.name}
        imgSrc={`http://localhost:3000/uploads/${selectedMember.profile}`}>
                      
                    </Card>
                    <FileInput typeof="file"  onChange={(e)=> handleSave({...selectedMember, profile : e.target.files[0].name})} />
              <Button type="submit" onClick={() => handleSaveToDb(selectedMember)}>
                Update
              </Button>
              </div>
              
           
             
          </form>
          </Modal.Body>
          </Modal>
        
)
}