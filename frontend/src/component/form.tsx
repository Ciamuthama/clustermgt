import React, { useState } from "react";
import axios from "axios";

import FormCard from "../card/formCard";
import TableCard from "../card/tableCard";
import NewMemberCard from "../card/newMemberCard";
import { Button } from "flowbite-react";

export type FormData = {
  _id: string;
  member_no: number | string;
  name: string;
  id: number | string;
  telephone: number | string;
  district: string;
  cluster: string;
  cluster_leader: string;
};



export default function Form(){
  const [members, setMembers] = useState<FormData[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openCreate,setOpenCreate] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        setMembers(response.data);

        if (selectedMemberId === 1 && response.data.length > 0) {
          setSelectedMemberId(response.data[0]._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedMemberId]);

  const handleMemberSelection = (_id: React.SetStateAction<number>) => {
    setSelectedMemberId(_id);
  };

  const handleSave = (updatedMember: FormData) => {
    const updatedMembers = members.map((member) =>
      member._id === updatedMember._id ? updatedMember : member
    );
    setMembers(updatedMembers);
  };

  const handleSaveToDb = async (updatedMember: FormData) => {
    await axios.post("http://localhost:3000/new", updatedMember);
  };

  const selectedMember = members.find(
    (member) => member._id === selectedMemberId
  );

  


  return (
    <div className="flex flex-col h-full mt-4 mx-3 gap-10 bg-white">
      <div className=" flex flex-col items-center">
        <h2>Members</h2>
        {members.length > 0 && (
          <table className="table w-[90vw]">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Member Number</th>
                <th>Member Name</th>
                <th>Id</th>
                <th>Telephone</th>
                <th>District</th>
                <th>Cluster</th>
                <th>Cluster Leader</th>
                <th>Date Joined</th>
              </tr>
            </thead>
            {members.map((member, index) => {
              return (
                <tbody onClick={() => setOpenModal(true)}>
                  <TableCard
                    member={member}
                    index={index}
                    handleMemberSelection={handleMemberSelection}
                  />
                </tbody>
              );
            })}
          </table>
        )}
      </div>
      {selectedMember && (
        <FormCard
          selectedMember={selectedMember}
          handleSave={handleSave}
          handleSaveToDb={handleSaveToDb}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
     <div className="drawer"> <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
      <label htmlFor="my-drawer" className="btn btn-primary drawer-button float-right mr-[10rem]">Create New User</label>
        </div>
        <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
       <div className="w-1/2"> <NewMemberCard   /></div>
        </div>
        </div>
    </div>
  );
}
