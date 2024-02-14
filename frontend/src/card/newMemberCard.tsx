import { FileInput, Label, TextInput } from "flowbite-react";

export default function NewMemberCard() {
  return (
    <>
      <div className=" flex h-screen bg-white">
        <div>
          <form className="grid grid-cols-2 gap-2">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="Your email" />
              </div>
              <TextInput
                id="member_no"
                type="text"
                placeholder="member name"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="Your email" />
              </div>
              <TextInput
                id="member_no"
                type="text"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="Your email" />
              </div>
              <TextInput
                id="member_no"
                type="text"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="Your email" />
              </div>
              <TextInput
                id="member_no"
                type="text"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="Your email" />
              </div>
              <TextInput
                id="member_no"
                type="text"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="Your email" />
              </div>
              <TextInput
                id="member_no"
                type="text"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="member_no" value="Your email" />
              </div>
              <TextInput
                id="member_no"
                type="text"
                placeholder="name@company.com"
                required
              />
            </div>
            <div id="fileUpload" className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload file" />
              </div>
              <FileInput
                id="file"
                helperText="Add Profile Picture"
                accept="image/png, image/jpeg" 
              />
            </div>

            <div></div>
          </form>
        </div>
      </div>
    </>
  );
}
