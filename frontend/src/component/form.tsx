import React, { useState } from "react";
import { TextInput, Label, Button } from "flowbite-react";


type Form={
  id: number,
  fname: string,
  lname: string,
  email: string,
}
export default function Form() {
  const initialMembers = [
    {
      id: 1,
      fname: "John",
      lname: "Doe",
      email: "john@gmail.com",
    },
    {
      id: 2,
      fname: "Johnee",
      lname: "Doerr",
      email: "johgggn@gmail.com",
    }
  ];

  const [members, setMembers] = useState(initialMembers);
  const [selectedMemberId, setSelectedMemberId] = useState(1);

  const handleMemberSelection = (id: React.SetStateAction<number>) => {
    setSelectedMemberId(id);
  };

  const handleSave = (updatedMember:Form) => {
    const updatedMembers = members.map(member => (
      member.id === updatedMember.id ? updatedMember : member
    ));
    setMembers(updatedMembers);
  };

  const selectedMember = members.find(member => member.id === selectedMemberId);

  return (
    <div className="h-screen flex">
      <div className="w-1/4">
        <h2>Members</h2>
        <ul>
          {members.map(member => (
            <li key={member.id} onClick={() => handleMemberSelection(member.id)}>
              {member.fname} {member.lname}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4">
        <form>
          <div>
            <Label htmlFor="first_name" className="mb-1">
              First name
            </Label>
            <TextInput
              type="text"
              id="first_name"
              value={selectedMember.fname}
              onChange={(e) => handleSave({ ...selectedMember, fname: e.target.value })} // Update first name
            />
          </div>
          <div>
            <Label htmlFor="last_name" className="mb-1">
              Last name
            </Label>
            <TextInput
              type="text"
              id="last_name"
              value={selectedMember.lname}
              onChange={(e) => handleSave({ ...selectedMember, lname: e.target.value })} // Update last name
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-1">
              Email address
            </Label>
            <TextInput
              type="email"
              id="email"
              value={selectedMember.email}
              onChange={(e) => handleSave({ ...selectedMember, email: e.target.value })} // Update email
            />
          </div>
          <Button onClick={() => handleSave(selectedMember)}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
