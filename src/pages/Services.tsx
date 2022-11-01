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
const Services: FC = () => {
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
      
             
      </Grid>
    </>
  );
};

export default Services;
