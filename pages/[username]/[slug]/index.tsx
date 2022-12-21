import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getUserWithUsername, postToJSON } from "../../../lib/firebase";
import PostContent from "../../componets/PostContent";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styles from "../../../styles/Post.module.css";
import Metatags from "../../componets/Metatags";

export async function getStaticProps({
  params,
}: {
  params: { username: string; slug: string };
}) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(getFirestore(), userDoc.ref.path, "posts", slug);

    post = postToJSON(await getDoc(postRef));

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collectionGroup(getFirestore(), "posts"));

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return { paths, fallback: "blocking" };
}

export default function Post(props: any) {
  const postRef = doc(getFirestore(), props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <Metatags title={post.title} />
      <section>
        <PostContent post={post} />
      </section>
      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
      </aside>
    </main>
  );
}
