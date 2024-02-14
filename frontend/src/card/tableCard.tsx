import { Avatar } from "flowbite-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error

export default function TableCard({ member, index, handleMemberSelection }) {
  return (
    <tr key={index} onClick={() => handleMemberSelection(member._id)}>
      <td>
        <Avatar
          img="https://www.flowbite-react.com/images/people/profile-picture-5.jpg"
          rounded
          className="border-0"
        ></Avatar>
      </td>
      <td className="mt-1 truncate leading-5">{member.member_no}</td>
      <td className="text-sm font-semibold leading-6 ">{member.name}</td>
      <td className="mt-1 truncate leading-5">{member.id}</td>
      <td className="mt-1 truncate leading-5">{member.telephone}</td>
      <td className="mt-1 truncate leading-5">{member.district}</td>
      <td className="mt-1 truncate leading-5 ">{member.cluster}</td>
      <td className="mt-1 truncate leading-5">{member.cluster_leader}</td>
      <td className="mt-1 truncate leading-5">Joined in August 2017</td>
    </tr>
  );
}
