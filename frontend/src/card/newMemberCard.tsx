import axios from "axios";
import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import Creatable from "react-select/creatable";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export type Tag = {
  value: string;
  label: string;
};

type NewMember = {
  member_no: number;
  name: string;
  id: number | string;
  telephone: number | string;
  district: string;
  cluster: Tag[];
  cluster_leader: string;
  join_date:  Date;
  profile: FileList;
};
export default function NewMemberCard({
  getNextMemberNumber,
}: {
  getNextMemberNumber: () => number;
}) {
  const { control, register, handleSubmit } = useForm<NewMember>();
  // const [selectedTag, setSelectedTag] = useState<Tag[]>(tags);
  // const [fileName, setFileName] = useState("");
  // const [formData, setFormData] = useState<NewMember[]>([]);
  const newNumber = getNextMemberNumber();

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleFileChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     profile: e.target.files[0],
  //   });
  //   setFileName(e.target.files[0].name);
  // };

  const onSubmit = async (data) => {
    const formData ={
        member_no:data.member_no,
        name:data.name,
        id:data.id,
        telephone: data.telephone,
        district:data.district,
        cluster: data.cluster,
        cluster_leader:data.cluster_leader,
        profile: URL.createObjectURL(data.profile[0]),

    }

  
    const response = await axios.post("http://localhost:3000/new",
      formData);
    if (response.data) {
      console.log(response);

    } else {
      console.log("an error occurred");

    }
  };

  return (
    <>
      <div className="flex h-screen bg-white">
        <div>
          <form
            className="mt-5 mx-8"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className=" grid grid-cols-2 gap-6 mb-5 ">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="member_no" value="Member number:" />
                </div>
                <TextInput
                  id="member_no"
                  type="number"
                  value={newNumber}
                  {...register("member_no")}
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
                  {...register("name", { required: true })}
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
                  placeholder="eg 1234......"
                  {...register("id", { required: true })}
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="tel" value="Telephone:" />
                </div>
                <TextInput
                  id="telephone"
                  type="tel"
                  placeholder="eg +254701........."
                  {...register("telephone")}
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
                  placeholder="Nakuru"
                  {...register("district")}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cluster" value="Cluster:" />
                </div>
                <Controller
                name="cluster"
                control={control}
                render={({ field }) => (
                  <Creatable
                    {...field}
                    isMulti
                    options={[]}
                   
                  />
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
                  value={new Date().toISOString().split("T")[0]}
                  {...register("join_date")}
                  disabled
                />
              </div>
            </div>
            <div>
              <div className="flex w-full items-center justify-center">
                <Label htmlFor="dropzone-file">
                  <input type="file" {...register("profile")} id="profile" />
                </Label>
              </div>

              <br />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </div>
      </div>
    </>
  );
}
