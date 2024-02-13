import { Label, TextInput, Card, Button } from "flowbite-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export default function FormCard({selectedMember, handleSave, handleSaveToDb}) {
return(
    <div className="rounded mx-2 border">
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
)
}