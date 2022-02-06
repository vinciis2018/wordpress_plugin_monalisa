import React from 'react';
import '../../styles.css';

export const Monalisa = ({screen}) => {
  const screenId = screen;
  // const screenId = "61e1532b4cdb8cfa375286da";
  // const screenId = "61e10b9fe679b4afaf09b3a9";
  const [index, setIndex] = React.useState(0);
  const delay = 5000;
  const timeoutRef = React.useRef(null);
  const [videos, setVideos] = React.useState([]);

  function resetTimeout() {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const response  = await window.fetch(`https://vblinds.herokuapp.com/api/screens/${screenId}/screenVideos`)
        const data = await response.json();
        setVideos(data)
        console.log(data)
        resetTimeout()
        timeoutRef.current = setTimeout(() => {
          setIndex(prevIndex => (prevIndex === (videos.length - 1 || videos.length) ? 0 : prevIndex + 1))
        }, delay)
      } catch (r) {
        console.error(r)
      }
    }
    fetch()
  }, [index])

  return (
    <div>
      <div className="monalisa_slideshow">
        <div 
          className="monalisa_slideshowSlider" 
          style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}
          >
            {videos.map((video, index) => (
              <a key={video._id} href={`https://vblinds.herokuapp.com/video/${video._id}`} target="_blank" rel="noopener noreferrer">
                <img 
                className="monalisa_slide"
                key={index}
                src={video.thumbnail}
                alt={video.name}
                >
                </img>
              </a>
            ))}
        </div>
      </div>
    </div>
  )
}
