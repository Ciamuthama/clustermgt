import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import Creatable from "react-select/creatable";

export default function NewMemberCard() {
    const [fileName, setFileName] = useState('');
     const [uploadProgress, setUploadProgress] = useState(0);
  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  return (
    <>
      <div className="flex h-screen bg-white">
        <div>
          <form className="mt-5 mx-8">
            <div className=" grid grid-cols-2 gap-6 mb-5 ">
                <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="Member number:" />
              </div>
              <TextInput id="member_no" type="number" value={20} disabled />
            </div>
            <div>
              <div className="mb-2 block  w-[25rem]">
                <Label htmlFor="member_name" value="Member Name:" />
              </div>
              <TextInput
                id="member_name"
                type="text"
                placeholder="Member Name"
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
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="tel" value="Telephone:" />
              </div>
              <TextInput
                id="telephone"
                name="telephone"
                type="tel"
                placeholder="eg +254701........."
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="District:" />
              </div>
              <TextInput
                id="district"
                name="district"
                type="text"
                placeholder="Nakuru"
                required
              />
            </div>
            <div >
              <div className="mb-2 block">
                <Label htmlFor="cluster" value="Cluster:" />
              </div>
              <Creatable
             
                isSearchable
                options={options}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "rgb(21,157,200)",
                  },
                })}
                isMulti
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="Cluster Leader:" />
              </div>
              <TextInput
                id="cluster_leader"
                name="cluster_leader"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="Join Date:" />
              </div>
              <TextInput
                id="join_date"
                name="join_date"
                type="date"
                value={new Date().toISOString().split("T")[0]}
                disabled
              />
            </div></div>
            <div>
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG or JPG only (MAX. 10Mb)
                  </p>
                </div>
                <FileInput id="dropzone-file" accept="image/png, image/jpeg" className="hidden" onChange={(e) => setFileName(e.target.files[0].name)} />
              </Label>
            </div>
            <p className="font-semibold">{fileName}</p>
              <br />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </div>
      </div>
    </>
  );
}
