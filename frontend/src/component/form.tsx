import React, { useState } from "react";
import axios from "axios";

import FormCard from "../card/formCard";
import TableCard from "../card/tableCard";
import NewMemberCard from "../card/newMemberCard";
import { TextInput } from "flowbite-react";

export type FormData = {
  _id: string;
  member_no: number | string;
  name: string;
  id: number | string;
  telephone: number | string;
  district: string;
  cluster: string;
  cluster_leader: string;
  date_joined:string | Date;
};

export default function Form() {
  const [members, setMembers] = useState<FormData[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState<FormData[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        setMembers(response.data);
        setSearch(response.data);

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

  function SearchMember(text: string) {
    if (text) {
      const newData = members.filter((member) => {
        const memberData = `${
          member.id ? member.id.toString().toUpperCase() : " ".toUpperCase()
        } + ${member.name ? member.name.toUpperCase() : " ".toUpperCase()}`;
        const textData = text.toUpperCase();
        return memberData.indexOf(textData) > -1;
      });
      setSearch(newData);
    } else {
      setSearch(members);
    }
  }

  return (
    <div className="flex flex-col h-full mt-4 mx-3 gap-10 bg-white">
       <TextInput
          type="search"
          onChange={(e) => {
            SearchMember(e.target.value);
          }}
          placeholder="Search"
          className="flex justify-center mx-auto w-[90vw] rounded-md"
        />
        <div className="flex flex-col flex-wrap items-center overflow-auto">
        {search.length > 0 && (
          <table className="table w-[90vw] ">
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
            {search.map((member, index) => {
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
       <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="btn bg-[#0E7490] hover:bg-[#276173] text-white drawer-button float-right "
          >
            Create New Member
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="w-[40vw]">
            <NewMemberCard />
          </div>
        </div>
      </div>
    </div>
  );
}
