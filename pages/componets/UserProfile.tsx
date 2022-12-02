import Image from "next/image";
export default function UserProfile({ user }: any): JSX.Element {
  return (
    <div className="box-center">
      <Image
        src={user.photoURL}
        className="card-img-center"
        alt={`${user.displayName}'s picture`}
        width="150"
        height="150"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
}
