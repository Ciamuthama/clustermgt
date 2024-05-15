import { Avatar } from "flowbite-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment


export default function TableCard({
  member,
  index,
  handleMemberSelection,
}) {
 

  return (
    <tr
      key={index}
      onClick={() => handleMemberSelection(member._id)}
      className="text-center"
    >
      <td>
        <Avatar rounded size="md" bordered color="" id="profileImage" img={`https://clustermgtapi.vercel.app/profile/${member._id}`}/>
      </td>
      <td className="mt-1 truncate leading-5">{member.member_no}</td>
      <td className="text-sm font-semibold leading-6 ">{member.name}</td>
      <td className="mt-1 truncate leading-5">{member.id}</td>
      <td className="mt-1 truncate leading-5">{member.telephone}</td>
      <td className="mt-1 truncate leading-5">{member.district}</td>
      <td className="mt-1 truncate leading-5 ">{member.cluster}</td>
      <td className="mt-1 truncate leading-5">{member.cluster_leader}</td>
      <td className="mt-1 truncate leading-5">Joined in {member.join_date}</td>
    </tr>
  );
}
