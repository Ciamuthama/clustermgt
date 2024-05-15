import axios from "axios";
import {
  Label,
  TextInput,
  Button,
  Modal,
} from "flowbite-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export default function FormCard({selectedMember,handleSave,handleSaveToDb,openModal,setOpenModal,}) {
  const handleDelete = () => {
    axios.delete(`https://clustermgtapi.vercel.app/${selectedMember._id}`);
    window.location.href = "/";
  };
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Member Form</Modal.Header>
      <Modal.Body>
        <form
          className=" flex gap-2 flex-wrap justify-center"
          encType="multipart/form-data"
          onSubmit={() => handleSaveToDb(selectedMember)}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-0">
            <div className="w-[259px]">
              <Label htmlFor="email" className="mb-1">
                Member Number
              </Label>
              <TextInput
                type="number"
                id="number"
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
              <Label htmlFor="telephone" className="mb-1">
                Member Telephone
              </Label>
              <TextInput
                type="tel"
                id="tel"
                value={selectedMember.telephone}
                onChange={(e) =>
                  handleSave({
                    ...selectedMember,
                    telephone: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <div>
                <Label htmlFor="cluster" className="mb-1">
                  Cluster:
                </Label>
              </div>
              <TextInput               
                id="cluster"
                type="text"
                value={selectedMember.cluster}
                onChange={(e) =>
                  handleSave({
                    ...selectedMember,
                    cluster: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-1">
                Cluster Leader
              </Label>
              <TextInput
                type="text"
                id="cluster_leader"
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
                id="join_date"
                disabled
                value={selectedMember.join_date}
                readOnly
                onChange={(e) =>
                  handleSave({
                    ...selectedMember,
                    join_date: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col  gap-2 mt-3">
            <img src={`https://clustermgtapi.vercel.app/profile/${selectedMember._id}`} className="h-[20rem] w-[20rem] rounded shadow-sm shadow-black"/>
            <input type="hidden" name="profile" id="profile" onChange={(e)=> handleSave({...selectedMember, profile: e.target.files ? e.target.files[0] : null})} />
            <Button
              type="submit"
              onClick={() => handleSaveToDb(selectedMember)}
            >
              Update
            </Button>
            <Button
              className="btn bg-red-600 hover:!bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
