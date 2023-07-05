import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import FriendReq from "components/FriendReq";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriendRequest } from "state";

const FriendRequestWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friendRequest = useSelector((state) => state.user.friendRequest);

  const getFriendRequests = async () => {
    const response = await fetch(
      `http://localhost:3001/users/getuserrequests/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriendRequest({ friendRequest: data }));
  };

  useEffect(() => {
    getFriendRequests();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend Requests
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {Array.isArray(friendRequest) &&
          friendRequest.map((friend) => (
            <FriendReq
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendRequestWidget;
