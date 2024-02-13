import React, { useState } from "react";
import { TextInput, Label, Button, Avatar, Card } from "flowbite-react";
import axios from "axios";

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

        if(selectedMemberId === 1 && response.data.length > 0){
            setSelectedMemberId(response.data[0]._id)
        }
        console.log("this is the response " + response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedMemberId]);

  const handleMemberSelection = (_id) => {
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
                <li
                  key={index}
                  onClick={() => handleMemberSelection(member._id)}
                >
                  <Avatar img="https://www.flowbite-react.com/images/people/profile-picture-5.jpg"  rounded>
                  <div className="space-y-1 font-medium dark:text-white">
                  <h2 className="text-sm font-semibold leading-6 text-gray-900"> {member.name}</h2>
                      <h2 className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Joined in August 2017
                      </h2>
                    </div>
                  </Avatar>
                  <br />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {selectedMember && (
        <div className=" rounded mx-2 border">
          <form className="mx-3 flex gap-10 flex-wrap">
            <div className="grid grid-cols-2 gap-x-4 gap-y-0 mt-3">
              <div className="w-[259px]">
                <Label htmlFor="email" className="mb-1">
                  Member Number
                </Label>
                <TextInput
                  type="number"
                  id="cluster"
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
                  First name
                </Label>
                <TextInput
                  type="text"
                  id="first_name"
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
                  id="cluster"
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
                  id="cluster"
                  value={selectedMember.district}
                  onChange={(e) =>
                    handleSave({
                      ...selectedMember,
                      cluster: e.target.value,
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
                  id="cluster"
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
                <Label htmlFor="email" className="mb-1">
                  Cluster
                </Label>
                <TextInput
                  type="text"
                  id="cluster"
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
                 
            </div>
            <div className="flex flex-col gap-2 justify-end mt-5 mb-2">
            <Card className="max-w-sm p-3 w-[45rem] h-[30rem]"
        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
        imgSrc="https://www.flowbite-react.com/images/products/apple-watch.png">
                      
                    </Card>
              
              <Button type="submit" onClick={() => handleSaveToDb(selectedMember)}>
                Submit
              </Button>
              </div>
          </form>
        </div>
      )}
    </div>
  );
}
