import axios from "axios";
import { Button, FileInput, FileTextInput, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import Creatable from "react-select/creatable";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import fs from 'fs';

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
  profile: FileList;
};
export default function NewMemberCard({ getNextMemberNumber }: { getNextMemberNumber: () => number }) {
  const { control, handleSubmit, register } = useForm();
  const newNumber = getNextMemberNumber();
  // const [member_no, setMember_No] = useState(newNumber);
  // const [name, setName] = useState('');
  // const [id, setId] = useState(0);
  // const [telephone, setTelePhone] = useState('');
  // const [district, setDistrict] = useState('');
  // const [cluster, setCluster] = useState([] as Tag[]);
  // const [cluster_leader, setCluster_Leader] = useState('');
  // const [join_date, setJoin_date] = useState(new Date());
  // const [profile, setProfile] = useState(null);

  // const handleMemberNoChange = (e) => setMember_No(e.target.value);
  // const handleNameChange = (e) => setName(e.target.value);
  // const handleIdChange = (e) => setId(e.target.value);
  // const handleTelephoneChange = (e) => setTelePhone(e.target.value);
  // const handleDistrictChange = (e) => setDistrict(e.target.value);
  // const handleClusterChange = (selectedOptions) => setCluster(selectedOptions);
  // const handleClusterLeaderChange = (e) => setCluster_Leader(e.target.value);
  // const handleJoinDateChange = (e) => setJoin_date(new Date(e.target.value));
  // const handleProfileChange = (e) => setProfile(e.target.files[0]);

   
  const onSubmit: SubmitHandler<NewMember> = (data) => {
    const member ={

      member_no: data.member_no || newNumber,
      name: data.name,
      id: data.id.toString(),
      telephone: data.telephone.toString(),
      district:data.district,
      cluster: data.cluster.map((tag) => tag.label).join(","),
      cluster_leader: data.cluster_leader,
      join_date:data.join_date ||  new Date().toISOString().substr(0, 10),
      profile: data.profile[0].name,
    }

console.log(member);

    

     return axios.post("http://localhost:3000/new", member);
  };
  
  

  

  return (
    <>
      <div className="flex h-screen bg-white">
        <div>
          <form
            className="mt-5 mx-8"
            onSubmit={handleSubmit(onSubmit)}
            enctype="multipart/form-data"
          >
            <div className=" grid grid-cols-2 gap-6 mb-5 ">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="member_no" value="Member number:" />
                </div>
                <TextInput
                  id="member_no"
                  type="number"
                  {...register("member_no")}
                  value={newNumber}
                  disabled
                />
              </div>
              <div>
                <div className="mb-2 block  w-[25rem]">
                  <Label htmlFor="name" value="Member Name:" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Member Name"
                  {...register("name")}
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="id" value="Identity Number(ID):" />
                </div>
                <TextInput
                  id="id"
                  type="number"
                  {...register("id")}
                  placeholder="eg 1234......"
                  
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="tel" value="Telephone:" />
                </div>
                <TextInput
                  id="telephone"
                  type="tel"
                  {...register("telephone")}
                  placeholder="eg +254701........."
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="district" value="District:" />
                </div>
                <TextInput
                  id="district"
                  type="text"
                  {...register("district")}
                  placeholder="Nakuru"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cluster" value="Cluster:" />
                </div>
                <Controller
                  {...register("cluster")}
                  control={control}
                  render={({ field }) => (
                    <Creatable {...field} isMulti options={[]}    />
                  )}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="member_no" value="Cluster Leader:" />
                </div>
                <TextInput
                  id="cluster_leader"
                  type="text"
                  placeholder="John Doe"
                  {...register("cluster_leader")}
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="member_no" value="Join Date:" />
                </div>
                <TextInput
                  id="join_date"
                  type="date"
                  {...register("join_date")}
                  value={new Date().toISOString().substr(0, 10)}
                  
                  disabled
                />
              </div>
            </div>
            <div>
              <div className="flex w-full items-center justify-center">
                <Label htmlFor="image">
                  <input type="file"   {...register("profile")} id="profile" />
                </Label>
              </div>

              <br />
            </div>
            <Button type="submit" >Save</Button>
          </form>
        </div>
      </div>
    </>
  );
}
