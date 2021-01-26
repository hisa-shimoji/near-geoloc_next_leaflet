// import GeoView from '../components/geoview'
import dynamic from "next/dynamic"
const GeoView = dynamic(
  () => import('../components/geoview'),
    // .then(modules =>  modules.ClientOnlyComponent), 
  {ssr: false}
)

const Map = () => {
    return(
        <>
        <h3>hi!</h3>
        <GeoView></GeoView>
        </>
    )
}

export default Map