import React, { useState } from "react";
import axios from "axios";
import FormCard from "../card/formCard";
import TableCard from "../card/tableCard";

type FormData = {
  _id: string;
  member_no: number;
  name: string;
  id: number;
  telephone: number;
  district: string;
  cluster: string;
  cluster_leader: string;
};

export default function Form() {
  const [members, setMembers] = useState<FormData[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState(1);

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
    <div className="flex mt-4 gap-10">
      <div className="mx-2 flex flex-col items-center">
        <h2>Members</h2>
        {members.length > 0 && (
          <ul>
            {members.map((member, index) => {
              return (
                <TableCard
                  member={member}
                  index={index}
                  handleMemberSelection={handleMemberSelection}
                />
              );
            })}
          </ul>
        )}
      </div>
      {selectedMember && (
        <FormCard
          selectedMember={selectedMember}
          handleSave={handleSave}
          handleSaveToDb={handleSaveToDb}
        />
      )}
    </div>
  );
}
