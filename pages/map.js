import dynamic from "next/dynamic";
const GeoView = dynamic(() => import("../components/geoview"), { ssr: false });

const Map = () => {
  return (
    <>
      <h3>hi!</h3>
      <GeoView></GeoView>
    </>
  );
};
export default Map;

// export async function getServerSideProps(context) {
//   const { client } = await connectToDatabase();

//   const isConnected = await client.isConnected();

//   return {
//     props: { isConnected },
//   };
// }
