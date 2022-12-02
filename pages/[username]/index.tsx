import UserProfile from "../componets/UserProfile";
import PostFeed from "../componets/PostFeed";
import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  orderBy,
  where,
} from "firebase/firestore";

export async function getServerSideProps({ query: urlQuery }) {
  const { username } = urlQuery;

  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = query(
      collection(getFirestore(), userDoc.ref.path, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts },
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}
