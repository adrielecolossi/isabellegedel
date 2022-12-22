import "./App.css";
import {useRef, useState} from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import Leaflet from "leaflet"
import "leaflet/dist/leaflet.css" 
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
//import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIcon from "./images/marker-icon.png"
import capa from "./images/header.png"
import carousel1 from "./images/carousel-1.png"
import carousel2 from "./images/carousel-2.png"
import carousel3 from "./images/carousel-3.png"
import carousel4 from "./images/carousel-4.png"
import carousel5 from "./images/carousel-5.png"
import carousel6 from "./images/carousel-6.png"
import carousel7 from "./images/carousel-7.png"
import carousel8 from "./images/carousel-8.png"
import servicos1 from './images/servicos-1.png'
import servicos2 from './images/servicos-2.png'
import servicos3 from './images/servicos-3.png'
import servicos4 from './images/servicos-4.png'
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import markerRetina from "leaflet/dist/images/marker-icon-2x.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import {AiOutlineInstagram, AiOutlineWhatsApp} from "react-icons/ai";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import { EffectCreative, EffectFade} from "swiper";

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  iconSize:     [45, 45],
  shadowSize:   [50, 64], // size of the shado
    shadowAnchor: [4, 62],
  shadowUrl: markerShadow
});


function App(){
  
  const mapRef = useRef();
  const zoom = 20;
  const containerStyle = {
      width: "45%",
      height: "200px"
  }
  const center = {
      lat: -32.052713848119886,
      lng:  -52.1378760749306
  }
  const initialMarkers = [
      {
          position: {
            lat: -32.052713848119886,
            lng:  -52.1378760749306
          },
          draggable: true
      },
  ];

  const [markers, setMarkers] = useState(initialMarkers);

  const mapClicked = async (event) => {
      console.log(event.latlng.lat, event.latlng.lng)   
  }

  const markerClicked = (marker, index) => {   
      console.log(marker.position.lat, marker.position.lng) 
  }

  const markerDragEnd = (event, index) => {
      console.log(event.lat, event.lng)
  } 

  
const MapContent = ({ onClick }) => {  
  const map = useMapEvents({
      click: event => onClick(event)
  }) 
  return null;
}

const MarkerContent = (props) => {
  const markerRef = useRef();
  const { position, draggable, onMarkerClick, onDragEnd } = props;  
  
  return <Marker
      position={position}
      draggable={draggable}
      eventHandlers={{
          click: event => onMarkerClick(event),
          dragend: () => onDragEnd(markerRef.current.getLatLng())
      }}
      ref={markerRef}
  >
      <Popup>
          <b>Salão
          <br></br> Rua Chile, 1488</b>
      </Popup>
  </Marker>
}


  return(<>
    <header>
      <img src={capa} alt="Isabelle Gedel - Capa"/>
    </header>
   <div className="reviews">
      <div className="reviews-texto">
      <p id='reviews-texto-1'>"Excelente trabalho e profissional muito carismática”</p>
      <p id='reviews-texto-2'>“Profissional interessada e ótimo desenvolvimento nas tarefas”</p>
      </div>
      <div className="reviews-carrossel">
      <Swiper
  
      modules={[Autoplay, EffectFade, Navigation, Pagination, EffectCreative]}
     
  autoplay={{delay: 1800}}
     slidesPerView={1}
     spaceBetween={30}
      centeredSlides={ true}
      loop={true}
      loopedSlides= {10}
    shortSwipes={ false}
    longSwipes= {false}
    rewind={false}  

        effect={"fade"}      

    >
      <SwiperSlide className="slide"><img src={carousel1} alt="Slider 1"/></SwiperSlide>
      <SwiperSlide className="slide"><img src={carousel2} alt="Slider 2"/></SwiperSlide>
      <SwiperSlide className="slide"><img src={carousel3} alt="Slider 3"/></SwiperSlide>
      <SwiperSlide className="slide"><img src={carousel4} alt="Slider 4"/></SwiperSlide>
      <SwiperSlide className="slide"><img src={carousel5} alt="Slider 5"/></SwiperSlide>
      <SwiperSlide className="slide"><img src={carousel6} alt="Slider 6"/></SwiperSlide>
      <SwiperSlide className="slide"><img src={carousel7} alt="Slider 7"/></SwiperSlide>
      <SwiperSlide className="slide"><img src={carousel8} alt="Slider 8"/></SwiperSlide>
    </Swiper>
    </div>
    </div>
    <div className="servicos">
      <div className="servico">
      <img src={servicos1} alt="Serviço de maquiagem"/>
      <div className="text-servico">
      <p>Maquiagem</p>
      </div>
      </div>
      
      <div className="servico">
      <img src={servicos2} alt="Serviço de dermaplaning"/>
      <div className="text-servico">
      <p>Dermaplaning</p>
      </div>
      </div>
      <div className="servico">
      <img src={servicos3} alt="Serviço de microblanding"/>
      <div className="text-servico">
      <p>Microblanding</p>
      </div>
      </div>

      <div className="servico">
      <img src={servicos4} alt="Serviço de limpeza de pele"/>
      <div className="text-servico">
      <p>Limpeza de pele</p>
       </div>
      </div>
      </div>
      <MapContainer
            style={containerStyle}
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            ref={mapRef}
            className="MapContainer"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapContent
                onClick={mapClicked}
            />
            {markers.map((marker, index) => (
                <MarkerContent
                    key={index}
                    position={marker.position}
                    draggable={marker.draggable}
                    onMarkerClick={event => markerClicked(marker, index)}
                    onDragEnd={event => markerDragEnd(event, index)}
                />
            ))}
        </MapContainer>
    <footer>
      <div className="contatos">
        <a
        className='link-contato'
            href="https://www.instagram.com/isabellegedel/"
          >
            <AiOutlineInstagram></AiOutlineInstagram> &nbsp;
            @isabellegedel
          </a>  
          <a className='link-contato' href="https://api.whatsapp.com/send?phone=555384692101&text=Olá,20%gostaria20%de20%um20%20%atendimento20%"> <AiOutlineWhatsApp></AiOutlineWhatsApp> &nbsp;+55 (53) 98469-2101</a>

            <p>Desevolvido por Adriele Colossi</p>
      </div>
      <a id="link-agendamento" href="https://api.whatsapp.com/send?phone=555384692101&text=Olá,20%gostaria20%de20%um20%20%atendimento20%">Agende seu atendimento!</a>

    </footer>
      </>)
}

export default App;