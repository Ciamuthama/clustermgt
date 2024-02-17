import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import Creatable from "react-select/creatable";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export type Tag = {
  value: string;
  label: string;
};

type NewMember = {
  member_no: number | string;
  name: string;
  id: number | string;
  telephone: number | string;
  district: string;
  cluster: Tag[];
  cluster_leader: string;
  join_date: Date;
  profile: File;
};

export default function NewMemberCard({
  getNextMemberNumber,
}: {
  getNextMemberNumber: () => number;
}) {
  const { control, handleSubmit } = useForm<NewMember>();
  const newNumber = getNextMemberNumber();
  const [member_no, setMember_No] = useState(newNumber);
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [telephone, setTelePhone] = useState();
  const [district, setDistrict] = useState("");
  const [cluster, setCluster] = useState([] as Tag[]);
  const [cluster_leader, setCluster_Leader] = useState("");
  const [join_date, setJoin_date] = useState(new Date(Date.now()));
  const [profile, setProfile] = useState<File | null>(null);

  const handleMemberNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember_No(Number(e.target.value));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(e.target.value));
  };

  const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelePhone(e.target.value);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistrict(e.target.value);
  };

  const handleClusterChange = (newValue: Tag[]) => {
    setCluster(newValue);
  };

  const handleClusterLeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCluster_Leader(e.target.value);
  };

  const handleJoinDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoin_date(new Date(e.target.value));
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setProfile(files[0]);
    }
  };

  const onSubmit: SubmitHandler<NewMember> = async (data) => {
    Promise.all([
      axios
        .post("http://localhost:3000/new", {
          member_no: member_no,
          name: name,
          id: id,
          telephone: telephone,
          district: district,
          cluster_leader: cluster_leader,
          join_date: join_date,
          cluster: cluster,
          profile: profile,
        })
        .then((res) => console.log(res.data)),
    ]);
  };

  return (
    <>
      <div className="flex h-screen bg-white">
        <div>
          <form
            className="mt-5 mx-8"
            onSubmit={handleSubmit(onSubmit)}
            action="http://localhost:3000/new"
            method="post"
          >
            <div className=" grid grid-cols-2 gap-6 mb-5 ">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="member_no" value="Member number:" />
                </div>
                <TextInput
                  id="member_no"
                  type="number"
                  value={member_no}
                  onChange={handleMemberNoChange}
                  disabled
                />
              </div>
              <div>
                <div className="mb-2 block  w-[25rem]">
                  <Label htmlFor="name" value="Member Name:" />
                </div>
                <TextInput
                  id="name"
                  type="text