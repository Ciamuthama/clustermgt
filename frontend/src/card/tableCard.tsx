import { Avatar } from "flowbite-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error

export default function TableCard({member,index,handleMemberSelection}) {
    return(
        <>
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
                  
                </li>
        </>
    )
}