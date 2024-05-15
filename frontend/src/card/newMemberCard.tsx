import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
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
  profile: FileList;
};
export default function NewMemberCard({
  getNextMemberNumber,
}: {
  getNextMemberNumber: () => number;
}) {
  const { control, handleSubmit, register } = useForm<NewMember>();
  const newNumber = getNextMemberNumber();

  const onSubmit: SubmitHandler<NewMember> = async (data) => {
    const formData = new FormData();

    formData.append(
      "member_no",
      data.member_no ? data.member_no.toString() : newNumber.toString()
    );
    formData.append("name", data.name);
    formData.append("id", data.id.toString());
    formData.append("telephone", data.telephone.toString());
    formData.append("district", data.district);
    formData.append("cluster", data.cluster.map((tag) => tag.label).join(","));
    formData.append("cluster_leader", data.cluster_leader);
    let joinDate;
    if (data.join_date) {
      joinDate = new Date(data.join_date);
      if (!isNaN(joinDate.getTime())) { // check if it's a valid date
        formData.append("join_date", joinDate.toLocaleDateString());
      } else {
        console.error('Invalid date format');
      }
    } else {
      joinDate = new Date();
      formData.append("join_date", joinDate.toLocaleDateString());
    }

    // Append the profile image file
    if (data.profile && data.profile[0]) {
      formData.append("profile", data.profile[0]);
    }

    try {
      const response = await axios.post("https://clustermgtapi.vercel.app/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const reloadFunction = () => {
    setTimeout(function () {
      location.reload();
    }, 2000);
  };

  return (
    <>
      <div className="flex h-[97vh] rounded-md bg-white">
        <div>
          <form
            method="/new"
            className="mt-5 mx-8"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className=" grid grid-cols-2 gap-6 mb-5">
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
                  type="text"
                  inputMode="numeric"
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
                  inputMode="tel"
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
                    <Creatable {...field} isMulti options={[]} />
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
                />
              </div>
            </div>
            <div>
              <div className="flex w-full items-center justify-center">
                <Label htmlFor="profile">
                  <input
                    type="file"
                    {...register("profile")}
                    accept=".jpg, .jpeg, .png"
                    id="profile"
                  />
                </Label>
              </div>

              <br />
            </div>
            <Button type="submit" onClick={reloadFunction}>
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
