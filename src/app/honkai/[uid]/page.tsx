export default function Page({ params }: { params: { uid: string } }) {
  return <div>My Post: {params.uid}</div>;
}
