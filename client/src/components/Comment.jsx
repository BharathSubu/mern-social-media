import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setComments } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Comment = ({ data }) => {
  const { userId, comment } = data;
  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const getUser = async () => {
    const response = await fetch(
      `http://localhost:3001/users/getuser/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    setUserData(res);
    setUserName(res.firstName + " " + res.lastName);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <FlexBetween gap="1rem">
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Box
          width="30px"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <UserImage size="30px" image={userData.picturePath} />
          <Typography
            sx={{
              color: main,
              fontSize: "10px",
              fontWeight: "bold",
              m: "0.5rem 0",
              pl: "0.2rem",
            }}
          >
            {userName}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "13px",
            color: main,
            m: "0.5rem 0",
            pl: "3.1rem",
          }}
        >
          {data.comment}
        </Typography>
      </Box>
      <FlexBetween gap="1rem">
        {userId === _id && <Button>Remove</Button>}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Comment;
