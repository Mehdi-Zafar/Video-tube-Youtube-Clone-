import { useState,useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography,Box,Stack } from "@mui/material";
import { CheckCircle, SettingsInputSvideoSharp } from "@mui/icons-material";
import {Videos,Loader} from './'
import { fetchFromApi } from "../utils/fetchFromApi";

const VideoDetail = () => {

    const [videoDetail,setVideoDetail] = useState(null)
    const [videos,setVideos] = useState(null)
    const {id} = useParams()

    useEffect(()=>{
        fetchFromApi(`videos?part=snippet,statistics&id=${id}`)
            .then((data)=>setVideoDetail(data.items[0]))

        fetchFromApi(`search?part=snippet&relatedtoVideoId=${id}&type=video`)
            .then((data)=>setVideos(data.items))
    },[id])

    useEffect(()=>{
        window.scrollTo(0, 0);
    })

    if(!videoDetail?.snippet) return <Loader/>;

    const {snippet:{title,channelId,channelTitle},statistics:{viewCount,likeCount}} = videoDetail;

    return ( 
        <Box minHeight="95vh">
            <Stack direction={{xs:'column',md:'row'}}>
                <Box flex={1} >
                    <Box sx={{width:'90%',position:'sticky',top:'90px',margin:'auto'}}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls playing/>
                        <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                            {title}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" sx={{color:'#fff'}} py={1} px={2}>
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={{sm:'subtitle1',md:'h6'}} color="#fff">
                                    {channelTitle}
                                    <CheckCircle sx={{fontSize:'12px',color:'gray',ml:'5px'}}/>
                                </Typography>
                            </Link>
                            <Stack direction="row" gap="20px" alignItems="center">
                                <Typography variant="body1" sx={{opacity:0.7}}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant="body1" sx={{opacity:0.7}}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box px={2} py={{md:1,xs:5}} mx={1} justifyContent="center" alignItems="center">
                    <Typography variant="h5" color="#fff" sx={{marginBottom:'10px',textAlign:'center'}}>
                        Related Videos
                    </Typography>
                    <Videos videos={videos} direction="column"/>
                </Box>
            </Stack>
        </Box>
     );
}
 
export default VideoDetail;