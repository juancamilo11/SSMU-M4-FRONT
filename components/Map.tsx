import { GoogleMap, useLoadScript } from "@react-google-maps/api";

export default function Map({ address:any=null }) {

    // laod script for google map
    const { isLoaded } = useLoadScript({
        googleMapsApiKey : '',
    });

    if (!isLoaded) return <div>Loading....</div>;

    return (
        <div className="mt-4 mb-0">
            <GoogleMap
                zoom= {12}
                center={{ lat: 6.2682534, lng: -75.5726989 }}//ubicacion UdeA Medellin
                mapContainerClassName="map"
                mapContainerStyle={{ width: "100%", height: "300px", margin: "auto" }}
            >
            </GoogleMap>
        </div>
    );
}