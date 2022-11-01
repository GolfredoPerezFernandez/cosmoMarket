import { FC, useState, useEffect, SyntheticEvent, useCallback } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { useAccount } from 'wagmi'
import { Button } from '@web3uikit/core';

import './pages.css'
const Home: FC = () => {
  const [blogs, setBlogs] = useState<(object | undefined)[] | undefined>();
  const { address, isConnected } = useAccount();
  const [tabValue, setTabValue] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);


  const fetchAllNftsByUser = useCallback(async () => {
    setIsFetching(true);
 
    setBlogs([]);

    setIsFetching(false);
  }, [address]);

  const fetchAllNfts = useCallback(async () => {
    setIsFetching(true);
    
    setBlogs([]);

    setIsFetching(false);
  }, []);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    switch (tabValue) {
      case 0:
        fetchAllNfts();
        break;
      case 1:
      default:
        fetchAllNftsByUser();
        break;
    }
  }, [fetchAllNfts, fetchAllNftsByUser, tabValue]);

  return (
    <>
      <Grid container justifyContent={'center'} alignItems={'center'} direction="column">
      
                <Typography variant="h3" style={{width:900,color:'white',textAlign:'center',backgroundColor:'transparent'}} >
                Im a web designer and front-end & backend developer
                  </Typography>
                <Typography variant="h4" style={{marginTop:20,color:'white',textAlign:'center',backgroundColor:'transparent'}} >
                I crafts responsive websites where technologies meet creativity
                  </Typography>
                  
                <Typography variant="h6" style={{marginTop:20,marginBottom:20,textAlign:'center',color:'white',width:'80%',backgroundColor:'transparent'}} >
              I’m a self-taught FullStack developer based in Venezuela. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences. 
              Transforming my creativity and knowledge into a websites has been my passion for over a year. I have been helping various clients to establish their presence online. I always strive to learn about the newest technologies and frameworks.
                  </Typography>
                  <Grid style={{width:'300px'}}>
        <Button theme="primary"  isFullWidth={true} type="button" text="Hire me" />
        
        <Grid style={{height:'10px'}}/>
        <Button theme="secondary"  isFullWidth={true}  type="button" text="My Services" />
        </Grid>
         <video id="videoBG" poster="poster.JPG" autoPlay={true} muted loop>
            <source src="https://bafybeidzvdmct63yfx7loa2agzbkzwnodifeue2cjzlxhls535j6h2wedi.ipfs.w3s.link/Untitled_design_2.mp4" type="video/mp4"/>
        </video>    
      </Grid>
    </>
  );
};

export default Home;
